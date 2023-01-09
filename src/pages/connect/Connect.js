import { useState } from "react";
import "./connect.css";
import logo from '../../assets/logo.png'

export const Connect = () => {
  const [state, setState] = useState();

  return (
    <>
      <div
        className={
          state
            ? "sign-up-mode authentication-container"
            : "authentication-container"
        }
      >
        <div className="forms-container">
          <div className="signin-signup">
            <form
              action="/login"
              method="POST"
              className="sign-in-form validate"
              noValidate
            >
              <h2 className="title">Log in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  required
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
                  required
                />
                <div className="invalid-tooltip">
                  Please provide a Password.
                </div>
              </div>
              <input type="submit" value="Login" className="btn btn-submit solid" />
            </form>
            <form
              action="/register"
              method="POST"
              className="sign-up-form validate"
              noValidate
            >
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  required
                />
                <div className="invalid-tooltip">Please provide a Username</div>
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" name="email" required />
                <div className="invalid-tooltip">
                  Please provide a valid email
                </div>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
                <div className="invalid-tooltip">Please provide a Password</div>
              </div>

              <div className="input-field">
                <i className="fas fa-user-cog"></i>
                <select
                  id="type"
                  aria-label="Default select example"
                  name="type"
                  required
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>
                <div className="invalid-tooltip">
                  Please provide an account type!.
                </div>
              </div>

              <input type="submit" className="btn btn-submit" value="Sign up" />
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
                onClick={() => setState("sign-up-mode")}
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
                onClick={() => setState("")}
              >
                Sign in
              </button>
            </div>
            <img
              src={logo}
              className="image"
              alt="register"
            />
          </div>
        </div>
      </div>
    </>
  );
};
