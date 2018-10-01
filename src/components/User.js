import React, { Component } from 'react'
import { connect } from 'react-redux'

class User extends Component {

    render () {

        const { user } = this.props;
        const {id} = this.props;

        return (
            <option id={id}>{user.name}</option>
        )
    }
}

function mapStateToProps({users}, {id}) {
    return {
        user: users[id],
    }
}

export default connect(mapStateToProps)(User)
