import React from 'react';
import { useForm } from 'react-hook-form';
import { Wrapper, SubmitDiv, Header, P } from './styles';
import Fields from './Fields';
import { NavLink } from 'react-router-dom';

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
            <button className='btn waves-effect waves-light' type='submit' name='action'>
              Submit
            </button>
          </SubmitDiv>
          <P>
            Click <NavLink to='/auth/login'>here</NavLink> to go to the login page
          </P>
        </form>
      </div>
    </Wrapper>
  );
};

export default Register;

type PropsType = {
  authFormState: any;
  onSubmit: (user: any) => void;
  onInputChangeHandler: (event: React.ChangeEvent<any>) => void;
};
