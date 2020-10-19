import React from 'react';
import { useForm } from 'react-hook-form';
import { Wrapper, SubmitDiv, Header, P } from './styles';
import Fields from './Fields';
import { NavLink } from 'react-router-dom';

const Login: React.FC<PropsType> = ({ onInputChangeHandler, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <Wrapper>
      <Header>Log in</Header>
      <div className='row'>
        <form onSubmit={handleSubmit(onSubmit)} className='col s12'>
          <div className='row'>
            <Fields.Email onInputChangeHandler={onInputChangeHandler} errors={errors} register={register} />
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <Fields.Password onInputChangeHandler={onInputChangeHandler} errors={errors} register={register} />
            </div>
          </div>
          <SubmitDiv>
            <button className='btn waves-effect waves-light' type='submit' name='action'>
              Submit
            </button>
          </SubmitDiv>
          <P>
            Click <NavLink to='/auth/register'>here</NavLink> to go to the sign up page
          </P>
        </form>
      </div>
    </Wrapper>
  );
};

export default Login;

type PropsType = {
  authFormState: any;
  onSubmit: (user: any) => void;
  onInputChangeHandler: (event: React.ChangeEvent<any>) => void;
};
