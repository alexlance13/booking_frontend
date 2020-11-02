import getErrorMessage from 'helpers/getValidationMessage';
import React from 'react';
import { IOfferFormState, IOfferFormStateForEdit } from 'types';

const Price: React.FC<PropsType> = ({ onInputChangeHandler, errors, control, Controller, offerFormState }) => {
  return (
    <div className='input-field col s6'>
      <Controller
        control={control}
        rules={{
          required: true,
          min: 1,
          max: 10000,
        }}
        name='price'
        defaultValue={offerFormState.price}
        render={(props: any) => (
          <input
            onChange={(event) => {
              props.onChange(event);
              onInputChangeHandler(event);
              return event;
            }}
            value={offerFormState.price}
            name={props.name}
            type='number'
            id='price'
            className='validate'
          />
        )}
      />
      {getErrorMessage(errors, 'price')}
      <label className='active' htmlFor='price'>
        Price
      </label>
    </div>
  );
};

export default Price;

interface PropsType {
  offerFormState: IOfferFormState | IOfferFormStateForEdit;
  onInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;

  control: any;
  Controller: any;
  errors: any;
}
