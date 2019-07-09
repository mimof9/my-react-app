export default function isFetching(state = false, action) {
    switch(action.type) {
        case 'isFetching':
            return action.payload
        default:
            return state
    }
}
