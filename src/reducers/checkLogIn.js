

export default function checkLogIn(state = {status: false, name: "", cart: []}, action) {
    switch (action.type) {
        case 'CHECKLOGIN':
            let ttt = {status: action.status, name: action.name, cart: action.cart, id: action.id, address: action.address, phone: action.phone, email: action.email, username: action.username, pw: action.pw};
            console.log("store user:" , ttt);
            return {status: action.status, name: action.name, cart: action.cart, id: action.id, address: action.address, phone: action.phone, email: action.email, username: action.username, pw: action.pw};
            case 'CHECKLOGINERROR':
                console.log("checkLogIn_error" ,action.name)
                return {...state};
            case 'LOGOUT':
                return {status: false, name: "", cart: []};
        default:
            return state;
    }
}