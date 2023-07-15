// API
import { loginAPI } from '../../api/APIRoutes';

// CSS
import './Login.scss';

// DATA
import { UserDataParams } from '../../data/typeParams';
import { toastError } from '../../data/toastConfig';

// MODULE
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

// REACT HOOK
import React, { useReducer, useEffect } from 'react';

type RegisterActionParams = {
  type: 'HANDLE_INPUT_TEXT';
  field: string;
  payload: string;
};

function Login() {
  const navigate = useNavigate();

  const initialFormState = {
    username: '',
    password: '',
  };

  const formReducer = (state: UserDataParams, action: RegisterActionParams) => {
    switch (action.type) {
      case 'HANDLE_INPUT_TEXT':
        return {
          ...state,
          [action.field]: action.payload,
        };
      default:
        return state;
    }
  };

  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  const { username, password } = formState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post(loginAPI, {
      username,
      password,
    });
    if (data.status === true) {
      localStorage.setItem('blufips-user', JSON.stringify(data.user));
      navigate('/');
    } else {
      toast.error(data.msg, toastError);
    }
  };

  const handleTextChange = (e: React.FormEvent<HTMLInputElement>) =>
    formDispatch({
      type: 'HANDLE_INPUT_TEXT',
      field: e.currentTarget.name,
      payload: e.currentTarget.value,
    });

  useEffect(() => {
    if (localStorage.getItem('blufips-user')) {
      navigate('/');
    }
  }, []);

  const renderForm = (
    <form className='login__form' onSubmit={handleSubmit}>
      <div className='login__trademark'>
        <h1>blufips</h1>
      </div>
      <input
        type='text'
        name='username'
        value={username}
        placeholder='Username'
        onChange={(e) => handleTextChange(e)}
        required
      />
      <input
        type='password'
        name='password'
        value={password}
        placeholder='Password'
        onChange={(e) => handleTextChange(e)}
        required
      />
      <button className='login__button'>Log In</button>
      <div className='login__no-account'>
        Dont have account?{' '}
        <span onClick={() => navigate('/register')}>Sign Up</span>
      </div>
    </form>
  );
  return <main className='register'>{renderForm}</main>;
}

export default Login;
