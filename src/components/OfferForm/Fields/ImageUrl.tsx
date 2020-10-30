import React from 'react';
import getErrorMessage from 'helpers/getValidationMessage';
import { URL_VALIDAITION_REGEXP } from 'global-constants';
import { IOfferFormState, IOfferFormStateForEdit } from 'types';

const ImageUrl: React.FC<PropsType> = ({ onInputChangeHandler, errors, register, offerFormState }) => {
  return (
    <div className='input-field col s12'>
      <input
        name='image'
        id='image'
        type='text'
        className='validate'
        value={offerFormState.image}
        onChange={onInputChangeHandler}
        ref={register({
          required: true,
          validate: (value: string) => (!URL_VALIDAITION_REGEXP.test(value) && 'It is not a valid URL') || true,
        })}
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
  register: any;
  errors: any;
}
