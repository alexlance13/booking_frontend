import getErrorMessage from 'helpers/getValidationMessage';
import React from 'react';
import { FieldErrors, Controller, Control } from 'react-hook-form';

const Quantity: React.FC<PropsType> = ({
  onInputChangeHandler,
  errors,
  control,
  Controller,
  quantityValue,
  availableQuantity,
}) => {
  return (
    <div className='input-field col s6'>
      <Controller
        control={control}
        defaultValue={quantityValue}
        availableQuantity={availableQuantity}
        rules={{
          required: true,
          min: 1,
          max: 1000,
          validate: (value: number) => {
            if (availableQuantity && typeof availableQuantity === 'number' && availableQuantity < value) return 'Too much';
            return true;
          },
        }}
        name='quantity'
        value={quantityValue}
        render={(props: any) => (
          <input
            onChange={(event) => {
              props.onChange(event);
              onInputChangeHandler(event);
              return event;
            }}
            value={props.value}
            id='quantity'
            name={props.name}
            type='number'
            className='validate'
          />
        )}
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

  control: Control;
  Controller: typeof Controller;
  errors: FieldErrors;
  availableQuantity?: number;
}
