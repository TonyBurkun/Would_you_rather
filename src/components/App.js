import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'

import Home from './Home'
import Login from './Login'
import NewQuestion from './NewQuestion'
import LeaderList from './LeaderList'
import QuestionPage from './QuestionPage'
import Nav from './Nav'
import NoMatch from './NoMatch'

import { handleInitialData } from '../actions/shared'

const PrivateRoute = ({component: Component, isLoggedIn, ...rest}) => (

    <Route
        {...rest}
        prevPath={'lol'}

        render={(props) => (
            isLoggedIn === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {prevPath: window.location.pathname}}}/>
        )}/>


);

class App extends Component {

    componentDidMount() {

        const { dispatch } = this.props;
        dispatch(handleInitialData());

    }


    render() {


        return (
            <Router>
                <Fragment>
                    <LoadingBar className="loading-bar" />
                    <Nav/>
                    <div className="container">
                        <Switch>
                            <PrivateRoute exact path="/" component={Home} isLoggedIn={this.props.authedUser}/>
                            <PrivateRoute path="/add" component={NewQuestion} isLoggedIn={this.props.authedUser}/>
                            <PrivateRoute path="/leaderboard" component={LeaderList} isLoggedIn={this.props.authedUser}/>
                            <PrivateRoute path="/questions/:id" component={QuestionPage} isLoggedIn={this.props.authedUser}/>
                            <Route path="/login" component={Login}/>
                            <PrivateRoute path="*" component={NoMatch} isLoggedIn={this.props.authedUser}/>
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps(store) {

    return {
        authedUser: store.authedUser !== null,
    }
}

export default connect(mapStateToProps)(App);
