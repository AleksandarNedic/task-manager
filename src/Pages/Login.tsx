import { useState } from "react";
import { useRecoilState } from "recoil";
import userState from "../States/userState";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import Tasks from "./Tasks"

type LoginFormData = {
    email: string;
    password: string;
};

const Login = () => {
    const [currentUserState, setUserState] = useRecoilState(userState);
    const [loginMessage, setLoginMessage] = useState("");

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginFormData>();

    const handleLogin = async (data: LoginFormData) => {
        try {
            await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            setUserState({ loggedIn: true });
            setLoginMessage("Login successful!");
        } catch (error) {
            setError("root", {
                message: "Invalid email or password",
            });
        }
    };

    if (currentUserState.loggedIn) {
        return (
            <div>
                <div>
                  <Tasks/>
                </div>
                <div className="container vh-100 d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <h1 className="fw-bold">You are logged in</h1>
                        <p className="text-secondary">Welcome back!</p>
                    </div>
                </div>

            </div>



        );
    }

    return (
        <main className="container py-4 py-md-5">
            <section
                className="mx-auto"
                style={{ maxWidth: "480px" }}
            >
                <div className="card border-0 shadow-lg overflow-hidden rounded-4">

                    <div
                        className="p-4 p-md-5 text-center text-white"
                        style={{
                            background:
                                "linear-gradient(135deg, #0d6efd, #6610f2, #d63384)",
                        }}
                    >
                        <div className="mb-3">
                            <div
                                className="bg-white text-primary rounded-circle d-inline-flex align-items-center justify-content-center shadow"
                                style={{
                                    width: "70px",
                                    height: "70px",
                                }}
                            >
                                <span className="fs-2">
                                    🔐
                                </span>
                            </div>
                        </div>

                        <h1 className="h2 fw-bold mb-2">
                            Welcome back
                        </h1>

                        <p className="mb-0 text-white-50">
                            Login to continue managing your tasks.
                        </p>
                    </div>

                    <div className="card-body p-4 p-md-5 bg-body-tertiary">

                        <form onSubmit={handleSubmit(handleLogin)}>

                            {errors.root && (
                                <div className="alert alert-danger border-0 shadow-sm rounded-3">
                                    {errors.root.message}
                                </div>
                            )}

                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="form-label fw-semibold"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    className={`form-control form-control-lg ${
                                        errors.email ? "is-invalid" : ""
                                    }`}
                                    placeholder="Enter your email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message:
                                                "Enter a valid email address",
                                        },
                                    })}
                                />

                                {errors.email && (
                                    <div className="invalid-feedback">
                                        {errors.email.message}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="form-label fw-semibold"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    className={`form-control form-control-lg ${
                                        errors.password ? "is-invalid" : ""
                                    }`}
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters",
                                        },
                                    })}
                                />

                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password.message}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-100 fw-semibold shadow-sm"
                            >
                                Login
                            </button>

                            <div className="text-center mt-3">
                                <small className="text-secondary">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="btn btn-link p-0 text-decoration-none fw-semibold"
                                    >
                                        Register
                                    </Link>
                                </small>
                            </div>

                        </form>

                    </div>

                    <div className="card-footer bg-white border-0 text-center py-3">
                        <small className="text-secondary">
                            Task Manager • Stay organized and productive
                        </small>
                    </div>

                </div>
            </section>
        </main>
    );
};

export default Login;