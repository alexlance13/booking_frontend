import React from 'react';
import Offers from 'components/Offers';
import NavBar from 'components/NavBar';
import { Wrapper } from './styles';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_ALL_ORDERS_BY_SPECIFIC_SELLER } from 'global-constants';
import { CircleLoader } from 'react-spinners';
import handleError from 'helpers/handleError';

const OffersPage: React.FC<PropsType> = ({ user }) => {
  const { loading, error, data } = useQuery(GET_ALL_ORDERS_BY_SPECIFIC_SELLER, { variables: { id: user._id } });
  if (loading) return <CircleLoader css={'margin: 200px auto;'} size={150} />;
  if (error) handleError(error);
  return (
    <Wrapper>
      <NavBar />
      <Offers sellerData={data.getUserById} />
    </Wrapper>
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, null)(OffersPage);

interface PropsType {
  user: any;
}
