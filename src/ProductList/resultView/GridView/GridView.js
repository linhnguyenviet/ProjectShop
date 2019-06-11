import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { productDetail, checkLogIn_edit } from '../../../actions';
import Modal from 'react-awesome-modal';
import ModalRigs from '../../../Modal/ModalRigs';
import ModalLogin from '../../../Modal/ModalLogin';

class GridView extends React.Component {
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
        const { price, name, img } = this.props;
        const user = this.props.stateReducers.checkLogIn;
        const idUser = user.id;
        return (
            <div className="blockResultView_grid">
                <Link to="/product-Detail" className="resultView_grid" title={name} onClick={() => this.props.productDetail(name, img, price)}>
                    <div className="resultView_itemImg">
                        <img src={img} alt="alt" />
                    </div>
                    <div className="resultView_itemDesc">
                        <p className="resultView_itemName"> {name} </p>
                        <p className="resultView_itemRating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </p>
                        <div className="itemPrice">
                            <span className="resultView_itemPrice-current"> {parseInt(price)} đ </span>
                            <span className="resultView_itemPrice-last"> {parseInt(price) + 50000} đ </span>
                        </div>
                    </div>
                </Link>
                <div className="product_hover">
                    {
                        this.props.stateReducers.checkLogIn.status ?
                            <button type="button" title="Thêm vào giỏ hàng" onClick={() => this.handleCart(idUser, [{ name: name, img: img, price: price, number: 1 }])} > THÊM VÀO GIỎ HÀNG </button>
                            :
                            <button type="button" onClick={() => this.openModal()} title="Thêm vào giỏ hàng"> THÊM VÀO GIỎ HÀNG </button>
                    }
                </div>
                <Modal
                    visible={this.state.visible}
                    width="810"
                    height="480"
                    effect="fadeInDown"
                    onClickAway={() => this.closeModal()}
                >
                    {this.props.stateReducers.switchLogin ? <ModalLogin closeModal={() => this.closeModal()} indexx={img} /> : <ModalRigs indexx={img} />}
                </Modal>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(GridView);
