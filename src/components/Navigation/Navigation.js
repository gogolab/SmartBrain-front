import React from "react";

const Navigation = props => {
    let navLinks;

    if (props.isSignedIn) {
        navLinks = <p onClick={props.handleRouteChange("signout")}>Sign Out</p>;
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
