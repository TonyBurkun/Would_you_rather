import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import NewQuestion from './NewQuestion'
import LeaderList from './LeaderList'
import Nav from './Nav'
import NoMatch from './NoMatch'

import { receiveUsers } from '../actions/users'
import {_getUsers, _getQuestions } from '../utils/_DATA'
import { handleInitialData } from '../actions/shared'

const PrivateRoute = ({component: Component, isLoggedIn, ...rest}) => (

    <Route
        {...rest}

        render={(props) => (
            isLoggedIn === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login'}}/>
        )}/>


);

class App extends Component {

    componentDidMount() {
        console.log(this);

        const { dispatch } = this.props;
        dispatch(handleInitialData());



        // _getUsers()
        //     .then((users) => {
        //        dispatch(receiveUsers(users));
        //     })

    }


    render() {

        return (
            <Router>
                <Fragment>
                    <Nav/>
                    <div className="container">
                        <Switch>
                            <PrivateRoute exact path="/" component={Home} isLoggedIn={this.props.authedUser}/>
                            <PrivateRoute path="/add" component={NewQuestion} isLoggedIn={this.props.authedUser}/>
                            <PrivateRoute path="/leaderboard" component={LeaderList} isLoggedIn={this.props.authedUser}/>
                            <Route path="/login" component={Login}/>
                            <Route path="*" component={NoMatch}/>
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps(store) {
    console.log(store);

    return {
        authedUser: store.authedUser !== null,
    }
}

export default connect(mapStateToProps)(App);
