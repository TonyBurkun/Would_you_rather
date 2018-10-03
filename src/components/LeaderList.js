import React, { Component } from 'react'
import { connect } from 'react-redux'
import OneLeader from './OneLeader'

class LeaderList extends Component {
    render () {

        const { users } = this.props;
        const userIdList = Object.keys(users);

        let userDataForRating = [];

        for (let i = 0; i < userIdList.length; i++ ) {
            let currentUser = users[userIdList[i]];
            let answers = Object.keys(currentUser.answers).length;
            let questions = currentUser.questions.length;
            userDataForRating[i] = {
                'name': currentUser.name,
                'avatarURL': currentUser.avatarURL,
                'answeredQuestions': answers,
                'createdQuestions': questions,
                'totalScore': answers + questions
            }
        }

        userDataForRating.sort((a,b) =>  a.totalScore - b.totalScore).reverse();

        return (
            <div>
                {userIdList.map((item, index) => {
                    return (
                        <OneLeader key={index} user={userDataForRating[index]} position={++index}/>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
       users: store.users,

    }
}

export default connect(mapStateToProps)(LeaderList)