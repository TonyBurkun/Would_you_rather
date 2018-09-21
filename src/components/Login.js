import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import User from '../components/User'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    state = {
      loggedUserId: false,
    };



    handleChanges(event){
        event.preventDefault();
        const selectElem = event.target;
        const selectedOptionId = selectElem.options[selectElem.selectedIndex].getAttribute('id');

        console.log(selectedOptionId);

        this.setState(() => ({
            loggedUserId: selectedOptionId ? selectedOptionId : false
        }));
    }

    handleSignIn(event) {
        event.preventDefault();

        const { loggedUserId } = this.state;

        this.props.dispatch(setAuthedUser(loggedUserId));



    }


    render () {

        console.log('Login: ', this.props);

        let { usersId, authedUser } = this.props;

        if (authedUser) {
            return <Redirect to='/' />
        }


        return (
            <div>

                <div className="login-form">
                    <div className="login-form__greeting">
                        <h2>Welcome to the Would You Rather App!</h2>
                        <span>Please sign in to continue</span>
                    </div>
                   <div className="login-form__body">
                       <span className="login-form__title">Sign in</span>
                       <select onChange={event => this.handleChanges(event)}>
                           <option>Select User</option>
                           {usersId.map((id) => (
                               <User key={id} id={id}/>
                           ))}
                       </select>
                       <button onClick={event => this.handleSignIn(event)}>Sign In</button>
                   </div>
                </div>

            </div>
        )
    }
}


function mapStateToProps ({users, authedUser}) {



    return {
        users,
        usersId: Object.keys(users),
        authedUser,
    }
}

export default connect(mapStateToProps)(Login)
