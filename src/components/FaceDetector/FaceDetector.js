import React from "react";
import "./FaceDetector.css";

const FaceDetector = props => {
    let boxes = <p>waiting...</p>;

    if (props.faceboxes) {
        boxes = props.faceboxes.map(faceBox => {
            const boundingBox = faceBox.region_info.bounding_box;

            const box = {
                top: Math.round(boundingBox.top_row * 100),
                left: Math.round(boundingBox.left_col * 100),
                bottom: Math.round(100 - boundingBox.bottom_row * 100),
                right: Math.round(100 - boundingBox.right_col * 100)
            };

            return (
                <div
                    key={faceBox.id}
                    className="bounding-box"
                    style={{
                        top: box.top + "%",
                        left: box.left + "%",
                        right: box.right + "%",
                        bottom: box.bottom + "%"
                    }}
                />
            );
        });
    }

    return (
        <div className="face-detector-result">
            <img id="input-image" src={props.imageUrl} alt="faces" />
            {boxes}
        </div>
    );
};

export default FaceDetector;
