import React from "react";

import "./Profile.css";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet
        };
    }

    onFormChange = event => {
        switch (event.target.name) {
            case "user-name":
                this.setState({ name: event.target.value });
                break;
            case "user-age":
                this.setState({ age: event.target.value });
                break;
            case "user-pet":
                this.setState({ pet: event.target.value });
                break;
            default:
                return;
        }
    };

    onProfileUpdate = data => () => {
        console.log("onProfileUpdate / data:", data);
        fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ formInput: data })
        })
            .then(response => {
                this.props.toggleModal();
                this.props.loadUser({ ...this.props.user, ...data });
            })
            .catch(err => console.log(err));
    };

    render() {
        const { name, age, pet } = this.state;

        return (
            <div
                className="profile-modal"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "2em"
                }}
            >
                <div id="profile">
                    <header
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <img
                            src="http://tachyons.io/img/logo.jpg"
                            className="br-100 ba h3 w3 dib"
                            alt="avatar"
                        />
                        <button
                            onClick={this.props.toggleModal}
                            style={{ float: "right" }}
                        >
                            &times;
                        </button>
                    </header>
                    <h1>{this.state.name}</h1>
                    <h4>Images submitted: 5</h4>
                    <p>member since: January</p>
                    <hr />
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="user-name"
                            placeholder="John"
                            onChange={this.onFormChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="age">Age</label>
                        <input
                            type="text"
                            id="age"
                            name="user-age"
                            placeholder="123"
                            onChange={this.onFormChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="pet">Pet</label>
                        <input
                            type="text"
                            id="pet"
                            name="user-pet"
                            placeholder="dragon"
                            onChange={this.onFormChange}
                        />
                    </div>
                    <br />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly"
                        }}
                    >
                        <button
                            onClick={this.onProfileUpdate({ name, age, pet })}
                        >
                            Save
                        </button>
                        <button onClick={this.props.toggleModal}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
