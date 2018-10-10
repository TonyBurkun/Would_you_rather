import React from 'react'
import { withRouter } from 'react-router-dom'


function Question (props) {

    function handleViewPoll(event, qid){

        props.history.push(`/questions/${qid}`)
    }

    const { question, users } = props;

    let user = users[question.author],
        userName = user.name,
        qid = question.id;

    return (
        <div className="question-item">
            <div className="question-item__title">{`${userName} asks: `}</div>
            <div className="question-item__body">
                <div className="image">
                    <img src={user.avatarURL} alt={userName}/>
                </div>
                <div className="description">
                    <div className="title">Would you rather</div>
                    <div className="question-part">{question.optionOne.text}</div>
                    <button className="regurlar-btn" onClick={event => handleViewPoll(event, qid)}>View Poll</button>
                </div>
            </div>
        </div>
    )
}



export default withRouter(Question)