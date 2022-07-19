import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../_actions';


class Header extends Component {

    render() {

        const { authentication } = this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    <img width="30" height="30" className="d-inline-block align-top mr-3" alt="" />
                    Exchange X
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#exchangex-navbar" aria-controls="exchangex-navbar"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="exchangex-navbar">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item dropdown mr-4">
                            <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Language
                            </div>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/lang/en">EN</Link>
                                <Link className="dropdown-item" to="/lang/ru">RU</Link>
                            </div>
                        </li>
                        <li className="nav-item mr-2">
                            <Link className="nav-link" to="howitworks">
                                How it works
                            </Link>
                        </li>
                        <li className="nav-item mr-2">
                            <Link className="nav-link" to="/faq">
                                FAQ
                            </Link>
                        </li>
                        <li className="nav-item mr-2">
                            <Link className="nav-link" to="/transactions">
                                Transactions
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    {authentication.user === undefined &&
                        <span>
                            <Link to="/login" className="mr-3">Log in</Link>
                            <Link to="/signup" className="mr-3">Sign up</Link>
                        </span>
                    }
                    {authentication.user !== undefined &&
                        <span>
                            <Link to="/profile" className="mr-3">My Account</Link>
                            <Link to="/logout" onClick={(e) => {e.preventDefault(); this.props.logout();}}>Log out</Link>
                        </span>
                    }
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        authentication
    };
}

function mapDispatchToProps(dispatch) {
    return({
        logout: () => {
            dispatch(authActions.logout())
        }
    })
}

const connectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);
export { connectedHeader as Header };