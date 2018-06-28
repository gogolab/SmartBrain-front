import React from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

class ProfileIcon extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => {
            return {
                dropdownOpen: !prevState.dropdownOpen
            };
        });
    }

    render() {
        return (
            <div className="pt2 tc">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={this.state.dropdownOpen}
                    >
                        <div className="tc">
                            <img
                                src="http://tachyons.io/img/logo.jpg"
                                className="br-100 ba h3 w3 dib"
                                alt="avatar"
                            />
                        </div>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>View Profile</DropdownItem>
                        <DropdownItem
                            onClick={this.props.onRouteChange("signout")}
                        >
                            Sign Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

export default ProfileIcon;
