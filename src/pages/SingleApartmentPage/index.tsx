import React, { useEffect, useState } from 'react';
import NavBar from 'components/NavBar';
import { connect } from 'react-redux';
import { GET_APARTMENT_BY_ID, USER_ROLES, CREATE_BOOKING, TOMORROW, OFFER_TYPES } from 'global-constants';
import { CircleLoader } from 'react-spinners';
import { Wrapper, BuyerDiv, StyledNavLink } from './styles';
import { useMutation, useQuery } from '@apollo/client';
import SingleOffer from 'components/SingleOffer';
import handleError from 'helpers/handleError';
import DatePicker from 'components/DatePicker';
import Swal from 'sweetalert2';
import getDatesBetween, { addDays } from 'helpers/getArrayFromRangeDates';
import { Link } from 'react-router-dom';
import { setStateWhenEdit } from 'store/actions/offer';
import formatDate from 'helpers/formatDate';
import { IOfferFormStateForEdit, IRange, IUser, IBooking } from 'types';

const SingleApartmentPage: React.FC<PropsType> = ({ user, history, setStateWhenEdit }) => {
  const [id] = useState(window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1));
  const [reservedDates, setReservedDates] = useState<Date[]>([]);
  const [selectionRange, setSelectionRange] = useState<IRange>({ startDate: TOMORROW, endDate: TOMORROW });

  const { loading: queryLoading, data: queryData, error } = useQuery(GET_APARTMENT_BY_ID, { variables: { id } });
  const [createBooking, { loading: mutationLoading, data: mutationData }] = useMutation(CREATE_BOOKING, { onError: handleError });

  if (error) {
    if (error?.message?.substr(0, 4) === 'Cast') {
      handleError(new Error('There is no apartment with this id'));
      history.push('/');
    } else handleError(error);
  }

  useEffect(() => {
    if (queryData?.getApartmentById?.bookings?.length) {
      let reservedDatesArr: Date[] = [];
      queryData.getApartmentById.bookings.forEach((booking: IBooking) => {
        const arrDatesFromRange = getDatesBetween(new Date(+booking.startDate), new Date(+booking.endDate));
        reservedDatesArr = reservedDatesArr.concat(arrDatesFromRange);
      });
      setReservedDates(reservedDatesArr);
      for (let i = 0; ; i++) {
        const initialDate = addDays(TOMORROW, i);
        // Set initial date for a first available date
        if (!reservedDatesArr.some((date: Date) => formatDate(date) === formatDate(initialDate))) {
          setSelectionRange({ startDate: initialDate, endDate: initialDate });
          break;
        }
      }
    }
  }, [queryData]);

  useEffect(() => {
    if (mutationData?.createBooking?._id) {
      Swal.fire({
        icon: 'success',
        title: "You've just book this apartment",
        showConfirmButton: false,
        timer: 2000,
      });
      history.push('/orders');
    }
  }, [history, mutationData]);

  const handleSelect = (ranges: { range1: IRange }) => {
    setSelectionRange(ranges.range1);
  };

  const onSubmit = () => {
    createBooking({
      variables: {
        booking: {
          apartment: id,
          startDate: formatDate(selectionRange.startDate),
          endDate: formatDate(selectionRange.endDate),
        },
      },
    });
  };

  const onEditHandler = () => {
    const offerForStore = { ...queryData.getApartmentById, offerType: OFFER_TYPES.APARTMENT, _id: id };
    delete offerForStore.seller;
    delete offerForStore.__typename;
    delete offerForStore.bookings;
    setStateWhenEdit(offerForStore);
  };

  return (
    <Wrapper>
      <NavBar />
      {queryLoading || mutationLoading ? (
        <CircleLoader css={'margin: 200px auto;'} size={150} />
      ) : (
        queryData?.getApartmentById && (
          <SingleOffer
            name={queryData.getApartmentById.name}
            image={queryData.getApartmentById.image}
            description={queryData.getApartmentById.description}
            price={queryData.getApartmentById.price}>
            <div>
              <span>Number of rooms: </span>
              {queryData.getApartmentById.roomsCount}
            </div>
            {!user?.role && <StyledNavLink to='/auth/login'>Click me and login as buyer to be able to order</StyledNavLink>}
            {user?.role === USER_ROLES.BUYER && (
              <BuyerDiv>
                <DatePicker disabledDates={reservedDates} handleSelect={handleSelect} selectionRange={selectionRange} />
                <button className='waves-light btn' onClick={onSubmit}>
                  Book
                </button>
              </BuyerDiv>
            )}
            {queryData?.getApartmentById?.seller?._id === user?._id && (
              <Link onClick={() => onEditHandler()} className='waves-light btn' to='/editOffer'>
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
export default connect(mapStateToProps, mapDispatchToProps)(SingleApartmentPage);

interface PropsType {
  user: IUser;
  history: any;
  setStateWhenEdit: (offerForStore: IOfferFormStateForEdit) => void;
}
