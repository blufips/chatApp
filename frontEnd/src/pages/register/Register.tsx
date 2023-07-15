// API
import { registerAPI } from '../../api/APIRoutes';

// CSS
import './Register.scss';

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

function Register() {
  const navigate = useNavigate();

  const initialFormState = {
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
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

  const { username, email, password, confirmpassword } = formState;

  const handleValidation = () => {
    if (password !== confirmpassword) {
      toast.error('Password did not match', toastError);
      return false;
    } else if (username.length < 4) {
      toast.error(
        'Invalid Username it must more than 3 charracters',
        toastError
      );
      return false;
    } else if (password.length < 5) {
      toast.error(
        'Invalid Password it must more than 4 charracters',
        toastError
      );
      return false;
    } else return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        const { data } = await axios.post(registerAPI, {
          username,
          email,
          password,
        });
        if (data.status === true) {
          localStorage.setItem('blufips-user', JSON.stringify(data.user));
          navigate('/');
        } else {
          toast.error(data.msg, toastError);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
    <form className='register__form' onSubmit={handleSubmit}>
      <div className='register__trademark'>
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
        type='email'
        name='email'
        value={email}
        placeholder='Email'
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
      <input
        type='password'
        name='confirmpassword'
        value={confirmpassword}
        placeholder='Confirm Password'
        onChange={(e) => handleTextChange(e)}
        required
      />
      <button className='register__button'>Sign Up</button>
      <div className='register__has-account'>
        already register? <span onClick={() => navigate('/login')}>Login</span>
      </div>
    </form>
  );
  return <main className='register'>{renderForm}</main>;
}

export default Register;
