import React from "react";
import "./FaceDetector.css";

const FaceDetector = props => {
    console.log("fd props", props);

    let faceboxes = <p>waiting...</p>;

    if (props.faceBox) {
        faceboxes = (
            <div
                className="bounding-box"
                style={{
                    top: props.faceBox.top + "%",
                    left: props.faceBox.left + "%",
                    right: props.faceBox.right + "%",
                    bottom: props.faceBox.bottom + "%"
                    // border: "1px solid #000"
                }}
            />
        );
    }

    return (
        <div className="face-detector-result">
            <img id="input-image" src={props.imageUrl} alt="faces" />
            {faceboxes}
        </div>
    );
};

export default FaceDetector;
