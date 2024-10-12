'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../Firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './page.css';
import 'boxicons';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('./Home'); 
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSignup}>
        <h1>Register</h1>
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
          Register
        </button>
        <div className="register-link">
          <p>
            Already have an account!
            <a href="./Login"> Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}
