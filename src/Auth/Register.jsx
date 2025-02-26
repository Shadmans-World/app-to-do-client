import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuthProvider from "../Hooks/useAuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, googleSignIn, setLoading, user } = useAuthProvider();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");
  const axiosPublic = useAxiosPublic();

  // Handle email/password registration
  const onSubmit = async (data) => {
    setLoading(true);
    setRegisterError("");
    try {
      const userCredential = await createUser(data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.name });
      
      const userInfo = {
        email: data.email,
        name: data.name,
      };
      await axiosPublic.post("/users", userInfo);
      navigate("/tasks");
    } catch (error) {
      setRegisterError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google registration
  const handleGoogleRegister = async () => {
    setLoading(true);
    setRegisterError("");
    try {
      const result = await googleSignIn();
      const userInfo = {
        email: result.user.email,
        name: result.user.displayName,
      };
      await axiosPublic.post("/users", userInfo);
      navigate("/tasks");
    } catch (error) {
      setRegisterError("Google sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">Create an account to start managing your tasks efficiently.</p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
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
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                className="input input-bordered"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Error Message */}
            {registerError && <p className="text-red-500 text-sm">{registerError}</p>}

            {/* Register Button */}
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>

          {/* Google Register Button */}
          <div className="text-center mb-4">
            <button
              onClick={handleGoogleRegister}
              className="btn btn-outline w-[83%] mx-auto"
            >
              Sign up with Google
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mb-5">
            <p>
              Already have an account? <span className="font-bold"><Link to="/">Login</Link></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
