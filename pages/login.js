import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../services/api'; // Pastikan axios diimport dengan benar

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Kirim login ke backend untuk autentikasi
      const response = await axios.post('http://localhost:3001/admin/login', { email, password });

      if (response.data.message === 'Login successful') {
        // Jika login berhasil, simpan sesi atau token dalam cookies/session jika diperlukan
        localStorage.setItem('auth_token', 'some-token-if-needed'); // Hanya jika perlu menyimpan token atau info sesi
        router.push('/dashboard');  // Redirect ke halaman dashboard setelah login
      }
    } catch (error) {
      setError('Email atau password salah');
    }
  };

  return (
    <div>
      <h1>Login Admin</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
