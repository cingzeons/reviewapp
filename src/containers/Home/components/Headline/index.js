import React, {Component} from 'react';
import Slider from "react-slick";
import dataSource from "./dataSource";
import "./style.css";

class Headline extends Component {
    render() {
        const settings = {
            slidesToShow: 1,    // 显示1屏
            swipeToSlide: true, // 可以拖动
            autoplay: true,     // 自动滚动
            vertical: true,     // 上下滚动
        };

        return (
            <div className="headline">
                <div className="headline__logo" />
                <div className="headline__slider">
                    <Slider {...settings}>
                        {dataSource.map((item, index) => {
                            return (
                                <a
                                    key={index}
                                    className="headline__sliderInner"
                                    href={item.url}
                                >
                                    <div className="headline__sliderTitle">{item.title}</div>
                                    <div className="headline__sliderImgWrapper">
                                        <img className="headline__sliderImg" src={item.pic} alt={item.title} />
                                    </div>
                                </a>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        );
    }
}

export default Headline;