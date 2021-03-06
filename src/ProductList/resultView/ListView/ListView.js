import React from 'react';
// import { Link } from "react-router-dom";
import Modal from 'react-awesome-modal';
import './modalListView.css';
import ModalRigs from '../../../Modal/ModalRigs';
import ModalLogin from '../../../Modal/ModalLogin';
import { connect } from 'react-redux';
import { checkLogIn_edit } from '../../../actions';
import { Link } from 'react-router-dom';


class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            login: true
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
            <div className="resultView_list">
                <div className="resultView_itemImg-list">
                    <img src={img} alt="alt" />
                </div>
                <div className="resultView_itemDesc-list">
                    <p className="resultView_itemName"> {name} </p>
                    <p className="resultView_itemRating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </p>
                    <p className="resultView_itemDetail">
                        {name} là loại cây dành cho tình yêu! Đây là món quà bất ngờ để bạn tặng "người ấy". Ngọc ngân(Valentine)
                        không chỉ đẹp ở phần lá xanh đốm trắng.
                    </p>
                    <p className="resultView_itemPrice-current">
                        {price} đ
                    </p>
                    {
                        this.props.stateReducers.checkLogIn.status ?
                        <Link to="/cart"> <button type="button" className="resultView_itemBtn" onClick={() => this.handleCart(idUser,[{name: name, img: img, price: price, number: "1"}])} > MUA NGAY </button> </Link>
                        :
                        <button type="button" className="resultView_itemBtn" onClick={() => this.openModal()} > MUA NGAY </button>
                    }
                    {/* modal - add to cart */}
                    {
                        this.props.stateReducers.checkLogIn.status ?
                        <button type="button" className="resultView_itemBtn" onClick={() => this.handleCart(idUser,[{name: name, img: img, price: price, number: "1"}])} > <i className="fas fa-cart-plus"></i> THÊM VÀO GIỎ HÀNG </button>
                        :
                        <button type="button" className="resultView_itemBtn" onClick={() => this.openModal()} > <i className="fas fa-cart-plus"></i> THÊM VÀO GIỎ HÀNG </button>
                    }
                    <Modal
                        visible={this.state.visible}
                        width="810"
                        height="450"
                        effect="fadeInDown"
                        onClickAway={() => this.closeModal()}
                    >
                        {this.props.stateReducers.switchLogin ? <ModalLogin closeModal={() => this.closeModal()} indexx={img}/> : <ModalRigs indexx={img} />}
                        {/* login - regis */}
                    </Modal>
                </div>
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
        checkLogIn_edit: (id, cart) => dispatch(checkLogIn_edit(id, cart))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ListView);
