import React, { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  // Get functions from context
  const { signIn, googleSignIn, resetPassword } = useContext(AuthContext);

  // Hooks for redirection
  const navigate = useNavigate();
  const location = useLocation();

  // useRef to grab email from the input for password reset
  const emailRef = useRef();

  // Determine where to redirect after login
  const from = location.state?.from?.pathname || "/";
  console.log("User will be redirected to:", from);

  // --- Email/Password Login Handler ---
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log("Login form submitted with:", { email, password });

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log("User logged in successfully:", user);
        toast.success("Logged in successfully!");
        navigate(from, { replace: true }); // Redirect to the intended page
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        toast.error(error.message);
      });
  };

  // --- Google Sign-In Handler ---
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log("Google sign-in successful:", user);
        toast.success("Logged in successfully with Google!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google sign-in error:", error.message);
        toast.error(error.message);
      });
  };

  // --- Forgot Password Handler ---
  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("No email provided for password reset.");
      toast.error("Please enter your email address in the email field first.");
      return;
    }

    resetPassword(email)
      .then(() => {
        console.log("Password reset email sent.");
        toast.info("Password reset email sent. Please check your inbox.");
      })
      .catch((error) => {
        console.error("Password reset error:", error.message);
        toast.error(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>

        <div className="card w-full shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="email@example.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered w-full"
                required
              />
              <label className="label justify-end">
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">Login</button>
            </div>
          </form>

          {/* Divider */}
          <div className="divider px-8">OR</div>

          {/* Google Sign-In Button */}
          <div className="p-4 pt-0 text-center">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full flex items-center justify-center gap-2"
            >
              <FaGoogle /> Continue with Google
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center mb-6">
            New here?{" "}
            <Link to="/register" className="link link-primary">
              Create a New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
