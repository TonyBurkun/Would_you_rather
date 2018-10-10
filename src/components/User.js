import React from 'react'
import { connect } from 'react-redux'


function User(props){
    const { user } = props;
    const {id} = props;

    return (
        <option id={id}>{user.name}</option>
    )
}



function mapStateToProps({users}, {id}) {
    return {
        user: users[id],
    }
}

export default connect(mapStateToProps)(User)
