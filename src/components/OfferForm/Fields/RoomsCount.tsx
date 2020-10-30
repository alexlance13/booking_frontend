import getErrorMessage from 'helpers/getValidationMessage';
import React from 'react';
import { IOfferFormState, IOfferFormStateForEdit } from 'types';

const RoomsCount: React.FC<PropsType> = ({ onInputChangeHandler, errors, register, offerFormState }) => {
  return (
    <div className='input-field col s6'>
      <input
        name='roomsCount'
        id='roomsCount'
        type='number'
        className='validate'
        value={offerFormState.roomsCount}
        onChange={onInputChangeHandler}
        ref={register({
          required: true,
          min: 1,
          max: 20,
        })}
      />
      {getErrorMessage(errors, 'roomsCount')}
      <label className='active' htmlFor='roomsCount'>
        Rooms Count
      </label>
    </div>
  );
};

export default RoomsCount;

interface PropsType {
  offerFormState: IOfferFormState | IOfferFormStateForEdit;
  onInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  errors: any;
}
