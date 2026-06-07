import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    dispatch(setUser({ user: data, token: data.token }));
    navigate('/products');
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}
