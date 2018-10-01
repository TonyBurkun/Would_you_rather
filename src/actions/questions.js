export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ACTION_ANSWER = 'SAVE QUESTION ANSWER';



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