import React, { useEffect, useMemo, useState, useCallback } from 'react';
import Card from 'components/Card';
import NavBar from 'components/NavBar';
import { Wrapper, Header, StyledLink, SearchParams, BodyDiv } from './styles';
import { useQuery } from '@apollo/client';
import { GET_ALL_OFFERS, OFFER_TYPES, TOMORROW } from 'global-constants';
import { CircleLoader } from 'react-spinners';
import handleError from 'helpers/handleError';
import { IRange, ISearchParams } from 'types';
import FilterParams from './FilterParams';

const HomePage: React.FC<PropsType> = ({ history, location }) => {
  const [selectionRange, setSelectionRange] = useState({ startDate: TOMORROW, endDate: TOMORROW });
  const [searchParams, setSearchParams] = useState<ISearchParams>({
    type: '', // filter by type 'apartment' or 'voucher'
    priceF: '', // filter by price from
    priceT: '', // filter by price to
    variant: '', // filter by price to
    rooms: '', // filter by rooms number
    startDate: '', // filter by start date
    endDate: '', // filter by end date
  });

  const { loading, error, data } = useQuery(GET_ALL_OFFERS);
  if (error) handleError(error);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    for (const param of params) {
      setSearchParams((prevState: any) => ({ ...prevState, [param[0]]: param[1] }));
      if (param[0] === 'startDate' || param[0] === 'endDate')
        setSelectionRange((prevState: any) => ({ ...prevState, [param[0]]: new Date(param[1]) }));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    for (const param of params) {
      if (!param[1]) {
        params.delete(param[0]);
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
      }
    }
  }, [searchParams]);

  const handleSelect = (ranges: { range1: IRange }) => {
    setSelectionRange(ranges.range1);
    const params = new URLSearchParams(window.location.search);
    params.get('type') ? params.set('type', 'apartment') : params.append('type', 'apartment');
    setSearchParams((prevState: any) => ({
      ...prevState,
      startDate: ranges.range1.startDate,
      endDate: ranges.range1.endDate,
      type: 'apartment',
    }));
    Object.entries(ranges.range1).forEach((IdValue: [string, Date]) => {
      const [id, date] = IdValue;
      const value = date.toISOString().substr(0, 10);
      if (params.get(id)) params.set(id, value);
      else params.append(id, value);
      window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    });
  };

  const deleteParams = useCallback(
    (ids: string[]) => {
      const params = new URLSearchParams(window.location.search);
      const newParams = {};
      console.log(searchParams);
      ids.forEach((id: string) => {
        params.delete(id);
        // @ts-ignore
        newParams[id] = '';
        if (id.substr(id.length - 4, 4) === 'Date') setSelectionRange((prevState: any) => ({ ...prevState, [id]: TOMORROW }));
      });
      console.log(newParams);
      window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
      setSearchParams((prev) => ({
        ...prev,
        ...newParams,
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [window.location, searchParams]
  );

  const onInputChangeHandler = useCallback(
    (target: any) => {
      let { id, value, max, min } = target;
      value = +value && max && +value > max ? max : value; // change value to max
      value = +value && min && +value < min ? min : value; // change value to min
      setSearchParams((prevState: any) => ({ ...prevState, [id]: prevState[id] === value ? '' : value }));
      const params = new URLSearchParams(window.location.search);
      const relatedParams = {
        voucher: ['variant'],
        apartment: ['rooms', 'startDate', 'endDate'],
      };
      if (params.get(id)) {
        if (params.get(id) === value) params.delete(id);
        else params.set(id, value);
      } else params.append(id, value);
      window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

      const relatedParamsMap = Object.entries(relatedParams);
      // @ts-ignore
      if (id === 'type' && value && relatedParams[value]) {
        // clear all params that specific and not for this type
        // @ts-ignore
        relatedParamsMap.forEach((relation: any) => relation[0] !== id && deleteParams(relation[1]));
      } else {
        relatedParamsMap.forEach((relation: any, i: number) => {
          // change type if params are specific and clear other specific params
          if (relation[1].includes(id)) {
            params.set('type', relation[0]);
            setSearchParams((prevState: any) => ({ ...prevState, ...Object.fromEntries([...params]) }));
            window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
            relatedParamsMap.splice(i, 1);
            relatedParamsMap.forEach((relation: any) => deleteParams(relation[1]));
          }
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [window.location]
  );

  return (
    <Wrapper>
      <NavBar />
      {loading ? (
        <CircleLoader css={'margin: 200px auto;'} size={150} />
      ) : (
        <BodyDiv>
          <FilterParams
            searchParams={searchParams}
            selectionRange={selectionRange}
            handleSelect={handleSelect}
            onInputChangeHandler={onInputChangeHandler}
          />
          <div>
            {(!searchParams.type || searchParams.type === OFFER_TYPES.APARTMENT) && (
              <ul>
                <li key='apartmentsHeader'>
                  <Header>Apartments</Header>
                </li>
                {data.getAllApartments.map((apartment: any) => (
                  <li key={apartment._id}>
                    <StyledLink to={`/apartment/${apartment._id}`}>
                      <Card name={apartment.name} image={apartment.image}>
                        {apartment.description}
                      </Card>
                    </StyledLink>
                  </li>
                ))}
              </ul>
            )}
            {(!searchParams.type || searchParams.type === OFFER_TYPES.VOUCHER) && (
              <ul>
                <li key='vouchersHeader'>
                  <Header>Vouchers</Header>
                </li>
                {data.getAllVouchers.map((voucher: any) => (
                  <li key={voucher._id}>
                    <StyledLink to={`/voucher/${voucher._id}`}>
                      <Card name={voucher.name} image={voucher.image}>
                        {voucher.description}
                      </Card>
                    </StyledLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <SearchParams>Sort by: </SearchParams>
          </div>
        </BodyDiv>
      )}
    </Wrapper>
  );
};

export default HomePage;

interface PropsType {
  history: any;
  location: any;
}
