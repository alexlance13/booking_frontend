import getErrorMessage from 'helpers/getValidationMessage';
import React from 'react';

const Description: React.FC<PropsType> = ({ onInputChangeHandler, errors, register, offerFormState }) => {
  return (
    <div className='input-field col s12'>
      <textarea
        name='description'
        id='description'
        className='materialize-textarea'
        value={offerFormState.description}
        onChange={onInputChangeHandler}
        ref={register({
          required: true,
          minLength: 30,
          maxLength: 800,
        })}
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
  offerFormState: any;
  onInputChangeHandler: (event: React.ChangeEvent<any>) => void;
  register: any;
  errors: any;
}
