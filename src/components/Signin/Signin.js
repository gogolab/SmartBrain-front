import React, { Component } from "react";

import "./Signin.css";

class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signInEmail: "",
            signInPassword: ""
        };
    }

    handleEmailInputChange = event => {
        this.setState({
            signInEmail: event.target.value
        });
    };

    handlePasswordInputChange = event => {
        this.setState({
            signInPassword: event.target.value
        });
    };

    hadleSignInSubmit = () => {
        fetch("http://localhost:3000/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.joined) {
                    this.props.loadUser(user);
                    this.props.handleRouteChange("home")();
                }
            });
    };

    render() {
        return (
            <div id="sign-in-form">
                <div>
                    <h2>Sign In</h2>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            onChange={this.handleEmailInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={this.handlePasswordInputChange}
                        />
                    </div>
                    <br />
                    <div>
                        <input
                            type="submit"
                            value="Sign in"
                            onClick={this.hadleSignInSubmit}
                        />
                    </div>
                    <div>
                        <p onClick={this.props.handleRouteChange("register")}>
                            Register
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signin;
