import getErrorMessage from 'helpers/getValidationMessage';
import React from 'react';

const Quantity: React.FC<PropsType> = ({ onInputChangeHandler, errors, register, quantityValue, availableQuantity }) => {
  return (
    <div className='input-field col s6'>
      <input
        name='quantity'
        id='quantity'
        type='number'
        className='validate'
        value={quantityValue || 1}
        onChange={onInputChangeHandler}
        ref={register({
          required: true,
          min: 1,
          max: 1000,
          validate: (value: number) => {
            if (availableQuantity && typeof availableQuantity === 'number' && availableQuantity < value) return 'Too much';
            return true;
          },
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
  quantityValue?: number;
  onInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  errors: any;
  availableQuantity?: number;
}
