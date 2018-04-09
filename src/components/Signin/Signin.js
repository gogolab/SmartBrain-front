import React from "react";

import "./Signin.css";

const Signin = props => {
    return (
        <div id="sign-in-form">
            <div>
                <h2>Sign In</h2>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <br />
                <div>
                    <input
                        type="submit"
                        value="Sign in"
                        onClick={props.handleRouteChange("home")}
                    />
                </div>
                <div>
                    <p onClick={props.handleRouteChange("register")}>
                        Register
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signin;
