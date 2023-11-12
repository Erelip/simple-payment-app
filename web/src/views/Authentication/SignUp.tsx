import React from 'react';
import { SignUpForm } from '../../components';
import AuthenticationService from '../../services/AuthenticationService';
import {
  useNavigate,
  Navigate,
} from 'react-router-dom';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const handleSignUp = async (email: string, password: string) => {
    const auth = new AuthenticationService();
    const data = await auth.signup(email, password);
    
    if (data.status === 'error') return null;

    document.cookie = `jwt=${data.data.access_token}; path=/`;
    localStorage.setItem('access_token', data.data.access_token);
    navigate('/collection');
  };

  return (
    <div>
      <h1>Registration page!</h1>
      <SignUpForm onSubmit={handleSignUp} />
    </div>
  );
};

export default SignUp;