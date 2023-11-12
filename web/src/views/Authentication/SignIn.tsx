import React from 'react';
import { SignInForm } from '../../components';
import AuthenticationService from '../../services/AuthenticationService';
import {
  useNavigate,
  Navigate,
} from 'react-router-dom';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const handleSignIn = async (email: string, password: string) => {
    const auth = new AuthenticationService();
    const data = await auth.signin(email, password);

    if (data.status === 'error') return null;

    localStorage.setItem('access_token', data.data.access_token);
    navigate('/collection');
  };

  return (
    <div>
      <h1>Login page!</h1>
      <SignInForm onSubmit={handleSignIn} />
    </div>
  );
};

export default SignIn;