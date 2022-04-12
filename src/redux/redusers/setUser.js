
const initial =  {
    email: null,
    password: null,
    token: null
}

const setUser = (state = initial, action) => {
    switch(action.type) {
        case 'SET_USER': 
            return  {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                token: action.payload.token,
            }
        default :
            return state
    }
}

export default setUser