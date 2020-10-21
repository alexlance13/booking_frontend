import React from 'react';
import Card from 'components/Card';
import NavBar from 'components/NavBar';
import { Wrapper, Header } from './styles';
import { useQuery } from '@apollo/client';
import { GET_ALL_OFFERS } from 'global-constants';
import { CircleLoader } from 'react-spinners';
import handleError from 'helpers/handleError';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_ALL_OFFERS);
  if (loading) return <CircleLoader css={'margin: 200px auto;'} size={150} />;
  if (error) handleError(error);
  return (
    <Wrapper>
      <NavBar />
      <Header>Apartments</Header>
      <ul>
        {data.getAllApartments.map((apartment: any) => (
          <li>
            <Card name={apartment.name} image={apartment.image}>
              {apartment.description}
            </Card>
          </li>
        ))}
      </ul>
      <Header>Vouchers</Header>
      <ul>
        {data.getAllVouchers.map((voucher: any) => (
          <li>
            <Card name={voucher.name} image={voucher.image}>
              {voucher.description}
            </Card>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default HomePage;
