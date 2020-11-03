import React from 'react';
import { Select } from '../styles';
import getErrorMessage from 'helpers/getValidationMessage';
import { IOfferFormState, IOfferFormStateForEdit } from 'types';
import { FieldErrors, Controller, Control } from 'react-hook-form';

const OfferType: React.FC<PropsType> = ({ onInputChangeHandler, errors, control, Controller, offerFormState, isEditing }) => {
  return (
    <div className='input-field'>
      <Controller
        control={control}
        rules={{ required: true }}
        name='offerType'
        defaultValue={offerFormState.offerType}
        render={(props: any) => (
          <Select
            disabled={isEditing}
            name={props.name}
            id='offerType'
            value={props.value}
            onChange={(event) => {
              props.onChange(event);
              onInputChangeHandler(event);
              return event;
            }}>
            <option value='' disabled>
              Choose your offer type
            </option>
            <option value='apartment'>Apartment</option>
            <option value='voucher'>Voucher</option>
          </Select>
        )}
      />
      {getErrorMessage(errors, 'offerType')}
    </div>
  );
};

export default OfferType;

interface PropsType {
  offerFormState: IOfferFormState | IOfferFormStateForEdit;
  onInputChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  control: Control;
  Controller: typeof Controller;
  errors: FieldErrors;
  isEditing: boolean;
}
