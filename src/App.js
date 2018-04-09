import React, { Component } from "react";
import Clarifai from "clarifai";
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceDetector from "./components/FaceDetector/FaceDetector";
import Signin from "./components/Signin/Signin";

const app = new Clarifai.App({
    apiKey: "eef309dc9d664086b7455f4a101ab9a1"
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            imageUrl: "",
            faceboxes: null
        };
    }

    handleFacesLocationData = respData => {
        this.setState({
            faceboxes: respData.outputs[0].data.regions
        });
    };

    handleInputChange = e => {
        this.setState({ input: e.target.value });
    };

    handleInputSubmit = e => {
        this.setState({
            imageUrl: this.state.input
        });

        app.models
            .predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
            .then(response => {
                this.handleFacesLocationData(response);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="App">
                <Navigation />
                <Signin />
                <Logo />
                <ImageLinkForm
                    onInputChange={this.handleInputChange}
                    onInputSubmit={this.handleInputSubmit}
                />
                <FaceDetector
                    imageUrl={this.state.imageUrl}
                    faceboxes={this.state.faceboxes}
                />
            </div>
        );
    }
}

export default App;
