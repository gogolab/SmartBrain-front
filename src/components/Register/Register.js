import React from "react";

import "./Register.css";

const Register = props => {
    return (
        <div id="register-form">
            <div>
                <h2>Register</h2>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" />
                </div>
                <div>
                    <label htmlFor="email">e-mail</label>
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
                        value="Register"
                        onClick={props.handleRouteChange("home")}
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
