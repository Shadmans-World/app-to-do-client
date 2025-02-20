import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuthProvider from "../Hooks/useAuthProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, signInUser, googleSignIn, loading, setLoading } = useAuthProvider();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(""); // State for error messages

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/tasks");
    }
  }, [user, navigate]);

  // Handle email/password login
  const onSubmit = async (data) => {
    setLoading(true);
    setLoginError(""); // Clear previous errors
    try {
      await signInUser(data.email, data.password);
      navigate("/tasks");
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setLoginError(""); // Clear previous errors
    try {
      await googleSignIn();
      navigate("/tasks");
    } catch (error) {
      setLoginError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Login to manage your tasks efficiently and stay organized.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="input input-bordered"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Error Message */}
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

            {/* Login Button */}
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {/* Google Login Button */}
          <div className="text-center mb-4">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-[83%] mx-auto"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login with Google"}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center mb-5">
            <p>
              Don't have an account?{" "}
              <span className="font-bold">
                <Link to="/register">Register</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
