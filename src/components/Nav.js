import React, { Component } from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {

    handleLogOut(event) {
        event.preventDefault();
        this.props.dispatch(setAuthedUser(null));
    }

    render() {

        console.log('NAV: ',this.props);

        const { users, authedUser } = this.props;
        let userName = '';


        if (authedUser) {
            userName = users[authedUser].name;
        }

        return (
            <header>
                <div className="container">
                    <nav className="top-nav">
                        <ul>
                            <li>
                                <NavLink to="/" exact activeClassName="active">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/add" activeClassName="active">
                                    New Question
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/leaderboard" activeClassName="active">
                                    Leader Board
                                </NavLink>
                            </li>
                        </ul>

                        {this.props.authedUser && (
                            <ul>
                                <li>
                                    {userName}
                                </li>
                                <li>
                                    <Link to="/login" onClick={event => this.handleLogOut(event)}>Log out</Link>
                                </li>
                            </ul>
                        )}
                    </nav>
                </div>
            </header>
        )
    }

}

function mapStateToProps ({users, authedUser}) {



    return {
        users,
        authedUser,
    }
}

export default withRouter(connect(mapStateToProps)(Nav))