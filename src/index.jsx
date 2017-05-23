import React from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'react-hammerjs'
import './index.css' 
import './utils'
class ImgSlide extends React.Component {
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
                                        <img src={ item.url} />
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

class Imgview extends React.Component {
    constructor(...args) {
        super(...args)
        this.screenWidth = document.body.clientWidth //屏幕宽度
        this.state = {
            isImgShow: false,
            imgIndex: 1,
        }
    }

    showImg(imgIndex = 1) {
        this.setState({
            isImgShow: !this.state.isImgShow,
            imgIndex: imgIndex
        })
        let style = {
            transition: 'none',
            webkitTransform: 'translate3d(' + (imgIndex - 1) * (-this.screenWidth) + 'px, 0, 0)'
        };
        for (var i in style) {
            this.refs.carousel.style[i] = style[i]
        }
    }

    handleSwipe(e) {

        const length = this.props.images.length;
        let count = this.state.imgIndex - 1;
        if (e.deltaX < 0) {
            if (this.state.imgIndex === length) {
                return
            }
            count += 1
        }
        else {

            if (this.state.imgIndex == 1) {
                return
            }
            else count -= 1

        }
        this.setState({
            imgIndex: count + 1,
        })

        let style = {
            transition: '-webkit-transform 0.5s ease',
            webkitTransform: 'translate3d(' + count * (-this.screenWidth) + 'px, 0, 0)'
        };
        for (var i in style) {
            this.refs.carousel.style[i] = style[i]
        }

        //this.refs.carousel.style.webkitTransform = 'translate3d(' + count * (-this.screenWidth) + 'px, 0, 0)'

    }
    render() {
        const { images } = this.props;

        return (
            <div className='slide'>
                <Hammer onSwipe={this.handleSwipe.bind(this)} >
                    <ul className="slide-list flex" style={{ width: `${this.props.images.length}00%` }} ref='carousel'>
                        {
                            images.length ? images.map((item, index) => {
                                return (
                                    <li key={index} onClick={this.showImg.bind(this, index + 1)} style={{ width: document.body.clientWidth }} >
                                        <img src={ item.url} />
                                    </li>
                                )
                            }) : <img className="photo-front" src="" alt="暂无图片" />
                        }
                    </ul>
                </Hammer>
                {
                    this.state.isImgShow && <ImgSlide itemImages={images} showImg={this.showImg.bind(this)} imgIndex={this.state.imgIndex} />
                }
                <span className="count">{this.state.imgIndex}/{images.length}</span>
            </div>
        )
    }
}
export default Imgview