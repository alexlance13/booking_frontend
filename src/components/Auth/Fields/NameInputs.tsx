import React from 'react';
import getErrorMessage from 'helpers/getValidationMessage';

const NameInputs: React.FC<PropsType> = ({ onInputChangeHandler, errors, register }) => {
  return (
    <div className='row'>
      <div className='input-field col s6'>
        <input
          name='first_name'
          id='first_name'
          type='text'
          className='validate'
          onChange={onInputChangeHandler}
          ref={register({ required: true, minLength: 2, maxLength: 50 })}
        />
        {getErrorMessage(errors, 'first_name')}
        <label className='active' htmlFor='first_name'>
          First Name
        </label>
      </div>
      <div className='input-field col s6'>
        <input
          name='last_name'
          id='last_name'
          type='text'
          className='validate'
          onChange={onInputChangeHandler}
          ref={register({ required: true, minLength: 2, maxLength: 50 })}
        />
        {getErrorMessage(errors, 'last_name')}
        <label className='active' htmlFor='last_name'>
          Last Name
        </label>
      </div>
    </div>
  );
};

export default NameInputs;

interface PropsType {
  onInputChangeHandler: (event: React.ChangeEvent<any>) => void;
  register: any;
  errors: any;
}
