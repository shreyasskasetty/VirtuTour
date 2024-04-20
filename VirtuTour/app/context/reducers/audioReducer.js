const initialState = {
    playMode : false
}

const audioReducer = (state = initialState, action)=>{
    if(action.type === "SET_PLAY_MODE")
    {
        return {
            ...state,
            playMode : action.playMode
        }
    }
    return state
}

export default audioReducer;