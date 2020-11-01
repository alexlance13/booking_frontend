import getErrorMessage from 'helpers/getValidationMessage';
import React from 'react';
import { IOfferFormState, IOfferFormStateForEdit } from 'types';

const RoomsCount: React.FC<PropsType> = ({ onInputChangeHandler, errors, control, Controller, offerFormState }) => {
  return (
    <div className='input-field col s6'>
      <Controller
        control={control}
        rules={{
          required: true,
          min: 1,
          max: 20,
        }}
        name='roomsCount'
        defaultValue={offerFormState.roomsCount}
        render={(props: any) => (
          <input
          onChange={(event) => {
            props.onChange(event);
            onInputChangeHandler(event);
            return event;
          }}
          name={props.name}
          value={offerFormState.roomsCount}
            type='number'
            id='roomsCount'
            className='validate'
          />
        )}
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

  control: any;
  Controller: any;
  errors: any;
}
