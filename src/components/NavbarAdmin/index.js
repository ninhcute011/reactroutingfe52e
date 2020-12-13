import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { actLogout } from "containers/AdminTemplate/AuthPage/modules/action";
import { connect } from "react-redux";

class NavbarHome extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        {/* Brand */}
        <NavLink exact className="navbar-brand" to="/">
          Navbar
        </NavLink>
        {/* Toggler/collapsibe Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/dashboard"
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/add-user"
              >
                Add user
              </NavLink>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-info"
                onClick={() => {
                  this.props.fetchLogout(this.props.history);
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLogout: (history) => {
      dispatch(actLogout(history));
    },
  };
};

const ConnectedComponent = connect(null, mapDispatchToProps)(NavbarHome);

export default withRouter(ConnectedComponent);
