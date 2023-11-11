import React, { useState } from 'react';

interface SignInFormProps {
  onSubmit: (email: string, password: string) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = () => {
    onSubmit(email, password);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignInForm;