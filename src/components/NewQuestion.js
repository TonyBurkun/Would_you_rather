import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveQuestion } from '../actions/questions'
import { _saveQuestion } from '../utils/_DATA'

class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: ''

    };

    handleOptionOneChange = (event) => {
        const value = event.target.value;

        this.setState(() => ({
            optionOne: value
        }))

    };

    handleOptionTwoChange = (event) => {
        const value = event.target.value;

        this.setState(() => ({
            optionTwo: value
        }))
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this);

        const { optionOne, optionTwo } = this.state;
        const { authedUser } = this.props;

        let question = {
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser
        };


        if (optionOne && optionTwo) {

            _saveQuestion(question)
                .then(question =>  this.props.dispatch(saveQuestion(question)));
        }
    };


    render () {

        const { optionOne, optionTwo } = this.state;

        return (
            <div className="create-new-question">
               <div className="title">
                   <h2>
                       Create New Question
                   </h2>
               </div>
                <form className="question-block" onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="question-tip">Complete the question:</div>
                    <div className="first-part-question">Would you rather ...</div>
                    <input type="text" value={optionOne} className="input-field" placeholder="Enter Option One Text Here" onChange={this.handleOptionOneChange}/>
                    <div className="separator">OR</div>
                    <input type="text" value={optionTwo} className="input-field" placeholder="Enter Option Two Text Here" onChange={this.handleOptionTwoChange}/>
                    <button className="submit-btn">Submit</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(store){
    return {
        authedUser: store.authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)