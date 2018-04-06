import React, { Component } from "react";
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";

class App extends Component {
    constructor() {
        super();

        this.state = {
            input: ""
        };
    }

    handleInputChange = e => {
        console.log(e.target.value);
    };

    handleInputSubmit = e => {
        console.log("clicked submit");

        app.models
            .predict(
                "a403429f2ddf4b49b307e318f00e528b",
                "https://samples.clarifai.com/face-det.jpg"
            )
            .then(
                function(response) {
                    // do something with response
                },
                function(err) {
                    // there was an error
                }
            );
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
                {/* <FaceDetector /> */}
            </div>
        );
    }
}

export default App;
