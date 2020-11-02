import React, { useEffect, useState, useCallback, useMemo } from 'react';
import NavBar from 'components/NavBar';
import { Wrapper, BodyDiv } from './styles';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_OFFERS, TOMORROW } from 'global-constants';
import { CircleLoader } from 'react-spinners';
import handleError from 'helpers/handleError';
import { IRange, ISearchParams, IRelatedParams } from 'types';
import FilterParams from './FilterParams';
import SortingParams from './SortingParams';
import debounce from 'helpers/debounce';
import formatDate from 'helpers/formatDate';
import Content from './Content';
import { useForm, Controller } from 'react-hook-form';

let counter = 0;

const initialSearchParamsState = {
  // __________filter
  type: '', // by type 'apartment' or 'voucher'
  priceFrom: '', // by price from
  priceTo: '', // by price to
  variant: '', // by voucher variant
  roomsCount: '', // by rooms number
  startDate: '', // by start date
  endDate: '', // by end date
  // ___________sorting
  sortByPrice: '',
  sortByRooms: '',
};

const HomePage: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(document.body.clientWidth);
  const [selectionRange, setSelectionRange] = useState<IRange>({ startDate: TOMORROW, endDate: TOMORROW });
  const [showSearchParams, setShowSearchParams] = useState(true);
  const { control, errors, trigger } = useForm({ mode: 'onChange' });
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [searchParams, setSearchParams] = useState<ISearchParams>(initialSearchParamsState);
  const [getAllOffers, { loading, data, error }] = useLazyQuery(GET_ALL_OFFERS, {
    onError: handleError,
    fetchPolicy: 'network-only',
  });
  const [getAllOffersWithSearchParamsDebounce, cancelLastRequest] = useMemo(() => debounce(getAllOffers, 1000), [getAllOffers]);
  const [setShowSearchParamsDebounse] = useMemo(() => debounce(setShowSearchParams, 200), [setShowSearchParams]);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(document.body.clientWidth));
    return window.removeEventListener('resize', () => setWindowWidth(document.body.clientWidth));
  }, []);

  useEffect(() => {
    if (windowWidth < 1150) setShowSearchParamsDebounse(false);
    else setShowSearchParamsDebounse(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let newSearchParams: ISearchParams = initialSearchParamsState;
    for (const [key, value] of params) {
      newSearchParams = { ...newSearchParams, [key]: value };
      if (key === 'startDate' || key === 'endDate')
        setSelectionRange((prevState: any) => ({ ...prevState, [key]: new Date(value) }));
    }
    setSearchParams(newSearchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('first');
    trigger(['roomsCount', 'priceTo', 'priceFrom']).then(() => {
      const valid = !Object.keys(errors).length;
      const params = new URLSearchParams(window.location.search);
      for (const [key, value] of params) {
        if (!value) {
          params.delete(key);
          window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
        }
      }
      if ((valid && !(counter % 2)) || isFirstRender) getAllOffersWithSearchParamsDebounce({ variables: { searchParams } });
      else cancelLastRequest();
      setIsFirstRender(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSelect = (ranges: { range1: IRange }) => {
    counter++;
    setSelectionRange(ranges.range1);
    const params = new URLSearchParams(window.location.search);
    params.get('type') ? params.set('type', 'apartment') : params.append('type', 'apartment');
    setSearchParams((prevState: ISearchParams) => ({
      ...prevState,
      startDate: ranges.range1.startDate,
      endDate: ranges.range1.endDate,
      type: 'apartment',
    }));
    Object.entries(ranges.range1).forEach(([name, date]: [string, Date]) => {
      const value = formatDate(date);
      if (params.get(name)) params.set(name, value);
      else params.append(name, value);
      window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    });
  };

  const deleteParams = useCallback(
    (names: string[]) => {
      const params = new URLSearchParams(window.location.search);
      const newParams: { [name: string]: any } = {};
      names.forEach((name: string) => {
        params.delete(name);
        newParams[name] = '';
        if (name.substr(name.length - 4, 4) === 'Date')
          setSelectionRange((prevState: any) => ({ ...prevState, [name]: TOMORROW }));
      });
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
    ({ name, value }: { name: keyof ISearchParams; value: string | keyof IRelatedParams }) => {
      let newSearchParams = { ...searchParams, [name]: searchParams[name] === value ? '' : value };
      const params = new URLSearchParams(window.location.search);
      const relatedParams: IRelatedParams = {
        voucher: ['variant'],
        apartment: ['roomsCount', 'startDate', 'endDate', 'sortByRooms'],
      };
      if (params.get(name)) {
        if (params.get(name) === value) params.delete(name);
        else params.set(name, value);
      } else params.append(name, value);
      window.history.replaceState({}, '', `${window.location.pathname}?${params}`);

      const relatedParamsMap = Object.entries(relatedParams);
      if (name === 'type' && value && relatedParams[value as keyof IRelatedParams]) {
        // clear all params that specific and not for this type
        relatedParamsMap.forEach(
          ([entity, specificParams]: [string, string[]]): false | void => entity !== name && deleteParams(specificParams)
        );
      } else {
        relatedParamsMap.forEach(([entity, specificParams]: [string, string[]], i: number) => {
          // change type if params are specific and clear other specific params
          if (specificParams.includes(name)) {
            params.set('type', entity);
            newSearchParams = { ...newSearchParams, ...Object.fromEntries([...params]) };
            window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
            relatedParamsMap.splice(i, 1);
            relatedParamsMap.forEach(([entity, specificParams]: [string, string[]]) => deleteParams(specificParams));
          }
        });
      }
      setSearchParams(newSearchParams);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deleteParams, errors]
  );

  return (
    <Wrapper>
      <NavBar />
      {loading || (!data && !error) ? (
        <CircleLoader css={'margin: 200px auto;'} size={150} />
      ) : (
        <BodyDiv>
          {windowWidth < 1150 && (
            <button className='btn waves-light' onClick={() => setShowSearchParams(!showSearchParams)}>
              {!showSearchParams ? 'Show search params' : 'Hide search params'}
            </button>
          )}
          {showSearchParams && (
            <FilterParams
              Controller={Controller}
              control={control}
              errors={errors}
              trigger={trigger}
              searchParams={searchParams}
              selectionRange={selectionRange}
              handleSelect={handleSelect}
              onInputChangeHandler={onInputChangeHandler}
            />
          )}
          <Content data={data} searchParams={searchParams} />
          {showSearchParams && <SortingParams searchParams={searchParams} onInputChangeHandler={onInputChangeHandler} />}
        </BodyDiv>
      )}
    </Wrapper>
  );
};

export default HomePage;
