import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";

const Navigation = props => {
    let navLinks;

    if (props.isSignedIn) {
        navLinks = (
            <div>
                <ProfileIcon
                    onRouteChange={props.handleRouteChange}
                    toggleModal={props.toggleModal}
                />
            </div>
        );
    } else {
        navLinks = (
            <div style={{ display: "flex" }}>
                <p
                    onClick={props.handleRouteChange("signin")}
                    style={{ marginRight: "1em" }}
                >
                    Sign In
                </p>
                <p
                    onClick={props.handleRouteChange("register")}
                    style={{ marginRight: "1em" }}
                >
                    Register
                </p>
            </div>
        );
    }

    return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
            {navLinks}
        </nav>
    );
};

export default Navigation;
