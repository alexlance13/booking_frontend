import React from 'react';
import { Select } from '../styles';
import getErrorMessage from 'helpers/getValidationMessage';
import { IOfferFormState, IOfferFormStateForEdit } from 'types';

const Variant: React.FC<PropsType> = ({ onInputChangeHandler, errors, control, Controller, offerFormState }) => {
  return (
    <div className='input-field'>
      <Controller
        control={control}
        rules={{ required: true }}
        name='variant'
        defaultValue={offerFormState.variant}
        render={(props: any) => (
          <Select
            name={props.name}
            value={props.value}
            id='variant'
            onChange={(event) => {
              props.onChange(event);
              onInputChangeHandler(event);
              return event;
            }}>
            <option value='' disabled>
              Choose your voucher variant
            </option>
            <option value='RESTAURANT'>Restaurant</option>
            <option value='CLUB'>Club</option>
            <option value='MUSEUM'>Museum</option>
            <option value='CINEMA'>Cinema</option>
          </Select>
        )}
      />
      {getErrorMessage(errors, 'variant')}
    </div>
  );
};

export default Variant;

interface PropsType {
  offerFormState: IOfferFormState | IOfferFormStateForEdit;
  onInputChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  control: any;
  Controller: any;
  errors: any;
}
