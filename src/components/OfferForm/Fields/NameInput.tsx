import React from 'react';
import getErrorMessage from 'helpers/getValidationMessage';

const NameInput: React.FC<PropsType> = ({ onInputChangeHandler, errors, register, offerFormState }) => {
  return (
    <div className='row'>
      <div className='input-field col s12'>
        <input
          name='name'
          id='name'
          type='text'
          className='validate'
          value={offerFormState.name}
          onChange={onInputChangeHandler}
          ref={register({ required: true, minLength: 2, maxLength: 50 })}
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
  offerFormState: any;
  onInputChangeHandler: (event: React.ChangeEvent<any>) => void;
  register: any;
  errors: any;
}
