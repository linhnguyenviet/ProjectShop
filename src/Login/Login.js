import React, { Component } from "react";
import './Login.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import Home from '../Home/home'
import { connect } from 'react-redux';
import { fetchProducts,checkLogIn } from '../actions'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            product: [],
            checkLogIn: false,
        }
    }
    checkLength = (o, n, min, max) => {
        if (o.length > max || o.length < min) {
            alert("Độ dài " + n + " trong khoảng " +
                min + " đến " + max + ".");
            return false;
        } else {
            return true;
        }
    }
    checkRegexp = (o, regexp, n) => {
        if (!(regexp.test(o))) {
            alert("Wrong Email Validation. " + n);
            return false;
        } else {
            return true;
        }
    }
    getUser = (e) => {
        var valid = true;
        e.preventDefault();
        var state = this.state;
        var self = this;
        valid = valid && self.checkLength(state.username, "tên đăng nhập", 6, 25);
        valid = valid && self.checkLength(state.pw, "mật khẩu ", 6, 16);
        if(valid){
            axios.get(`https://5ca5c51d3a08260014278a74.mockapi.io/usersShop`)
            .then((res) => {
                var user = res.data.filter(function (element) {
                    return (element.username === state.username && element.pw === state.pw && valid)
                })
                console.log("user login :", user);
                if (user.length) {
                    alert("Đăng nhập thành công");
                    self.setState({
                        checkLogIn:true,
                        name:user[0].name,
                        product:user[0].cart
                    })
                    let cartUser = Object.values(JSON.parse(user[0].cart));
                    this.props.checkLogIn(user[0].id, self.state.checkLogIn, self.state.name, cartUser, user[0].address, user[0].email, user[0].phone, user[0].username, user[0].pw);
                }
                else alert("Đăng nhập thất bại");
            })
        }

    }

    getInputUser = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    getInputPw = (e) => {
        // console.log(e.target.value)
        this.setState({
            pw: e.target.value
        })
    }
    render() {

        return (
            <div>
                {this.state.checkLogIn ? <Home></Home>
                    : <div className="Login">
                        <div className="Left">
                            <div>
                                <p>THÔNG TIN CÁ NHÂN</p>
                            </div>
                            <div>
                                <div>
                                    <label>Tên đăng nhập </label>
                                    <input onChange={this.getInputUser} type="text" placeholder="Vui lòng nhập tên đăng nhập của bạn"></input>
                                </div>
                                <div>
                                    <label>Mật khẩu </label>
                                    <input onChange={this.getInputPw} type="password" placeholder="Vui lòng nhập mật khẩu của bạn"></input>
                                </div>
                                <div className="checkBox">
                                    <input type="checkbox" id="checkbox_input"></input>
                                    <label htmlFor="checkbox_input">Ghi nhớ mật khẩu</label>
                                    <span>Bạn quên mật khẩu</span>
                                </div>
                                <div>
                                    <button onClick={this.getUser} >ĐĂNG NHẬP</button>
                                </div>

                            </div>
                        </div>
                        <div className="Right">
                            <div>
                                <p>BẠN CHƯA CÓ TÀI KHOẢN ?</p>
                            </div>
                            <div>
                                <p className="para">Đăng kí tài khoản để mua hàng nhanh chóng và dễ dàng hơn. Ngoài
                    ra còn nhiều chính sách ưu đãi cho thành viên citybike</p>
                            </div>
                            <div>
                                <Link to="/regis" className="signIn">Đăng kí</Link>
                            </div>
                        </div>
                    </div>

                }
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        checkLogIn: (id,status,name,cart, address, email, phone) => dispatch(checkLogIn(id,status,name,cart,address,email,phone))
    }
}
export default connect(null, mapDispatchToProps)(Login);
