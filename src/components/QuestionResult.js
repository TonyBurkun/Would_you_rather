import React, {Component} from 'react'
import {connect} from 'react-redux'

class QuestionResult extends Component {

    componentDidMount() {
        const {qid, currentUser, question, users} = this.props;

        const userAnswersList = currentUser.answers;
        const userOption = userAnswersList[qid];
        const usersCount = Object.keys(users).length;
        const answerOnQuestionOne = question.optionOne.votes.length;
        const answerOnQuestionTwo = question.optionTwo.votes.length;

        document.getElementById(userOption).classList.add('active');

        let optionOnePercent = this.countProcent(answerOnQuestionOne, usersCount);
        let optionTwoPercent = this.countProcent(answerOnQuestionTwo, usersCount);

        if (optionOnePercent) {
            document.getElementById('optionOne')
                .querySelector('.filled-bar').style.cssText = `width: ${optionOnePercent}%`;
        } else {
            document.getElementById('optionOne')
                .querySelector('.filled-bar').style.cssText = `width: ${optionOnePercent}%; padding: 0`;
            optionOnePercent = '';
        }

        if (optionTwoPercent) {
            document.getElementById('optionTwo')
                .querySelector('.filled-bar').style.cssText = `width: ${optionTwoPercent}%`;
        } else {
            document.getElementById('optionTwo')
                .querySelector('.filled-bar').style.cssText = `width: ${optionTwoPercent}%; padding: 0`;
            optionTwoPercent = '';
        }
    }


    countProcent(countAnswers, countUsers) {
        return countAnswers / countUsers * 100;
    }


    render() {
        const {question, currentUser, users} = this.props;
        const userName = currentUser.name;
        const userAvatar = currentUser.avatarURL;

        const usersCount = Object.keys(users).length;
        const answerOnQuestionOne = question.optionOne.votes.length;
        const answerOnQuestionTwo = question.optionTwo.votes.length;

        const percentOne = answerOnQuestionOne
            ? Math.round(this.countProcent(answerOnQuestionOne, usersCount)) + '%'
            : '';
        const percentTwo = answerOnQuestionTwo
            ? Math.round(this.countProcent(answerOnQuestionTwo, usersCount)) + '%'
            : '';


        return (
            <div className="question-item one-block question-result-block">
                <div className="question-item__title">{`Asked by ${userName}`}</div>
                <div className="question-item__body">
                    <div className="image">
                        <img src={userAvatar} alt={userName}/>
                    </div>
                    <div className="description">
                        <div className="title">Results:</div>
                        <div id="optionOne" className="vote-block">
                            <div className="vote-question">{`Would you rather be a ${question.optionOne.text} ?`}</div>
                            <div className="progress-bar">
                                <div className="filled-bar">{percentOne}</div>
                            </div>
                            <div className="vote-statistic"> {`${answerOnQuestionOne} out of ${usersCount} votes`}</div>
                        </div>
                        <div id="optionTwo" className="vote-block">
                            <div className="vote-question">{`Would you rather be a ${question.optionTwo.text} ?`}</div>
                            <div className="progress-bar">
                                <div className="filled-bar">{percentTwo}</div>
                            </div>
                            <div className="vote-statistic"> {`${answerOnQuestionTwo} out of ${usersCount} votes`}</div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(store, props) {
    const qid = props.qid;

    return {
        qid,
        question: store.questions[qid],
        authedUser: store.authedUser,
        users: store.users,
        currentUser: store.users[store.authedUser],
    }

}

export default connect(mapStateToProps)(QuestionResult)