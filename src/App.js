import React from 'react';
import { Link } from "react-router-dom";
// import TopHeader from './Header/TopHeader';
import Footer from './Footer/Footer';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchProducts,checkLogIn,search, logOut } from './actions'
import './NavBar.css';
import './App.css';
import './TopHeader.css';
// import './NavBar--sm.css';
import Main from './main';
import image from './Image/Image/image.png';
import image2 from './Image/Image/image2.png';
import './HeaderImg.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search:"",
            toggle:false,
            searchEnter:false,
            toggleSearch:false
    }
}
    componentDidMount() {
        this.props.fetchProducts();
    }
    getSearch = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    scrollToTop() {
        /* window.scrollTo(0, 0) */
        function scrolling() {
            if(window.scrollY > 0) {
                setTimeout(function() {
                    window.scrollTo(0, window.scrollY - 30);
                    scrolling();
                }, 6);
            };
        };
        scrolling();
    };
    toggleMenu = () => {
        this.setState({
            toggle:!this.state.toggle
        })
    }
    toggleSearch = () => {
        this.setState({
            toggleSearch:!this.state.toggleSearch
        })
    }
    render() {
        // console.log(this.props.dataList);
        // console.log(this.props.dataList.checkLogIn.name);
        console.log(this.state)
        const name = this.props.dataList.checkLogIn.name;
        var sumPrice = (arr) =>{
            return arr.reduce((total, item) => {
                return total + parseInt(item.number);
            }, 0)
        }
        const totalProduct = sumPrice(this.props.dataList.checkLogIn.cart);
        // if(this.state.searchEnter) 
        // return <Redirect to='/product'/>
         return (
            <div className="App">
                <div className="TopHeader">
                    <div className="TopHeader-inner">
                        <span>Open time 8:00 -18:00 Monday - Sunday</span>
                        <span> </span>
                        <Link to="/"> <i className="fab fa-facebook-f" /> </Link>
                        <Link to="/"> <i className="fab fa-twitter" /> </Link>
                        <Link to="/"> <i className="fab fa-linkedin-in" /> </Link>
                        <Link to="/"> <i className="fab fa-instagram" /> </Link>
                        <div className="TopHeader-login">
                        {!this.props.dataList.checkLogIn.status
                            ?  <>
                                <Link to="/login"><i className="fas fa-user"> </i>Đăng nhập</Link>
                                <Link to="/regis"><i className="fas fa-user-plus"></i>Đăng kí</Link>
                                </>
                            : <>
                                <Link to="/profile"><i className="fas fa-user"> </i>{name}</Link>
                                <Link to="/" onClick={()=>this.props.logOut()}><i className="fas fa-user-plus"></i>Log out</Link>
                                </>
                        }
                        </div>
                    </div>

                </div>
                <div className="HeaderImg">
                    <div className="HeaderImg-wrap">
                        <img src={image} alt="dfsf" />
                        <img src={image2} alt="dfd " />
                        <div className="HeaderImg-wrapInner">
                            <div className="HeaderImg-inner">
                                <span> <i className="fas fa-phone"> </i> HỖ TRỢ : 091270929 -091270929 </span>
                                <form action="/action_page.php">
                                    <input onChange={this.getSearch} onKeyPress = {(e) => {
                                        if(e.key === 'Enter')
                                        {
                                            this.props.search(this.state.search);
                                            this.setState({
                                                searchEnter:true
                                            })
                                        }
                                        }} type="text" placeholder="  Tìm kiếm.." name="search" />
                                        
                                    <button onClick ={(e) => {
                                        this.props.search(this.state.search);
                                        e.preventDefault();
                                        }} >
                                     <Link to="/product">  <i className="fa fa-search" /></Link></button>
                                </form>
                            </div>

                            <div className="HeaderImg-cart">
                                <Link to="/cart"> <i className="fas fa-shopping-basket"> {" "} <p> Giỏ hàng <span className="number">{totalProduct}</span></p> </i></Link>
                            </div>
                        </div>
                    </div>
                </div>         
                 <div className="NavBar">
                    <ul >
                        <li>
                        <Link to="/" onClick={this.toggleMenu} > <i  className="fas fa-bars"></i> </Link>
                        </li>
                        <li>
                            <Link to="/">TRANG CHỦ</Link>
                        </li>
                        <li>
                            <Link to="/intro">GIỚI THIỆU</Link>
                        </li>
                        <li>
                            <Link to="/product">SẢN PHẨM</Link>
                        </li>
                        <li>
                            <Link to="/newproduct">SẢN PHẨM MỚI</Link>
                        </li>
                        <li>
                            <Link to="/contact">LIÊN HỆ</Link>
                        </li>
                        { (this.state.toggleSearch) 
                        ? <li className="search--sm">
                            <input onChange={this.getSearch} type="text" placeholder="  Tìm kiếm.." name="search"  />
                            <button onClick ={(e) => {
                                        this.props.search(this.state.search);
                                        e.preventDefault();

                                        }} >
                                     <Link to="/product" >  <i className="fas fa-arrow-right" /></Link></button>
                        </li>
                        : null
                        }
                        
                        <li className="search__icon" onClick={this.toggleSearch}>
                            <i  className="fa fa-search"></i>
                        </li>
                        <li>
                            <Link to="/cart"> <i className="fas fa-shopping-basket"> <span className="number--sm">{totalProduct}</span> </i></Link>
                        </li>

                    </ul>
                </div>
                {
                    !this.state.toggle 
                    ? null
                    :<div className="NavBar--sm">
                    <ul >
                        <li>
                            <Link to="/">TRANG CHỦ</Link>
                        </li>
                        <li>
                            <Link to="/intro">GIỚI THIỆU</Link>
                        </li>
                        <li>
                            <Link to="/product">SẢN PHẨM</Link>
                        </li>
                        <li>
                            <Link to="/newproduct">SẢN PHẨM MỚI</Link>
                        </li>
                        <li>
                            <Link to="/contact">LIÊN HỆ</Link>
                        </li>
                        
                    </ul>
                </div>
            }
                <Main />
                <Footer></Footer>
                <button className="toTop_btn" title="Lên đầu trang" onClick={ () => this.scrollToTop()}> <i className="fas fa-arrow-up"></i> </button>
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
        fetchProducts: () => dispatch(fetchProducts()),
        checkLogIn: (status,name,cart) => dispatch(checkLogIn(status,name,cart)),
        logOut: () => dispatch(logOut()),
        search: (name) => dispatch(search(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
