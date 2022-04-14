
const initial =  {
    email: null,
    token: null,
    uid: null,
    users: []
}

const setUserReduser = (state = initial, action) => {
    console.log('action: ', action);
    switch(action.type) {
        case 'SET_USER': 
            return  {
                ...state,
                email: action.payload.email,
                token: action.payload.token,
                uid: action.payload.uid,
                users: [...state.users, action.payload.email]
            }
        case 'REMOVE_USER': 
            return {
                ...state,
                email: null,
                token: null,
                uid: null
            }
        default :
            return state
    }
}

export const setUserAction = (dataUser) => ({type: 'SET_USER', payload: dataUser})
export const removeUserAction = () => ({type: 'REMOVE_USER'})

export default setUserReduser;
