import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuthProvider from "../Hooks/useAuthProvider";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser, signWithGoogle, loading } = useAuthProvider();
  const navigate = useNavigate();

  // Handle email/password login
  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);
      navigate("/tasks"); // Redirect to tasks page after login
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await signWithGoogle();
      navigate("/tasks"); // Redirect to tasks page after Google sign-in
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <div>
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
                onClick={()=>handleGoogleLogin}
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
    </div>
  );
};

export default Login;
