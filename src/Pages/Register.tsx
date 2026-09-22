import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setRegisterMessage("Registration successful!");
        } catch (error) {
            console.log(error);
        }
    };

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
                                <span className="fs-2">👤</span>
                            </div>
                        </div>

                        <h1 className="h2 fw-bold mb-2">
                            Create an account
                        </h1>

                        <p className="mb-0 text-white-50">
                            Register to start managing your tasks.
                        </p>
                    </div>

                    <div className="card-body p-4 p-md-5 bg-body-tertiary">

                        <form
                          onSubmit={handleRegister}
                        >

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
                                    className="form-control form-control-lg"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />
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
                                    className="form-control form-control-lg"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                              <p>
                                  {registerMessage}
                              </p>
                            <button
                                onClick={handleRegister}
                                type="submit"
                                className="btn btn-primary btn-lg w-100 fw-semibold shadow-sm"
                            >
                                Register
                            </button>

                            <div className="text-center mt-3">
                                <small className="text-secondary">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="btn btn-link p-0 text-decoration-none fw-semibold"
                                    >
                                        Login
                                    </Link>
                                </small>
                            </div>

                        </form>

                    </div>

                </div>
            </section>
        </main>
    );
};

export default Register;