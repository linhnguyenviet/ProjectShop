import React, { Component } from "react";
import './ProductRow.css';
import { checkLogIn_edit } from '../actions';
import { connect } from 'react-redux';

class ProductRow extends Component {
    handleCart(idUser,cart,index){
        this.props.stateReducers.checkLogIn.cart[index] = cart;
        console.log("+++++++", this.props.stateReducers.checkLogIn.cart);
        this.props.checkLogIn_edit(idUser, this.props.stateReducers.checkLogIn.cart);
    }
    handleDelete(idUser,index){
        let tttt = this.props.stateReducers.checkLogIn.cart;
        tttt.splice(index,1);
        this.props.checkLogIn_edit(idUser, tttt);
    }
    render() {
        const { price, name, img, number, index, idUser} = this.props;
        return (
            <tr className="ProductRow">
                <td>
                    <div><img src={img} alt="dd"></img></div>
                </td>
                <td>{name}</td>
                <td>{price} đ</td>
                <td>
                    <div className="cartNumber">
                        <button type="button" disabled={parseInt(number) < 2} onClick={() => this.handleCart(idUser, { name: name, img: img, price: price, number: parseInt(number) - 1 } , index)}> <i className="fas fa-minus-square"></i> </button>
                        <p>{number}</p>
                        <button type="button" onClick={() => this.handleCart(idUser, { name: name, img: img, price: price, number: parseInt(number) + 1 } , index)}> <i className="fas fa-plus-square"></i> </button>
                    </div>
                </td>
                <td>{parseInt(price) * parseInt(number)} đ</td>
                <td>
                    <button type="button" onClick={() => this.handleDelete(idUser, index)}> <i className="fas fa-trash-alt"></i> </button>
                </td>
            </tr>
        )
    }
}


const mapStateToProps = state => {
    return {
        stateReducers: state
    };
};
const mapDispatchToProps = dispatch => {
    return {
        checkLogIn_edit: (id, cart) => dispatch(checkLogIn_edit(id, cart))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (ProductRow);
