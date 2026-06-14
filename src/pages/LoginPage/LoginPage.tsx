import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApi';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser] = useLoginMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const data = await loginUser({
        username,
        password,
      }).unwrap();

      const token = data.accessToken;
      localStorage.setItem('token', token);

      dispatch(setUser({ user: data, token: data.token }));
      navigate('/products');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="username"
        value={username}
        onChange={handleUsernameChange}
      />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}
