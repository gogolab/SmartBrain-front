import React, { Component } from "react";
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceDetector from "./components/FaceDetector/FaceDetector";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";

const initialState = {
    input: "",
    imageUrl: "",
    faceboxes: null,
    route: "register",
    isSignedIn: false,
    isProfileOpen: false,
    user: {
        id: "",
        name: "",
        email: "",
        entries: "",
        joined: ""
    }
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    componentDidMount() {
        const token = window.sessionStorage.getItem("token");

        if (token) {
            fetch("http://localhost:3000/signin", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data && data.id) {
                        fetch(`http://localhost:3000/profile/${data.id}`, {
                            method: "get",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: token
                            }
                        })
                            .then(resp => resp.json())
                            .then(user => {
                                if (user && user.email) {
                                    console.log("user:", user);
                                    this.loadUser(user);
                                    this.handleRouteChange("home")();
                                }
                            });
                    }
                })
                .catch(console.log);
        }
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

        fetch("http://localhost:3000/image_url", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
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
                        })
                        .catch(console.log);
                }
                this.handleFacesLocationData(response);
            })
            .catch(err => console.log(err));
    };

    handleRouteChange = route => () => {
        if (route === "signout") {
            this.setState(initialState);
        } else if (route === "home") {
            this.setState({ isSignedIn: true });
        }

        this.setState({ route: route });
    };

    loadUser = userData => {
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

    toggleModal = () => {
        this.setState(prevState => {
            return {
                isProfileOpen: !prevState.isProfileOpen
            };
        });
    };

    render() {
        let content = (
            <Signin
                handleRouteChange={this.handleRouteChange}
                loadUser={this.loadUser}
            />
        );

        if (this.state.route === "home") {
            content = (
                <div>
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
                    loadUser={this.loadUser}
                />
            );
        }

        return (
            <div className="App">
                <header>
                    <Logo />
                    <Navigation
                        handleRouteChange={this.handleRouteChange}
                        isSignedIn={this.state.isSignedIn}
                        toggleModal={this.toggleModal}
                    />
                    {this.state.isProfileOpen && (
                        <Modal>
                            <Profile
                                isProfileOpen={this.state.isProfileOpen}
                                toggleModal={this.toggleModal}
                                user={this.state.user}
                                loadUser={this.loadUser}
                            />
                        </Modal>
                    )}
                </header>
                {content}
            </div>
        );
    }
}

export default App;
