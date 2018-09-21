import React, { Component } from 'react'
import { connect } from 'react-redux'

class User extends Component {

    handleUserSelect (event, id) {
        event.preventDefault();

        console.log(id);
    }

    render () {

        const { user } = this.props;
        const {id} = this.props;

        return (
            <option id={id} onClick={event => this.handleUserSelect(event, id)}>{user.name}</option>
        )
    }
}

function mapStateToProps({users}, {id}) {
    return {
        user: users[id],
    }
}

export default connect(mapStateToProps)(User)
