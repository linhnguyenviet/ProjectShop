import React, { Component } from "react";
import './Product.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { productDetail, checkLogIn_edit } from '../actions';
import Modal from 'react-awesome-modal';
import ModalRigs from '../Modal/ModalRigs';
import ModalLogin from '../Modal/ModalLogin';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }
    handleCart(idUser,cart){
        let addCart = this.props.stateReducers.checkLogIn.cart.concat(cart);
        this.props.checkLogIn_edit(idUser, addCart);
    }

    render() {
        const data = this.props.info;
        var image, name, price,sale;
        if (data !== undefined) {
            image = data.img;
            name = data.name;
            price = data.price;
            sale = this.props.sale;
        }
        const user = this.props.stateReducers.checkLogIn;
        const idUser = user.id;

        return (
            <div className={`Product ${this.props.box}`}>
                <Link to="/product-Detail" onClick={() => this.props.productDetail(name, image, price)} title={name}>
                    <div className="Product__img">
                        <img src={image} alt="df"></img>
                    </div>
                    {
                    (sale !== undefined) 
                    ? <div className="sale">
                            <span>{sale}</span>
                        </div>
                    : null
                    }
                    <div className="new">
                        <span>NEW</span>
                    </div>
                    <div className="Product__text">
                        <div>
                            <span> {name}
                            </span>
                        </div>
                        <div>
                            <span>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </span>
                        </div>
                        <div>
                            <span>{price} đ</span>
                            <span>{parseInt(price) + 50000} đ</span>
                        </div>
                    </div>
                </Link>
                <div className="product_hover">
                    {
                        this.props.stateReducers.checkLogIn.status ?
                            <button type="button" title="Thêm vào giỏ hàng" onClick={() => this.handleCart(idUser, [{ name: name, img: image, price: price, number: 1 }])} > THÊM VÀO GIỎ HÀNG </button>
                            :
                            <button type="button" onClick={() => this.openModal()} title="Thêm vào giỏ hàng"> THÊM VÀO GIỎ HÀNG </button>
                    }
                </div>
                <Modal
                    visible={this.state.visible}
                    width="810"
                    height="370"
                    effect="fadeInDown"
                    onClickAway={() => this.closeModal()}
                >
                    {this.props.stateReducers.switchLogin ? <ModalLogin closeModal={() => this.closeModal()} indexx={image} /> : <ModalRigs indexx={image} />}
                </Modal>
            </div>
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
        productDetail: (name, img, price) => dispatch(productDetail(name, img, price)),
        checkLogIn_edit: (id, cart) => dispatch(checkLogIn_edit(id, cart))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);
