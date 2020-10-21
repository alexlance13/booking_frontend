import getErrorMessage from 'helpers/getValidationMessage';
import React from 'react';

const Quantity: React.FC<PropsType> = ({ onInputChangeHandler, errors, register, offerFormState }) => {
  return (
    <div className='input-field col s6'>
      <input
        name='quantity'
        id='quantity'
        type='number'
        className='validate'
        value={offerFormState.quantity}
        onChange={onInputChangeHandler}
        ref={register({
          required: true,
          min: 1,
          max: 1000,
        })}
      />
      {getErrorMessage(errors, 'quantity')}
      <label className='active' htmlFor='quantity'>
        Quantity
      </label>
    </div>
  );
};

export default Quantity;

interface PropsType {
  offerFormState: any;
  onInputChangeHandler: (event: React.ChangeEvent<any>) => void;
  register: any;
  errors: any;
}
