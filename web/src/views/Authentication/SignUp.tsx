import React from 'react';
import { SignUpForm } from '../../components';
import AuthenticationService from '../../services/AuthenticationService';

const SignUp: React.FC = () => {
  const handleSignUp = async (email: string, password: string) => {
    const auth = new AuthenticationService();
    const data = await auth.signup(email, password);
    
    if (data.status === 'error') return null;

    localStorage.setItem('access_token', data.data.access_token);
  };

  return (
    <div>
      <h1>Registration page!</h1>
      <SignUpForm onSubmit={handleSignUp} />
    </div>
  );
};

export default SignUp;