import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";

const Navigation = props => {
    let navLinks;

    if (props.isSignedIn) {
        navLinks = (
            <div>
                <ProfileIcon />
                <p onClick={props.handleRouteChange("signout")}>Sign Out</p>
            </div>
        );
    } else {
        navLinks = (
            <div>
                <p onClick={props.handleRouteChange("signin")}>Sign In</p>
                <p onClick={props.handleRouteChange("register")}>Register</p>
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
