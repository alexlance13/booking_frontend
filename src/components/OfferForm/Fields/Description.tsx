import getErrorMessage from 'helpers/getValidationMessage';
import React from 'react';
import { IOfferFormState, IOfferFormStateForEdit } from 'types';

const Description: React.FC<PropsType> = ({ onInputChangeHandler, errors, control, Controller, offerFormState }) => {
  return (
    <div className='input-field col s12'>
      <Controller
        control={control}
        rules={{ required: true, minLength: 30, maxLength: 800 }}
        defaultValue={offerFormState.description}
        name='description'
        render={(props: any) => (
          <textarea
            onChange={(event) => {
              props.onChange(event);
              onInputChangeHandler(event);
              return event;
            }}
            id='description'
            value={offerFormState.description}
            name={props.name}
            className='materialize-textarea'
          />
        )}
      />
      {getErrorMessage(errors, 'description')}
      <label className='active' htmlFor='description'>
        Description
      </label>
    </div>
  );
};

export default Description;

interface PropsType {
  offerFormState: IOfferFormState | IOfferFormStateForEdit;
  onInputChangeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

  control: any;
  Controller: any;
  errors: any;
}
