import React, { useEffect, useState, useMemo } from 'react';
import NavBar from 'components/NavBar';
import { connect } from 'react-redux';
import { GET_VOUCHER_BY_ID, USER_ROLES, CREATE_ORDER, OFFER_TYPES } from 'global-constants';
import { CircleLoader } from 'react-spinners';
import handleError from 'helpers/handleError';
import { Wrapper, StyledNavLink } from './styles';
import { useMutation, useLazyQuery } from '@apollo/client';
import SingleOffer from 'components/SingleOffer';
import { Link } from 'react-router-dom';
import { setStateWhenEdit } from 'store/actions/offer';
import Swal from 'sweetalert2';
import BuyerDiv from './BuyerDiv';
import { IOfferFormStateForEdit, IUser } from 'types';

const SingleVoucherPage: React.FC<PropsType> = ({ user, history, setStateWhenEdit, match }) => {
  const id = useMemo(() => match.params.id, [match.params.id]);
  const [getVoucherById, { loading: queryLoading, data: queryData, error }] = useLazyQuery(GET_VOUCHER_BY_ID, {
    onError: handleError,
  });
  const [createOrder, { loading: mutationLoading, data: mutationData }] = useMutation(CREATE_ORDER, { onError: handleError });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getVoucherById({ variables: { id } });
    if (error) {
      if (error?.message?.substr(0, 4) === 'Cast') {
        handleError(new Error('There is no voucher with this id'));
        history.push('/');
      } else handleError(error);
    }
  }, [error, getVoucherById, history, id]);

  useEffect(() => {
    if (mutationData?.createOrder._id) {
      Swal.fire({
        icon: 'success',
        title: "You've just order this voucher",
        showConfirmButton: false,
        timer: 2000,
      });
      history.push('/orders');
    }
  }, [history, mutationData]);

  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) setQuantity(1);
    else if (Number(event.target.value)) setQuantity(+event.target.value);
  };

  const onOrderHandler = () => {
    createOrder({ variables: { order: { quantity, voucher: id } } });
  };

  const onEditHandler = () => {
    const { seller, __typename, orders, ...offerForStore } = queryData?.getApartmentById;
    setStateWhenEdit({ ...offerForStore, offerType: OFFER_TYPES.VOUCHER, _id: id });
  };

  return (
    <Wrapper>
      <NavBar />
      {queryLoading || mutationLoading ? (
        <CircleLoader css={'margin: 200px auto;'} size={150} />
      ) : (
        queryData?.getVoucherById && (
          <SingleOffer
            name={queryData.getVoucherById.name}
            image={queryData.getVoucherById.image}
            description={queryData.getVoucherById.description}
            price={queryData.getVoucherById.price}>
            <div>
              <span>Available: </span>
              {queryData.getVoucherById.quantity}pcs
            </div>
            {!user?.role && <StyledNavLink to='/auth/login'>Click me and login as buyer to be able to order</StyledNavLink>}
            {user?.role === USER_ROLES.BUYER && (
              <BuyerDiv
                onOrderHandler={onOrderHandler}
                quantity={quantity}
                onInputChangeHandler={onInputChangeHandler}
                availableQuantity={queryData.getVoucherById.quantity}
              />
            )}
            {queryData.getVoucherById.seller._id === user._id && (
              <Link onClick={onEditHandler} className='waves-light btn' to='/editOffer'>
                Edit
              </Link>
            )}
          </SingleOffer>
        )
      )}
    </Wrapper>
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    setStateWhenEdit: (offerForStore: IOfferFormStateForEdit) => dispatch(setStateWhenEdit(offerForStore)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleVoucherPage);

interface PropsType {
  user: IUser;
  history: any;
  match: any;
  setStateWhenEdit: (offerForStore: IOfferFormStateForEdit) => void;
}
