'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation'; 
import './page.css';
import 'boxicons';
export default function Home() {
  const router = useRouter(); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    router.push('./Home'); 
  };

  return (
    <div className="wrapper">
  <form onSubmit={handleSubmit}>
    <h1>Login</h1>
    <div className="input-box">
      <input type="text" placeholder="username" required="" />
      <i className="bx bxs-user" />
      <input type="password" placeholder="password" required="" />
      <i className="bx bxs-lock-alt" />
    </div>
    <div className="remember-forgot">
      <label>
        <input type="checkbox" />
        remember me
      </label>
      <a href="#">Forgot password!</a>
    </div>
    <button type="submit" className="btn">
      Login
    </button>
    <div className="register-link">
      <p>
        Don't have an account!
        <a href="#">Register</a>
      </p>
    </div>
  </form>
</div>

  );
}
