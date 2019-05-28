import React, {Component} from 'react';
import dataSource from "./dataSource";
import LikeItem from "../LikeItem";
import Loading from "../../../../components/Loading";
import "./style.css";

class LikeList extends Component {
    constructor(props){
        super(props);
        // 创建 ref 属性
        this.myRef = React.createRef();

        this.state = {
            data:dataSource,
            loadTimes: 1
        };

        this.removeListener = false;
    }


    componentDidMount(){
        // 滚动事件
        document.addEventListener("scroll", this.handleScroll);
    }

    componentDidUpdate(){
        if(this.state.loadTimes >= 3 && !this.removeListener){
            document.removeEventListener("scroll", this.handleScroll);
            this.removeListener = true;
        }
    }

    componentWillUnmount(){
        if(!this.removeListener){
            document.removeEventListener("scroll", this.handleScroll)
        }
    }

    /**
     * 处理屏幕滚动事件，实现加载更多的效果
     */
    handleScroll = () => {
        // 获取页面滚动的距离
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        // 获取屏幕的高度
        const screenHeight = document.documentElement.clientHeight || document.body.clientHeight;

        // 获取 likeList 页面顶部的距离
        const likeListTop = this.myRef.current.offsetTop;
        // 获取 likeList 内容的高度
        const likeListheight = this.myRef.current.offsetHeight;

        /**
         * 如果我们滚动的距离，让我们的 likeList 组件的内容区域的最底部，呈现在了
         * 整个页面，可视区域的最底部，那这时候，我们就要去加载更多的数据
         */
        if(scrollTop >= likeListheight + likeListTop - screenHeight){
            const newData = this.state.data.concat(dataSource);
            const newLoadTimes = this.state.loadTimes + 1;
            setTimeout(() => {
                this.setState({
                    data: newData,
                    loadTimes: newLoadTimes,
                });
            }, 1000);
        }
    }


    render() {
        const {data, loadTimes} = this.state;
        return (
            <div ref={this.myRef} className="likeList">
                <div className="likeList__header">猜你喜欢</div>
                <div className="likeList__list">
                    {
                        data.map((item, index) => {
                            return (
                                <LikeItem key={index} data={item} />
                            );
                        })
                    }
                </div>
                {
                    loadTimes < 3 ? (
                        <Loading />
                    ) : (
                        <a className="likeList__viewAll">查看更多</a>
                    )
                }
            </div>
        );
    }
}

export default LikeList;