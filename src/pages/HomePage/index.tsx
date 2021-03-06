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
  const [isStartDate, setIsStartDate] = useState(true); // handling date range picker
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
  const [setShowSearchParamsDebounce, clearSetShowSearchParamsDebounceTimer] = useMemo(() => debounce(setShowSearchParams, 100), [
    setShowSearchParams,
  ]);

  const setWidthOnResize = useCallback(() => {
    setWindowWidth(document.body.clientWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', setWidthOnResize);
    return () => {
      clearSetShowSearchParamsDebounceTimer();
      cancelLastRequest();
      window.removeEventListener('resize', setWidthOnResize);
    };
  }, [cancelLastRequest, clearSetShowSearchParamsDebounceTimer, setWidthOnResize]);

  useEffect(() => {
    if (windowWidth < 1150) setShowSearchParamsDebounce(false);
    else setShowSearchParamsDebounce(true);
  }, [setShowSearchParamsDebounce, windowWidth]);

  useEffect(() => {
    if (!window.location.search.length) {
      cancelLastRequest(); // to cancel request from onInputChangeHandler
      setSearchParams(initialSearchParamsState);
    }
  }, [cancelLastRequest]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    let newSearchParams: ISearchParams = initialSearchParamsState;
    for (const [key, value] of params) {
      newSearchParams = { ...newSearchParams, [key]: value };
      if (key === 'startDate' || key === 'endDate')
        setSelectionRange((prevState: any) => ({ ...prevState, [key]: new Date(value) }));
    }
    setSearchParams(newSearchParams);
  }, []);

  useEffect(() => {
    trigger(['roomsCount', 'priceTo', 'priceFrom']).then(() => {
      const valid = !Object.keys(errors).length;
      const params = new URLSearchParams(window.location.search);
      for (const [key, value] of params) {
        if (!value) {
          params.delete(key);
          window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
        }
      }
      if ((valid && isStartDate) || isFirstRender) getAllOffersWithSearchParamsDebounce({ variables: { searchParams } });
      else cancelLastRequest();
      setIsFirstRender(false);
    });
  }, [cancelLastRequest, errors, getAllOffersWithSearchParamsDebounce, isFirstRender, isStartDate, searchParams, trigger]);

  const handleSelect = (ranges: { range1: IRange }) => {
    setIsStartDate((prevState: boolean) => !prevState);
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

  const deleteParams = useCallback((names: string[]) => {
    const params = new URLSearchParams(window.location.search);
    const newParams: { [name: string]: any } = {};
    names.forEach((name: string) => {
      params.delete(name);
      newParams[name] = '';
      if (name.substr(name.length - 4, 4) === 'Date') setSelectionRange((prevState: any) => ({ ...prevState, [name]: TOMORROW }));
    });
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    setSearchParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  }, []);

  const onInputChangeHandler = useCallback(
    ({ name, value }: { name: keyof ISearchParams; value: string | keyof IRelatedParams }) => {
      setSearchParams((prevState: ISearchParams) => ({ ...prevState, [name]: prevState[name] === value ? '' : value }));
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
            setSearchParams((prevState: any) => ({ ...prevState, ...Object.fromEntries([...params]) }));
            window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
            relatedParamsMap.splice(i, 1);
            relatedParamsMap.forEach(([entity, specificParams]: [string, string[]]) => deleteParams(specificParams));
          }
        });
      }
    },
    [deleteParams]
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
