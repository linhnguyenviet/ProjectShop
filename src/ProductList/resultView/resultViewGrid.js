import React from 'react';
import { connect } from 'react-redux';
import GridView from './GridView/GridView';



class ResultViewGrid extends React.Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            todosPerPage: 9
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    change_alias = (alias) => {
        var str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        str = str.replace(/ + /g," ");
        str = str.trim(); 
        return str;
    }

    render() {
        const filterColor = this.props.dataList.filterColor;
        const filterSpecies = this.props.dataList.filterSpecies;
        const filterPrice = this.props.dataList.filterPrice;
        const search = this.props.dataList.search;

        // console.log("price min : " , (filterPrice.min));
        // console.log("price max : " , (filterPrice.max));
        const listFilter = this.props.dataList.data.filter(
            (list) => {
                return list.color.indexOf(filterColor) !== -1 && list.species.indexOf(filterSpecies) !== -1 && filterPrice.min <= parseInt(list.price) && parseInt(list.price) <= filterPrice.max;
            }
        );
        // console.log(listFilter);
        var searchProduct;
        (search === "" && search === "C")
            ? searchProduct = listFilter.filter(
                (item) => {
                    return item.name.includes("C");
                }
            )
            : searchProduct = listFilter.filter(
                (item) => {
                    return this.change_alias(item.name.toLowerCase()).includes(this.change_alias(search.toString().toLowerCase()));
                }
            )
        const sortProduct = searchProduct.slice(0);

        this.props.dataList.sort === "name"
            ?
            sortProduct.sort((a, b) => {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            })
            :
            sortProduct.sort((a, b) => {
                return a.price - b.price;
            })

        // const listData = sortProduct.map((item, index) => {
        //     return <GridView key={index} index={index} {...item} />;
        // });


        const { currentPage, todosPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = sortProduct.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((item, index) => {
            return <GridView key={index} index={index} {...item} />;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(sortProduct.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <button
                    type="button"
                    className="page"
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </button>
            );
        });


        return (
            <div>
                <div className="resultViewGrid">
                    {renderTodos}
                </div>
                <div className="pageController_product">
                    <button type="button" className="pagePrev"> Trang trước </button>
                    {renderPageNumbers}
                    <button type="button" className="pageLast"> Trang cuối </button>
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


export default connect(mapStateToProps, null)(ResultViewGrid);
