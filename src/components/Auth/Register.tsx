import React from 'react';
import { useForm } from 'react-hook-form';
import { Wrapper, SubmitDiv, Header, P } from './styles';
import Fields from './Fields';
import { Link } from 'react-router-dom';
import { IUserForm, MyChangeEvents } from 'types';

const Register: React.FC<PropsType> = ({ authFormState, onInputChangeHandler, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <Wrapper>
      <Header>Sign up</Header>
      <div className='row'>
        <form onSubmit={handleSubmit(onSubmit)} className='col s12'>
          <Fields.NameInputs onInputChangeHandler={onInputChangeHandler} errors={errors} register={register} />
          <div className='row'>
            <Fields.Email onInputChangeHandler={onInputChangeHandler} errors={errors} register={register} />
          </div>
          <div className='row'>
            <div className='input-field col s6'>
              <Fields.Password onInputChangeHandler={onInputChangeHandler} errors={errors} register={register} />
            </div>
            <div className='input-field col s6'>
              <Fields.PasswordConfirm
                onInputChangeHandler={onInputChangeHandler}
                errors={errors}
                register={register}
                authFormState={authFormState}
              />
            </div>
          </div>
          <Fields.Role onInputChangeHandler={onInputChangeHandler} errors={errors} register={register} />
          <SubmitDiv>
            <button className='btn waves-light' type='submit' name='action'>
              Submit
            </button>
          </SubmitDiv>
          <P>
            Click <Link to='/auth/login'>here</Link> to go to the login page
          </P>
        </form>
      </div>
    </Wrapper>
  );
};

export default Register;

interface PropsType {
  authFormState: IUserForm;
  onSubmit: (user: IUserForm) => void;
  onInputChangeHandler: (event: MyChangeEvents) => void;
}
