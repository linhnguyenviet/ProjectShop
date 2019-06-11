import React, { Component } from "react";
import './Profile.css';
import axios from 'axios';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pw: "",
            pw2: "",
            pw3:"",
            name: this.props.dataList.checkLogIn.name,
            phone: this.props.dataList.checkLogIn.phone,
            address:this.props.dataList.checkLogIn.address,
            checkLogIn: false,
            phoneValid:"",
            pwValid:"",
            pw2Valid:"",
            pw3Valid:"",
            samePwValid:"",
            nameValid:"",
            addrValid:"",
            toggle:false,
        }
    }  
    changeToggle = () => {
        this.setState({
            toggle : !this.state.toggle
        })
    }
    getInputName = (e) => {
        this.setState({
            name:e.target.value
        })
    }
    getInputAddr = (e) => {
        this.setState({
            address:e.target.value
        })
    }
    getInputPhone = (e) => {
        this.setState({
            phone:e.target.value
        })
    }
    getInputPw = (e) => {
        this.setState({
            pw:e.target.value
        })
    }
    getInputPw2 = (e) => {
        this.setState({
            pw2:e.target.value
        })
    }
    getInputPw3 = (e) => {
        this.setState({
            pw3:e.target.value
        })
    }

    checkLength = (o, n, min, max) => {
        if (o.length > max || o.length < min) {
            switch(n) {
                case "phoneValid" : this.setState({
                    phoneValid : "Số điện thoại gồm 10-11 kí tự"
                })
                break;
                case "pwValid" : this.setState({
                    pwValid : "Mật khẩu phải từ 6-16 kí tự"
                })
                break;
                case "nameValid" : this.setState({
                    nameValid : "Xin nhập họ tên"
                })
                break;
                case "addrValid" : this.setState({
                    addrValid : "Xin nhập địa chỉ"
                })
                break;
                case "pw2Valid" : this.setState({
                    pw2Valid : "Xin nhập mật khẩu mới"
                })
                break;
                default:
                break;
            }
            
            return false;
        } else {
            switch(n) {
                case "phoneValid" : this.setState({
                    phoneValid : ""
                })
                break;
                case "pwValid" : this.setState({
                    pwValid : ""
                })
                break;
                case "nameValid" : this.setState({
                    nameValid : ""
                }) 
                break;
                case "addrValid" : this.setState({
                    addrValid : ""
                })
                break;
                case "pw2Valid" : this.setState({
                    pw2Valid : ""
                })
                break;
                default:
                break;
            }
            return true;
        }
    }
    checkOldPw = (pw) => {
        if(pw !== this.props.dataList.checkLogIn.pw) {
            this.setState({
                pwValid: "Mật khẩu không đúng, xin nhập lại"
            }) 
            return false
        }
        else {
            this.setState({
                pwValid: ""
            }) 
            return true;
        }
    }
    checkPw = (pw,pw2) => {
        if(pw !== pw2) {
            this.setState({
                pw3Valid: "Mật khẩu không khớp, xin nhập lại"
            }) 
            return false;
        }
        else {
            this.setState({
                pw3Valid: ""
            }) 
            return true;
        }
    }
    submit = () => {
        var self =  this;
        var valid = true;
        self.checkLength(self.state.name, "nameValid", 1, 1000);
        self.checkLength(self.state.phone, "phoneValid", 10, 11);
        self.checkLength(self.state.phone, "phoneValid", 10, 11);
        self.checkLength(self.state.address, "addrValid", 1, 100); 
        self.checkLength(self.state.pw2, "pw2Valid", 6, 16);  
        self.checkOldPw(self.state.pw);
        self.checkPw(self.state.pw2,self.state.pw3);
        valid = valid && self.checkLength(self.state.name, "nameValid", 1, 1000) && self.checkLength(self.state.phone, "phoneValid", 10, 11)
                      && self.checkLength(self.state.phone, "phoneValid", 10, 11)  
                      && self.checkLength(self.state.address, "addrValid", 1, 100) &&  self.checkLength(self.state.pw2, "pw2Valid", 6, 16)
                      && self.checkOldPw(self.state.pw) 
                      && self.checkPw(self.state.pw2,self.state.pw3);
        if (valid) {   
            axios.put('http://5ca34ca3190b430014edbc76.mockapi.io/user/'+this.props.dataList.checkLogIn.id,
                {
                    name: self.state.name, phone: self.state.phone,
                    address:self.state.address,pw:self.state.pw2
                }
            )
            .then (alert("Thay đổi thông tin thành công !"))
          
        }
    }
    render() {
        console.log(this.props.dataList.checkLogIn)
        console.log(this.state)
        return (
            <div className="Profile">
                <div className="title">
                    <div>
                        <p>THÔNG TIN CỦA TÔI</p>
                    </div>
                </div>
                <div className="name">
                    <div>Tên</div>
                    <div>
                        <input onChange={this.getInputName} type="text" placeholder={this.state.name}></input>
                    </div>
                    <span>{this.state.nameValid}</span>
                </div>
                <div className="addr">
                    <div>Địa chỉ</div>
                    <div>
                        <input onChange={this.getInputAddr} type="text"  placeholder={this.state.address}></input>
                    </div>
                    <span>{this.state.addrValid}</span>

                </div>
                <div className="phone">
                    <div>Số điện thoại</div>
                    <div>
                        <input onChange={this.getInputPhone} type="text"  placeholder={this.state.phone}></input>
                    </div>
                    <span>{this.state.phoneValid}</span>

                </div>
                
                <div  className="pw">
                  <div>
                      <button className="changepw" onClick={this.changeToggle}><i class="fas fa-key"></i>Đổi mật khẩu</button>
                  </div>  
                </div>
                { this.state.toggle 
                            ? <>
                            <div className="pw">
                                <div>Mật khẩu cũ</div>
                                <div>
                                    <input onChange={this.getInputPw} type="text"  ></input>
                                </div>
                                <span>{this.state.pwValid}</span>

                            </div>
                            <div className="pw">
                                <div>Mật khẩu mới</div>
                                <div>
                                    <input onChange={this.getInputPw2} type="text" ></input>
                                </div>
                                <span>{this.state.pw2Valid}</span>
                            </div>
                            <div className="pw">
                                <div>Nhập lại mật khẩu</div>
                                <div>
                                    <input onChange={this.getInputPw3}  type="text" ></input>
                                </div>
                                <span>{this.state.pw3Valid}</span>

                            </div>
                              </>
                            : <></>
                }
                <div className="pw">
                                <div></div>
                                <div>
                                    <button onClick={this.submit} >Cập nhật</button>
                                </div>
                            </div>
            </div>

        );
    }
}
const mapStateToProps = state => {
    return {
        dataList: state
    };
};
export default connect(mapStateToProps,null)(Profile);
