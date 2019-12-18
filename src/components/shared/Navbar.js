import React from 'react';
// import {Redirect} from 'react-router-dom';

class Navbar extends React.Component {
    logout = () => {
        // return (
        //     <Redirect to="/" />
        // );
        this.props.history.push('/');
    };

    render() {
        return (
            <nav className="navbar fixed-top navbar-dark bg-dark">
                <div className="navbar-brand" >Hello, {this.props.userName}</div>
                {/* <button className="btn btn-outline-light" onClick={this.logout} >Log out</button> */}
            </nav>
            );
    };
}

export default Navbar;