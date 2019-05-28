import React, {Component} from 'react';
import dataSource from "./dataSource";

import "./style.css";

class Discount extends Component {
    render() {
        return (
            <div className="discount">
                <div className="discount__header">
                    <span className="discount__title">超值特惠</span>
                    <span className="discount__more">更多优惠</span>
                    <span className="discount__arrow" />
                </div>
                <div className="discount__content">
                    {
                        dataSource.map((item, index) => {
                            return (
                                <a className="discount__item" href={item.url} key={item.id}>
                                    <div className="discount__itemPic">
                                        <img src={item.picture} width="100%" height="100%" alt={item.shop}/>
                                    </div>
                                    <div className="discount__itemTitle">{item.shop}</div>
                                    <div className="discount__itemPriceWrapper">
                                        <ins className="discount__itemCurrentPrice">{item.currentPrice}</ins>
                                        <del className="discount__itemOldPrice">{item.oldPrice}</del>
                                    </div>
                                </a>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Discount;