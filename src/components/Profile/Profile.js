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
            <div id="profile">
                <header
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <img
                        src="http://tachyons.io/img/logo.jpg"
                        className="br-100 ba h3 w3 dib"
                        alt="avatar"
                    />
                    <button
                        onClick={props.toggleModal}
                        style={{ float: "right" }}
                    >
                        &times;
                    </button>
                </header>
                <h1>John Doe</h1>
                <h4>Images submitted: 5</h4>
                <p>member since: January</p>
                <hr />
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="John"
                        onChange={this.handleNameInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Age</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="123"
                        onChange={this.handleEmailInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Pet</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="dragon"
                        onChange={this.handlePasswordInputChange}
                    />
                </div>
                <br />
                <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                    <button>Save</button>
                    <button onClick={props.toggleModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
