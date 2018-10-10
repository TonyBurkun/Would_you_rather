import { RECEIVE_USERS } from '../actions/users'
import { SAVE_USER_ANSWER } from '../actions/users'
import { SAVE_USER_QUESTION } from '../actions/users'

export default function users (state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            };

        case SAVE_USER_ANSWER:
            const user = {...state[action.authedUser]};
            const answer = action.answer;

            return {
                ...state,
                [action.authedUser] : {
                    ...user,
                    answers: {
                        ...user.answers,
                        [action.qid] : answer
                    }
                }
            };

        case SAVE_USER_QUESTION:
            const currentUser = {...state[action.author]};

            return {
                ...state,
                [action.author] : {
                    ...currentUser,
                    questions: currentUser.questions.concat(action.id)
                }

            };


        default:
            return state
    }
}