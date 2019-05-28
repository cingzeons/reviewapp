import React, {Component} from 'react';
import LikeItem from "../LikeItem";
import Loading from "../../../../components/Loading";
import "./style.css";

class LikeList extends Component {
    constructor(props){
        super(props);
        // 创建 ref 属性
        this.myRef = React.createRef();

        this.removeListener = false;
    }


    componentDidMount(){
        if(this.props.pageCount < 3){
            // 滚动事件
            document.addEventListener("scroll", this.handleScroll);
        }else{
            this.removeListener = true;
        }

        // 获取首屏数据
        if(this.props.pageCount === 0){
            this.props.fetchData();
        }
    }

    componentDidUpdate(){
        if(this.props.pageCount >= 3 && !this.removeListener){
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
            this.props.fetchData();
        }
    }


    render() {
        const {data, pageCount} = this.props;
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
                    pageCount < 3 ? (
                        <Loading />
                    ) : (
                        <span className="likeList__viewAll">查看更多</span>
                    )
                }
            </div>
        );
    }
}

export default LikeList;