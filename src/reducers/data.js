const stateDefault = [
];
export default function data(state = stateDefault, action) {
    switch (action.type) {
        case 'OKK':
            console.log("action.re", action.data);
            return action.data;
        case 'ERROR':
            console.log("action error", action.data);
            return [...state];
        default:
            return [...state];
    }
}