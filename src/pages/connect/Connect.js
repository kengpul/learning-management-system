import { useState } from "react";
import { useAuthenticate } from "../../hooks/useAuthenticate";
import { useAuthContext } from "../../hooks/useAuthContext";

import { ToastCard } from "../../components/Card/ToastCard";
import { Button, Spinner } from "reactstrap";

import "./connect.css";
import logo from "../../assets/logo.png";

export const Connect = () => {
  const [state, setState] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("Student");

  const { dispatch } = useAuthContext();
  const { login, signup, isPending, error, setError, isRegistered } =
    useAuthenticate();

  const togglePage = () => {
    if (state === "sign-up-mode") {
      setState("");
    } else {
      setState("sign-up-mode");
    }
    setUsername("");
    setPassword("");
    setEmail("");
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await login(username, password);
    dispatch({ type: "LOGIN", payload: user });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const user = await signup(username, password, email, type);
    if (user) togglePage();
  };

  return (
    <div className="connect">
      <div
        className={
          state
            ? "sign-up-mode authentication-container"
            : "authentication-container"
        }
      >
        <div className="forms-container">
          <div className="signin-signup">
            {error && <ToastCard message={error} color={"danger"} />}
            {isRegistered && (
              <ToastCard
                message={"Success, you may now sign in"}
                color={"success"}
              />
            )}
            <form className="sign-in-form validate" onSubmit={handleLogin}>
              <h2 className="title">Log in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>

                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="invalid-tooltip">
                  Please provide a Username.
                </div>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                className="main-btn px-5 rounded-pill"
                disabled={isPending}
                type="submit"
              >
                {isPending ? <Spinner /> : "LOGIN"}
              </Button>
            </form>
            <form className="sign-up-form validate" onSubmit={handleSignup}>
              <h2 className="title mt-5">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="input-field">
                <i className="fas fa-user-cog"></i>
                <select
                  id="type"
                  aria-label="Default select example"
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>
              </div>
              <Button
                className="main-btn px-5 rounded-pill"
                disabled={isPending}
                type="submit"
              >
                {isPending ? <Spinner /> : "SIGN UP"}
              </Button>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Freshmen?</h3>
              <p>
                Click Here to become a ICCTians, Improve the environmental
                performance and energy efficiency
              </p>
              <button
                className="btn btn-submit transparent"
                id="sign-up-btn"
                onClick={togglePage}
              >
                Sign up
              </button>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already a ICCTians</h3>
              <p>Hello ICCTians Welcome to ICCT E-Learning</p>
              <button
                className="btn btn-submit transparent"
                id="sign-in-btn"
                onClick={togglePage}
              >
                Sign in
              </button>
            </div>
            <img src={logo} className="image" alt="register" />
          </div>
        </div>
      </div>
    </div>
  );
};
