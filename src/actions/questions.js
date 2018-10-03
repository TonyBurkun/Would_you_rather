export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ACTION_ANSWER = 'SAVE QUESTION ANSWER';
export const SAVE_QUESTION = 'SAVE_QUESTION';



export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }

}

export function saveQuestionAnswer({authedUser, qid, answer}) {
    return {
        type: SAVE_ACTION_ANSWER,
        authedUser,
        qid,
        answer

    }
}

export function saveQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}