import React from 'react';
import Apartment from 'components/Apartment';
import NavBar from 'components/NavBar';
import { ApartmentsWrapper, Wrapper } from './styles';
import { useQuery } from '@apollo/client';
import { GET_ALL_APARTMENTS } from 'global-constants';
import { CircleLoader } from 'react-spinners';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_ALL_APARTMENTS);
  if (loading) return <CircleLoader css={'margin: 200px auto;'} size={150} />;
  if (error) return <span>The server is offline</span>;
  return (
    <Wrapper>
      <NavBar />
      <ApartmentsWrapper>
        {data.getAllApartments.map((apartment: any) => (
          <Apartment apartment={apartment} />
        ))}
      </ApartmentsWrapper>
    </Wrapper>
  );
};

export default HomePage;
