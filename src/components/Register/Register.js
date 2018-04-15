import React, { Component } from "react";

import "./Register.css";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            name: ""
        };
    }

    handleEmailInputChange = event => {
        this.setState({
            email: event.target.value
        });
    };

    handlePasswordInputChange = event => {
        this.setState({
            password: event.target.value
        });
    };

    handleNameInputChange = event => {
        this.setState({
            name: event.target.value
        });
    };

    hadleRegisterSubmit = () => {
        fetch("http://localhost:3000/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    this.props.loadUser(user);
                    this.props.handleRouteChange("home")();
                }
            });
    };

    render() {
        return (
            <div id="register-form">
                <div>
                    <h2>Register</h2>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            onChange={this.handleNameInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">e-mail</label>
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
                            value="Register"
                            onClick={this.hadleRegisterSubmit}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
