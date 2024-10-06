'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' in App Router

export default function Home() {
  const router = useRouter(); // Initialize useRouter for navigation

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior
    // Redirect to the home page (app/page.js)
    router.push('/');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form className="w-50" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
