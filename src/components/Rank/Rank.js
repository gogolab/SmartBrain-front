import React from "react";

const Rank = props => {
    console.log("rank props:", props);
    return (
        <div>
            <div>{props.name}, Your current count of entries is:</div>
            <div>{props.entries}</div>
        </div>
    );
};

export default Rank;
