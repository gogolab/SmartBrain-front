import React, { Component } from "react";
import Clarifai from "clarifai";
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceDetector from "./components/FaceDetector/FaceDetector";

const app = new Clarifai.App({
    apiKey: "eef309dc9d664086b7455f4a101ab9a1"
});

class App extends Component {
    constructor() {
        super();

        this.state = {
            input: "",
            imageUrl: "",
            faceBox: {}
        };
    }

    calculateFaceLocation = data => {
        console.log("calcFaceLoc data: ", data);
        const clarifaiFace =
            data.outputs[0].data.regions[0].region_info.bounding_box;

        console.log(clarifaiFace);
        const image = document.getElementById("input-image");
        const width = Number(image.width);
        const height = Number(image.height);

        const box = {
            top: Math.round(clarifaiFace.top_row * 100),
            bottom: Math.round(100 - clarifaiFace.bottom_row * 100),
            left: Math.round(clarifaiFace.left_col * 100),
            right: Math.round(100 - clarifaiFace.right_col * 100)
        };

        // this.setState({
        //     faceBox: {
        //         topRow,
        //         bottomRow,
        //         leftCol,
        //         rightCol
        //     }
        // });
        this.setState({
            faceBox: box
        });
    };

    handleInputChange = e => {
        this.setState({ input: e.target.value });
    };

    handleInputSubmit = e => {
        console.log("clicked submit");
        this.setState({
            imageUrl: this.state.input
        });

        app.models
            .predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
            .then(response => {
                // console.log(response);
                this.calculateFaceLocation(response);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="App">
                <Navigation />
                <Logo />
                <ImageLinkForm
                    onInputChange={this.handleInputChange}
                    onInputSubmit={this.handleInputSubmit}
                />
                <FaceDetector
                    imageUrl={this.state.imageUrl}
                    faceBox={this.state.faceBox}
                />
            </div>
        );
    }
}

export default App;
