import axios from 'axios';
// import { cpus } from 'os';


export function fetchProducts() {
	return (dispatch) => {
		return axios.get('https://5ca5c51d3a08260014278a74.mockapi.io/flowershop')
		.then((response)=> {
			dispatch(fetchSuccess(response.data));
		})
		.catch((response) => {
			dispatch(fetchError(response));
		});
	}
}

export function fetchSuccess(re) {
	return { type: 'OKK', data: re };
}
export function fetchError(er) {
	return { type: 'ERROR', data: er};
}

export function filterColor(color) {
	return { type: 'FILTERCOLOR', color: color};
}

export function filterSpecies(species) {
	return { type: 'FILTERSPECIES', species: species};
}

export function filterPrice(min,max) {
	return { type: 'FILTERPRICE', min: min, max: max};
}

export function sort(data) {
	return { type: 'SORT', data: data};
}

export function productDetail(name, img, price) {
	return { type: 'PRODUCTDETAIL', name: name, img: img, price: price};
}

export function checkLogIn(id,status,name,cart, address, email, phone, username, pw) {
	return { type: 'CHECKLOGIN', id: id, name: name, status:status, cart:cart, address: address, email: email, phone: phone, username: username, pw: pw };
}
export function checkLogIn_edit(id ,data) {
	return (dispatch) => {
		let carts = {}
        for(let i=0; i<=data.length ; i++){
            carts[i] = data[i];
        }
		let dataCart = JSON.stringify(carts)
		return axios.put('https://5ca5c51d3a08260014278a74.mockapi.io/usersShop/' + id , {cart: dataCart})
		.then((response)=> {
			let cartUser = Object.values(JSON.parse(response.data.cart));
			dispatch(checkLogIn(response.data.id, response.data.status, response.data.name, cartUser, response.data.address, response.data.email, response.data.phone, response.data.username, response.data.pw));

		})
		.catch((response) => {
			dispatch(fetchError(response));
		});
	}
}

export function checkLogIn_error(error) {
	return { type: 'CHECKLOGINERROR', name: error};
}
export function logOut() {
	return { type: 'LOGOUT'};
}


export function switchLogin(name) {
	return { type: 'SWITCHLOGIN', name: name};
}

export function search(data) {
	return { type: 'SEARCH', name: data};
}