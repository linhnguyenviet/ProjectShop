import React, { Component } from "react";
import './Cart.css';
import ProductRow from "./ProductRow";
import { connect } from 'react-redux';
import EmptyCart from "./emptyCart";
import { Link } from 'react-router-dom';
import { checkLogIn_edit } from '../actions';


class Cart extends Component {

    render() {
        const user = this.props.stateReducers.checkLogIn;
        const idUser = user.id;
        // const addressUser = user.address;
        // const phoneUser = user.phone;
        // const emailUser = user.email;
        // const userUser = user.user;
        // const pwUser = user.pw;
        // const statusUser = user.status;
        // const nameUser = user.name;

        const product = this.props.stateReducers.checkLogIn.cart;
        console.log("cart : ", product);
        if(product.length === 0){
            return (
                <EmptyCart/>
            )
        }
        const listProduct = product.map((item, index) => {
            return <ProductRow key={index} index={index} {...item} idUser={idUser}/>;
        });
        var sumPrice = (arr) =>{
            return arr.reduce((total, item) => {
                return total + (parseInt(item.price) * parseInt(item.number))
            }, 0)
        }
        const totalPrice = sumPrice(this.props.stateReducers.checkLogIn.cart);

        return (
            <div className="Cart">
                <h1>GIỎ HÀNG</h1>'
            <table >
                    <tbody>
                        <tr>
                            <th>HÌNH ẢNH</th>
                            <th>TÊN SẢN PHẨM</th>
                            <th>ĐƠN GIÁ</th>
                            <th>SỐ LƯỢNG</th>
                            <th>THÀNH TIỀN</th>
                            <th>XÓA</th>
                        </tr>
                        {listProduct}
                    </tbody>
                </table>
                <div className="buttonGroup">
                    <button className="cartBtn" onClick={ () => this.props.checkLogIn_edit(idUser, {})}>HỦY ĐƠN HÀNG</button>
                    <Link  to="/"> <button className="cartBtn light" >TIẾP TỤC MUA</button> </Link>
                </div>
                <div className="total">
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>TỔNG TIỀN (CHƯA THUẾ)</td>
                                    <td>{totalPrice} đ</td>
                                </tr>
                                <tr>
                                    <td>THUẾ VAT (10%)</td>
                                    <td>{totalPrice * 0.1} đ</td>
                                </tr>
                                <tr>
                                    <td>TỔNG PHẢI THANH TOÁN</td>
                                    <td>{Math.floor(totalPrice * 1.1)} đ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="buttonGroup2">
                <Link  to="/checkout"> <button className="cartBtn">THANH TOÁN</button> </Link>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        checkLogIn_edit: (id, cart) => dispatch(checkLogIn_edit(id, cart))
    }
}
const mapStateToProps = state => {
    return {
        stateReducers: state
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
