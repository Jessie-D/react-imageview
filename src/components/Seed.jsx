import React, { Component } from 'react'; 
import Hammer from 'react-hammerjs'
import './imgview.css' 
import './utils'
class ImgSlide extends Component {
    constructor(...props) {
        super(...props);
        this.touchRange = 0 // 触控距离
        this.count = 0 // 控制弹层总显示的数字以及当前显示的图片
        this.screenWidth = document.body.clientWidth //屏幕宽度
        this.state = {
            imgIndex: this.props.imgIndex,
        }
    }

    componentDidMount() {
        let carouselImg = this.refs.carouselImg
        if (carouselImg) {
            let imgChildren = Array.from(carouselImg.children)
            let index = this.props.imgIndex - 1
            carouselImg.style.webkitTransform = 'translate3d(' + index * (-this.screenWidth) + 'px, 0, 0)'
            this.count = index
        }
        let el = document.getElementsByClassName('viewimgitems')[this.count];
        var pic = new Pic(el);
        pic.picInit();
    }

    handleSwipe(e) {

        const length = this.props.itemImages.length;
        if (e.deltaX < 0) {
            this.count++
            if (this.count === length) {
                this.count = length - 1
                return
            }
            this.setState({
                imgIndex: this.state.imgIndex + 1,
            })
        }
        else {
            this.count--
            if (this.count < 0) {
                this.count = 0
                return
            }
            this.setState({
                imgIndex: this.state.imgIndex - 1,
            })
        }
        let style = {
            transition: '-webkit-transform 0.5s ease',
            webkitTransform: 'translate3d(' + this.count * (-this.screenWidth) + 'px, 0, 0)'
        };
        for (var i in style) {
            this.refs.carouselImg.style[i] = style[i]
        }
        var pic = new Pic(e.target.parentNode);
        pic.picInit();
    }

    render() {
        const { itemImages, showImg } = this.props

        return (
            <div className="imgview-wrap"  >
                <p>{this.state.imgIndex}/{itemImages.length}</p>
                <span onClick={showImg.bind(this, this.state.imgIndex)}>×</span>
                <div className='imgview-imgbox'>

                    <ul className='imgview-imglist' style={{ width: `${this.props.itemImages.length}00%` }} ref="carouselImg">
                        {
                            itemImages.map((item, index) => (
                                <Hammer  key={index} onSwipe={this.handleSwipe.bind(this)} >
                                    <li className="viewimgitems" >
                                        <img src={PIC_URL + item.url} />
                                    </li>
                                </Hammer>
                            ))
                        }
                    </ul>

                </div>
            </div>
        )
    }
}