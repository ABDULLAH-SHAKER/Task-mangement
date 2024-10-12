'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './login.css'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/Home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className="bx bxs-user" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i className="bx bxs-lock-alt" />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="btn">
          Login
        </button>
        <div className="register-link">
          <p>
            Don't have an account?
            <a href="/signup"> Register</a> 
          </p>
        </div>
      </form>
    </div>
  );
}
