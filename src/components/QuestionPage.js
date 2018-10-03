import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {_saveQuestionAnswer} from '../utils/_DATA'
import { saveQuestionAnswer } from '../actions/questions'
import { saveUserAnswer } from '../actions/users'
import { withRouter } from 'react-router-dom'
import QuestionResult from './QuestionResult'


class QuestionPage extends Component {
    state = {
        radioBtnValue: "optionOne",
        isAnswer: false
    };

    componentWillMount() {
        console.log(this.props);
        const {qid, authedUser, users} = this.props;
        const currentUser = users[authedUser];

        console.log(Boolean(currentUser.answers[qid]));

        if (currentUser.answers[qid]) {
            this.setState(()=> ({
                isAnswer: true
            }))
        } else {
            this.setState(()=> ({
                isAnswer: false
            }))
        }

    }

    handleRadio = (event) => {

        const radioBtnValue = event.target.value;

        this.setState(() => ({
            radioBtnValue,
        }));

    };

    handleSubmit(event) {
        event.preventDefault();

        const {authedUser, qid} = this.props;
        let answer = this.state.radioBtnValue;


        this.props.dispatch(saveQuestionAnswer({authedUser, qid, answer}));
        this.props.dispatch(saveUserAnswer({authedUser, qid, answer}));


        _saveQuestionAnswer({authedUser, qid, answer})
            .then((res) => {
                this.setState(()=> ({
                    isAnswer: true
                }))
            })

    }

    render() {

        const {question, users} = this.props;
        const questionUser = users[question.author],
              userName = questionUser.name,
              userImg = questionUser.avatarURL;

        return (

           <Fragment>
               {this.state.isAnswer === true
                   ? <QuestionResult qid={this.props.qid}/>
                   : <div className="question-item one-block">
                       <div className="question-item__title">{`${userName} asks: `}</div>
                       <div className="question-item__body">
                           <div className="image">
                               <img src={userImg} alt={userName}/>
                           </div>
                           <div className="description">
                               <div className="title">Would you rather...</div>
                               <div className="radio-btn-block">
                                   <input
                                       name="option"
                                       type="radio"
                                       id="first-question"
                                       value="optionOne"
                                       defaultChecked
                                       onChange={this.handleRadio}/>
                                   <label htmlFor="first-question">{question.optionOne.text}</label>
                                   <div className="separator">or</div>
                                   <input
                                       name="option"
                                       type="radio"
                                       id="second-question"
                                       value="optionTwo"
                                       onChange={this.handleRadio}/>
                                   <label htmlFor="second-question">{question.optionTwo.text}</label>
                               </div>

                               <button className="submit-btn" onClick={event => this.handleSubmit(event)}>Submit
                               </button>
                           </div>
                       </div>
                   </div>
               }
           </Fragment>

        )
    }
}

function mapStateToProps(store, props) {
    const qid = props.match.params.id;

    console.log(store);
    console.log(qid);

    console.log(store.questions[qid]);
    return {
        authedUser: store.authedUser,
        qid,
        question: store.questions[qid],
        currentUser: store.users[store.authedUser],
        users: store.users,

    }

}

export default withRouter(connect(mapStateToProps)(QuestionPage))