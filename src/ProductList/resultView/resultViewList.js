import React from 'react';
import { connect } from 'react-redux';
import ListView from './ListView/ListView';



class ResultViewList extends React.Component {
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
        
        const listFilter = this.props.dataList.data.filter(
            (list) => {
                return list.color.indexOf(filterColor) !== -1 && list.species.indexOf(filterSpecies) !== -1 && filterPrice.min <= parseInt(list.price) && parseInt(list.price) <= filterPrice.max;
            }
        );
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
                sortProduct.sort((a,b) => {
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    return x < y ? -1 : x > y ? 1 : 0;
                })
            :
                sortProduct.sort((a,b) => {
                    return a.price - b.price;
                })
            
        console.log(searchProduct)
        const listData = sortProduct.map((item, index) => {
            return <ListView key={index} index={index} {...item}/>;
        });
        return (
            <div className="resultViewList">
                {listData}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        dataList: state
    };
};
export default connect(mapStateToProps, null)(ResultViewList);
