import React from 'react';
import { connect } from 'react-redux';
import { switchLogin } from '../actions';


class ModalRigs extends React.Component {
    render() {
        return (
            <div className="modal_box">
                <div className="modal_header">
                    <p>Tạo tài khoản Green shop</p>
                    <div>
                        Bạn đã là thành viên? <button type="button" onClick={() => this.props.switchLogin(true)}>Đăng nhập</button> tại đây.
                                </div>
                </div>
                <div className="modal_body">
                    <div className="modal_input">
                        <div className="login_input">
                            <label htmlFor={"input_name" + this.props.indexx} >Họ tên*</label>
                            <input id={"input_name" + this.props.indexx} className="input-with-status__input" type="text" placeholder="Vui lòng nhập họ và tên của bạn" />
                        </div>
                        <div className="login_input">
                            <label htmlFor={"input_email" + this.props.indexx}>Email*</label>
                            <input id={"input_email" + this.props.indexx} className="input-with-status__input" type="text" placeholder="Vui lòng nhập email của bạn" />
                        </div>
                        <div className="login_input">
                            <label htmlFor={"input_pw" + this.props.indexx}>Mật khẩu*</label>
                            <input id={"input_pw" + this.props.indexx} className="input-with-status__input" type="password" placeholder="Vui lòng nhập mật khẩu của bạn" />
                        </div>
                        <div className="login_input">
                            <label htmlFor={"input_pwRe" + this.props.indexx}>Nhập lại mật khẩu*</label>
                            <input id={"input_pwRe" + this.props.indexx} className="input-with-status__input" type="password" placeholder="Vui lòng nhập lại mật khẩu của bạn" />
                        </div>
                    </div>
                    <div className="modal_btn">
                        <div className="login_input">
                            <label htmlFor={"input_phone" + this.props.indexx} >Số điện thoại*</label>
                            <input id={"input_phone" + this.props.indexx} className="input-with-status__input" type="text" placeholder="Vui lòng nhập số điện thoại của bạn" />
                        </div>
                        <div className="login_input">
                            <label htmlFor={"input_user" + this.props.indexx} >Tên đăng nhập*</label>
                            <input id={"input_user" + this.props.indexx} className="input-with-status__input" type="text" placeholder="Vui lòng nhập tên đăng nhập của bạn" />
                        </div>
                        <button type="button" className="mod-button">Đăng kí</button>
                        <p>Hoặc, đăng kí bằng</p>
                        <button type="button" className="mod-button mod-login-fb " onClick={() => alert("Chức năng đang hoàn thiện")}> <i className="fab fa-facebook-f"></i> &emsp; Facebook</button>
                        <button type="button" className="mod-button mod-login-google" onClick={() => alert("Chức năng đang hoàn thiện")}> <i className="fab fa-google-plus-g"></i> &emsp; Google</button>
                    </div>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        switchLogin: (name) => dispatch(switchLogin(name))
    }
}
export default connect(null , mapDispatchToProps) (ModalRigs);
