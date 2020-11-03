import React from 'react';
import getErrorMessage from 'helpers/getValidationMessage';
import { IOfferFormState, IOfferFormStateForEdit } from 'types';
import { FieldErrors, Controller, Control } from 'react-hook-form';

const NameInput: React.FC<PropsType> = ({ onInputChangeHandler, errors, offerFormState, control, Controller }) => {
  return (
    <div className='row'>
      <div className='input-field col s12'>
        <Controller
          control={control}
          defaultValue={offerFormState.name}
          rules={{ required: true, minLength: 2, maxLength: 50 }}
          name='name'
          render={(props: any) => (
            <input
              onChange={(event) => {
                props.onChange(event);
                onInputChangeHandler(event);
                return event;
              }}
              id='name'
              value={offerFormState.name}
              name={props.name}
              type='text'
              className='validate'
            />
          )}
        />
        {getErrorMessage(errors, 'name')}
        <label className='active' htmlFor='name'>
          Name
        </label>
      </div>
    </div>
  );
};

export default NameInput;

interface PropsType {
  offerFormState: IOfferFormState | IOfferFormStateForEdit;
  onInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors;
  control: Control;
  Controller: typeof Controller;
}
