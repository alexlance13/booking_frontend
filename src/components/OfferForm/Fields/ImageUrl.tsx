import React from 'react';
import getErrorMessage from 'helpers/getValidationMessage';
import { URL_VALIDAITION_REGEXP } from 'global-constants';
import { IOfferFormState, IOfferFormStateForEdit } from 'types';
import { FieldErrors, Controller, Control } from 'react-hook-form';

const ImageUrl: React.FC<PropsType> = ({ onInputChangeHandler, errors, control, Controller, offerFormState }) => {
  return (
    <div className='input-field col s12'>
      <Controller
        control={control}
        rules={{
          required: true,
          validate: (value: string) => (!URL_VALIDAITION_REGEXP.test(value) && 'It is not a valid URL') || true,
        }}
        name='image'
        defaultValue={offerFormState.image}
        render={(props: any) => (
          <input
            onChange={(event) => {
              props.onChange(event);
              onInputChangeHandler(event);
              return event;
            }}
            id='image'
            value={offerFormState.image}
            name={props.name}
            type='text'
            className='validate'
          />
        )}
      />
      {getErrorMessage(errors, 'image')}
      <label className='active' htmlFor='image'>
        ImageUrl
      </label>
    </div>
  );
};

export default ImageUrl;

interface PropsType {
  offerFormState: IOfferFormState | IOfferFormStateForEdit;
  onInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;

  control: Control;
  Controller: typeof Controller;
  errors: FieldErrors;
}
