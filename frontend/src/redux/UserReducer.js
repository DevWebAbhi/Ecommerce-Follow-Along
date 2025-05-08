const initialState = {
    name: null,
    email: null,
    image: null,
}

const UserReducer = (state = initialState, {type,payload}) => {
        switch(type) {
            case "SET_NAME":
                return {
                    ...state,
                    name: payload
                }

            case "SET_EMAIL":
                return {
                    ...state,
                    email: payload
                }
                
            case "SET_IMAGE":
                return {
                    ...state,
                    image: payload
                }    

             default:
                return state   
        }

}

export default UserReducer;