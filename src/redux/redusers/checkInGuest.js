
const initial =  {
    guest_info: [],
    guest_room: []
}

const checkInGuest = (state = initial, action) => {
    switch(action.type) {
        case 'CHECK_IN_GUEST': 
            return  {
                ...state,
                guest_info: [...state.guest_info, action.payload.guest],
                guest_room: [...state.guest_room, action.payload.room]
            }
        case 'CHECK_OUT_GUEST': 
            return {
                ...state,
                guest_info: [...state.guest_info, action.payload.guest],
                guest_room: [...state.guest_room, action.payload.room]
            }
        default:
            return state
    }
}

export const checkInGuestReduser = (data) => ({type: 'CHECK_IN_GUEST', payload: data})
export const checkOutGuestReduser = () => ({type: 'CHECK_OUT_GUEST'})

export default checkInGuest;
