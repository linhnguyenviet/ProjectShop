import React from 'react';
import { Link } from "react-router-dom";
import '../CheckOut/CheckOut.css';
import { connect } from 'react-redux';
import { fetchProducts,checkLogIn } from '../actions'

import axios from 'axios';
class CheckOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select:3,
            info: this.props.dataList.checkLogIn.name + " " +this.props.dataList.checkLogIn.phone + " " + this.props.dataList.checkLogIn.address,
            toggle:false,
            cardNumber:""
        }
    }   
    
    findTotal = (array) => {
       return  Math.floor( array.reduce((accu,element) => {
            return accu+parseInt(element.price)
        },0) *1.1)
    }

    getInfo = (e) => {
        this.setState({
            info:e.target.value
        })
    }
    getCard = (e) => {
        this.setState({
            cardNumber:e.target.value
        })
    }
    changeToggle = () => {
        this.setState({
            toggle : !this.state.toggle
        })
    }

    submitOrder = () => {
        console.log(this.props.dataList.checkLogIn)
       
        axios.post('http://5cf71ac07f67dd0014a6256f.mockapi.io/order',
                {
                    username:this.props.dataList.checkLogIn.username,
                    cart:this.props.dataList.checkLogIn.cart,
                    info:this.state.info,
                    total:this.findTotal(this.props.dataList.checkLogIn.cart)+20000,
                    cardNumber:this.state.cardNumber
                }
            )
            alert("Bạn đã đặt hàng thành công !")
          
    }
    render() {
        console.log(this.props.dataList.checkLogIn);
        return (
            <div className="CheckOut">
                <div className="title">
                    <div>
                        <p> THANH TOÁN</p>
                    </div>
                </div>
                <div className="info">
                    <div>
                        <p><i class="fas fa-map-marker-alt"> </i> Địa Chỉ Nhận Hàng</p>
                        {(!this.state.info.includes(undefined)) ? this.state.info : null} 
                        <button onClick = {() => this.changeToggle()}> Thay đổi </button>
                        { this.state.toggle 
                            ? <div><input onChange={this.getInfo} type="text"></input></div>
                            : <></>
                        }
                        
                    </div>  
                </div>
            
                <div className="ship">
                    <div>
                        <span>Chọn phương thức giao hàng </span>
                        <button onClick={()=>this.setState({select:1})}>Ví Airpay</button>
                        <button onClick={()=>this.setState({select:2})}>Thẻ tín dụng / ghi nợ</button>
                        <button onClick={()=>this.setState({select:3})}>Thanh toán khi nhận hàng</button>
                        <div>
                            { this.state.select==1 ? <div className="airpay">Use Airpay</div>
                            : ( this.state.select==2 ? <div className="card">Nhập mã thẻ
                                <input onChange={this.getCard} type="text"></input>
                            </div>
                            : <div className="cod">Bạn sẽ thanh toán sau khi nhận hàng .</div>
                            )
                            }
                        </div>
                        
                    </div>                 
                </div>
                <div className="total">
                    <div className="wrapper">
                        <div className="left1">Tổng tiền hàng</div>
                        <div className="left2">Phí vận chuyển</div>
                        <div className="left3">Tổng thanh toán</div>
                        <div className="right1">{this.findTotal(this.props.dataList.checkLogIn.cart)} đ</div>
                        <div className="right2"> {
                            (this.props.dataList.checkLogIn.cart.length) ? <span>20 000</span>
                            : null
                            } đ</div>
                        <div className="right3"><span style={{color:"#3FB871",fontWeight:"bold",fontSize:"1.2em"}}> {
                            (this.props.dataList.checkLogIn.cart.length) ? this.findTotal(this.props.dataList.checkLogIn.cart)+20000 
                            : 0
                            }
                         </span> đ</div>
                        <div className="bottom">
                        <button onClick={()=>this.submitOrder()}>Thanh toán</button>
                        </div>
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
const mapDispatchToProps = dispatch => {
    return {
        checkLogIn: (status,name,cart,address,phone,username) => dispatch(checkLogIn(status,name,cart,address,phone,username))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CheckOut);
