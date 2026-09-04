import {type FormEvent, useState} from "react";
import {useRecoilState} from "recoil";
import userState from "../States/userState";

const Login = () => {
    const correctEmail = "admin@admin.com";
    const correctPassword = "123456";
    const [currentUserState, setUserState] = useRecoilState(userState);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (username === correctEmail && password === correctPassword) {
            setUserState({loggedIn: true});
        }
    };


    if (currentUserState.loggedIn) {
        return (
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <h1 className="fw-bold">You are logged in</h1>
                    <p className="text-secondary">Welcome back!</p>

                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
