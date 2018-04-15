import React, { Component } from "react";
import Clarifai from "clarifai";
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceDetector from "./components/FaceDetector/FaceDetector";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const app = new Clarifai.App({
    apiKey: "eef309dc9d664086b7455f4a101ab9a1"
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
            imageUrl: "",
            faceboxes: null,
            route: "signin",
            isSignedIn: false,
            user: {
                id: "",
                name: "",
                email: "",
                entries: "",
                joined: ""
            }
        };
    }

    componentDidMount() {
        fetch("http://localhost:3000")
            .then(response => response.json())
            .then(data => console.log(data));
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
            imageUrl: this.state.input,
            faceboxes: null
        });

        app.models
            .predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
            .then(response => {
                if (response) {
                    fetch("http://localhost:3000/image", {
                        method: "put",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState({
                                user: {
                                    ...this.state.user,
                                    entries: count
                                }
                            });
                        });
                }
                this.handleFacesLocationData(response);
            })
            .catch(err => console.log(err));
    };

    handleRouteChange = route => () => {
        if (route === "signout") {
            this.setState({ isSignedIn: false });
        } else if (route === "home") {
            this.setState({ isSignedIn: true });
        }

        this.setState({ route: route });
    };

    handleLoadUser = userData => {
        this.setState({
            user: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                entries: userData.entries,
                joined: userData.joined
            }
        });
    };

    render() {
        let content = (
            <Signin
                handleRouteChange={this.handleRouteChange}
                loadUser={this.handleLoadUser}
            />
        );

        if (this.state.route === "home") {
            content = (
                <div>
                    <Logo />
                    <Rank
                        name={this.state.user.name}
                        entries={this.state.user.entries}
                    />
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
        } else if (this.state.route === "register") {
            content = (
                <Register
                    handleRouteChange={this.handleRouteChange}
                    loadUser={this.handleLoadUser}
                />
            );
        }

        return (
            <div className="App">
                <Navigation
                    handleRouteChange={this.handleRouteChange}
                    isSignedIn={this.state.isSignedIn}
                />
                {content}
            </div>
        );
    }
}

export default App;
