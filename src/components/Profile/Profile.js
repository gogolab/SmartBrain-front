import React from "react";

import "./Profile.css";

const Profile = props => {
    return (
        <div
            className="profile-modal"
            style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "2em"
            }}
        >
            <button onClick={props.toggleModal} style={{ display: "block" }}>
                Close modal
            </button>
            <div id="profile">
                <img
                    src="http://tachyons.io/img/logo.jpg"
                    className="br-100 ba h3 w3 dib"
                    alt="avatar"
                />
                <h1>John Doe</h1>
                <h4>Images submitted: 5</h4>
                <p>member since: January</p>
                <hr />
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
};

export default Profile;
