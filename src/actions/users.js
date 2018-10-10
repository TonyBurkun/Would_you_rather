export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_USER_ANSWER = 'SAVE USER ANSWER';
export const SAVE_USER_QUESTION = 'SAVE USER QUESTION';

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users
    }

}

export function saveUserAnswer({authedUser, qid, answer}) {
    return {
        type: SAVE_USER_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function saveUserQuestion({author, id}) {
    return {
        type: SAVE_USER_QUESTION,
        author,
        id,
    }
}
