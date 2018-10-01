import React, { Component } from 'react'
import { connect } from 'react-redux'
import { customTabs } from '../utils/customTabs'
import Question from '../components/Question'

class Home extends Component {

    componentDidMount() {
        customTabs();
    }


    render () {

        const { questions, users, authedUser} = this.props;
        let currentUser = users[authedUser];
        let keys = Object.keys(questions);
        let unansweredQuestions = [],
            answeredQuestions = [];

        keys.forEach(item => {
            currentUser.answers[item]
                ? answeredQuestions.push(questions[item])
                : unansweredQuestions.push(questions[item])
        });

        answeredQuestions = answeredQuestions.sort((a,b) => a.timestamp - b.timestamp).reverse();
        unansweredQuestions = unansweredQuestions.sort((a,b) => a.timestamp - b.timestamp).reverse();


        return (
            <div className="questions-tabs" id="tabs">
                <div className="tab">Unanswered questions</div>
                <div className="tab">Answered questions</div>
                <div className="tab-content">
                    {unansweredQuestions.length
                        ? unansweredQuestions.map((item, index) => (
                            <Question key={index} question={item} users={users}/>
                        ))
                        : <span className="no-content-msg">There are not questions</span>
                    }
                </div>
                <div className="tab-content">
                    {answeredQuestions.length
                        ? answeredQuestions.map((item, index) => (
                            <Question key={index} question={item} users={users}/>
                        ))
                        : <span className="no-content-msg">You have not answered any questions yet</span>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(store) {

    return {
        questions: store.questions,
        users: store.users,
        authedUser: store.authedUser,
    }
}

export default connect(mapStateToProps)(Home)