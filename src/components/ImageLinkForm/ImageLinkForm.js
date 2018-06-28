import React from "react";

const ImageLinkForm = props => {
    return (
        <div>
            <p>This is a face detector, give it a try...</p>
            <label>
                Image URL:
                <input type="text" onChange={props.onInputChange} />
            </label>
            <button onClick={props.onInputSubmit}>Detect</button>
        </div>
    );
};

export default ImageLinkForm;
