import React from 'react'
import 'font-awesome/css/font-awesome.min.css'

function OneLeader(props) {

    const { user, position } = props;

    function checkPositon(position){

        switch (position){
            case 1:
                return (
                   showLeaderPositions('first')
                );
            case 2:
                return (
                    showLeaderPositions('second')
                );
            case 3:
                return (
                    showLeaderPositions('third')
                );

            default:
                return false;
        }

    }

    function showLeaderPositions (positionClass) {
        return (
            <div className={`${positionClass} reward-item fa fa-trophy`}/>
        )
    }




    return (
        <div className="leader-list-item">
            {checkPositon(position)}
            <div className="image">
                <img src={user.avatarURL} alt={user.name}/>
            </div>
            <div className="description">
                <div className="user-name">{user.name}</div>
                <div className="statistic-item answered-questions">
                    <span className="title">Answered questions</span>
                    <span className="value">{user.answeredQuestions}</span>
                </div>
                <div className="statistic-item created-questions">
                    <span className="title">Created questions</span>
                    <span className="value">{user.createdQuestions}</span>
                </div>
            </div>
            <div className="score-block">
                <div className="score-title">Score</div>
                <div className="score-value">{user.totalScore}</div>
            </div>
        </div>
    )
}

export default OneLeader;