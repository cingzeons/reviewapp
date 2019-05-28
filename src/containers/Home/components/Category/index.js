import React, {Component} from 'react';
import Slider from "react-slick";
// json 数据
import dataSource from "./dataSource";

import "./style.css";

class Category extends Component {

    render() {
        const settings = {
            dots: true,         // 显示下方的 点 符号
            arrows: false,       // 设置 false 走马灯两边就没有箭头
            slidesToShow: 1,    // 主屏，表示主屏要显示几屏，主区域每次显示一屏的信息
            swipeToSlide: true, // 表示可以拖动，去触发每一屏的变化
            autoplay: true,     // 表示走马灯可以自动的去旋转
        };

        return (
            <div className="category">
                <Slider {...settings}>
                    {
                        dataSource.map((section, index) => {
                            return (
                                <div key={index}>
                                    {
                                        section.map((item, i) => {
                                            return (
                                                <div className="category__section" key={i}>
                                                    <img className="category__icon" src={item.src} alt={item.name}/>
                                                    <div>
                                                        <span className="category__text">{item.name}</span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                </Slider>
            </div>
        );
    }
}

export default Category;

