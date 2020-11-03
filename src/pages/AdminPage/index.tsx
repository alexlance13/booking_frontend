import React, { useEffect, useState, useMemo } from 'react';
import Card from 'components/Card';
import NavBar from 'components/NavBar';
import { Wrapper, Header, StyledLink, BodyDiv } from './styles';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_APARTMENTS, TOMORROW } from 'global-constants';
import { CircleLoader } from 'react-spinners';
import handleError from 'helpers/handleError';
import { IRange } from 'types';
import debounce from 'helpers/debounce';
import DatePicker from 'components/DatePicker';
import { DatePickerDiv } from 'pages/HomePage/FilterParams/styles';
import formatDate from 'helpers/formatDate';

const AdminPage: React.FC = () => {
  const [isStartDate, setIsStartDate] = useState(true); // handling date range picker
  const [searchParams, setSearchParams] = useState({ startDate: TOMORROW, endDate: TOMORROW });
  const [getAllApartments, { loading, data }] = useLazyQuery(GET_ALL_APARTMENTS, { onError: handleError });

  const [debouncedGetAllApartments] = useMemo(() => debounce(getAllApartments, 500), [getAllApartments]);

  useEffect(() => {
    debouncedGetAllApartments({
      variables: { searchParams: { sortByRooms: 'desc', startDate: '' }, admin: true },
    });
  }, [debouncedGetAllApartments]);

  const handleSelect = (ranges: { range1: IRange }) => {
    setIsStartDate((prevState: boolean) => !prevState);
    setSearchParams({ startDate: ranges.range1.startDate, endDate: ranges.range1.endDate });
    if (isStartDate)
      debouncedGetAllApartments({
        variables: {
          searchParams: {
            startDate: formatDate(ranges.range1.startDate),
            endDate: formatDate(ranges.range1.endDate),
            sortByRooms: 'desc',
          },
          admin: true,
        },
      });
  };

  return (
    <Wrapper>
      <NavBar />
      {loading ? (
        <CircleLoader css={'margin: 200px auto;'} size={150} />
      ) : (
        <BodyDiv>
          <DatePickerDiv>
            <DatePicker handleSelect={handleSelect} selectionRange={searchParams} admin />
          </DatePickerDiv>
          <ul>
            <li key='apartmentsHeader'>
              <Header>Apartments</Header>
            </li>
            {data?.getAllApartments.map((apartment: any) => (
              <li key={apartment._id}>
                <StyledLink to={`/apartment/${apartment._id}`}>
                  <Card name={apartment.name} image={apartment.image}>
                    {apartment.description}
                  </Card>
                </StyledLink>
              </li>
            ))}
          </ul>
        </BodyDiv>
      )}
    </Wrapper>
  );
};

export default AdminPage;
