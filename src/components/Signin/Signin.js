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

    saveAuthTokenInSession = token => {
        window.sessionStorage.setItem("token", token);
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
            .then(data => {
                if (data.userId && data.success) {
                    this.saveAuthTokenInSession(data.token);

                    fetch(`http://localhost:3000/profile/${data.userId}`, {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: data.token
                        }
                    })
                        .then(resp => resp.json())
                        .then(user => {
                            if (user && user.email) {
                                console.log("user:", user);
                                this.props.loadUser(user);
                                this.props.handleRouteChange("home")();
                            }
                        });
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
                <div
                    style={{
                        color: "red",
                        fontSize: "12px",
                        backgroundColor: "#000"
                    }}
                >
                    <p style={{ margin: "0" }}>dev login: test@test.com</p>
                    <p style={{ margin: "0" }}>dev pwd: test</p>
                </div>
            </div>
        );
    }
}

export default Signin;
