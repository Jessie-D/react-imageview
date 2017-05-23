'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHammerjs = require('react-hammerjs');

var _reactHammerjs2 = _interopRequireDefault(_reactHammerjs);

require('./index.css');

require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImgSlide = function (_React$Component) {
    _inherits(ImgSlide, _React$Component);

    function ImgSlide() {
        var _ref;

        _classCallCheck(this, ImgSlide);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = ImgSlide.__proto__ || Object.getPrototypeOf(ImgSlide)).call.apply(_ref, [this].concat(props)));

        _this.touchRange = 0; // 触控距离
        _this.count = 0; // 控制弹层总显示的数字以及当前显示的图片
        _this.screenWidth = document.body.clientWidth; //屏幕宽度
        _this.state = {
            imgIndex: _this.props.imgIndex
        };
        return _this;
    }

    _createClass(ImgSlide, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var carouselImg = this.refs.carouselImg;
            if (carouselImg) {
                var imgChildren = Array.from(carouselImg.children);
                var index = this.props.imgIndex - 1;
                carouselImg.style.webkitTransform = 'translate3d(' + index * -this.screenWidth + 'px, 0, 0)';
                this.count = index;
            }
            var el = document.getElementsByClassName('viewimgitems')[this.count];
            var pic = new Pic(el);
            pic.picInit();
        }
    }, {
        key: 'handleSwipe',
        value: function handleSwipe(e) {

            var length = this.props.itemImages.length;
            if (e.deltaX < 0) {
                this.count++;
                if (this.count === length) {
                    this.count = length - 1;
                    return;
                }
                this.setState({
                    imgIndex: this.state.imgIndex + 1
                });
            } else {
                this.count--;
                if (this.count < 0) {
                    this.count = 0;
                    return;
                }
                this.setState({
                    imgIndex: this.state.imgIndex - 1
                });
            }
            var style = {
                transition: '-webkit-transform 0.5s ease',
                webkitTransform: 'translate3d(' + this.count * -this.screenWidth + 'px, 0, 0)'
            };
            for (var i in style) {
                this.refs.carouselImg.style[i] = style[i];
            }
            var pic = new Pic(e.target.parentNode);
            pic.picInit();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                itemImages = _props.itemImages,
                showImg = _props.showImg;


            return _react2.default.createElement(
                'div',
                { className: 'imgview-wrap' },
                _react2.default.createElement(
                    'p',
                    null,
                    this.state.imgIndex,
                    '/',
                    itemImages.length
                ),
                _react2.default.createElement(
                    'span',
                    { onClick: showImg.bind(this, this.state.imgIndex) },
                    '\xD7'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'imgview-imgbox' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'imgview-imglist', style: { width: this.props.itemImages.length + '00%' }, ref: 'carouselImg' },
                        itemImages.map(function (item, index) {
                            return _react2.default.createElement(
                                _reactHammerjs2.default,
                                { key: index, onSwipe: _this2.handleSwipe.bind(_this2) },
                                _react2.default.createElement(
                                    'li',
                                    { className: 'viewimgitems' },
                                    _react2.default.createElement('img', { src: item.url })
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);

    return ImgSlide;
}(_react2.default.Component);

var Imgview = function (_React$Component2) {
    _inherits(Imgview, _React$Component2);

    function Imgview() {
        var _ref2;

        _classCallCheck(this, Imgview);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var _this3 = _possibleConstructorReturn(this, (_ref2 = Imgview.__proto__ || Object.getPrototypeOf(Imgview)).call.apply(_ref2, [this].concat(args)));

        _this3.screenWidth = document.body.clientWidth; //屏幕宽度
        _this3.state = {
            isImgShow: false,
            imgIndex: 1
        };
        return _this3;
    }

    _createClass(Imgview, [{
        key: 'showImg',
        value: function showImg() {
            var imgIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            this.setState({
                isImgShow: !this.state.isImgShow,
                imgIndex: imgIndex
            });
            var style = {
                transition: 'none',
                webkitTransform: 'translate3d(' + (imgIndex - 1) * -this.screenWidth + 'px, 0, 0)'
            };
            for (var i in style) {
                this.refs.carousel.style[i] = style[i];
            }
        }
    }, {
        key: 'handleSwipe',
        value: function handleSwipe(e) {

            var length = this.props.images.length;
            var count = this.state.imgIndex - 1;
            if (e.deltaX < 0) {
                if (this.state.imgIndex === length) {
                    return;
                }
                count += 1;
            } else {

                if (this.state.imgIndex == 1) {
                    return;
                } else count -= 1;
            }
            this.setState({
                imgIndex: count + 1
            });

            var style = {
                transition: '-webkit-transform 0.5s ease',
                webkitTransform: 'translate3d(' + count * -this.screenWidth + 'px, 0, 0)'
            };
            for (var i in style) {
                this.refs.carousel.style[i] = style[i];
            }

            //this.refs.carousel.style.webkitTransform = 'translate3d(' + count * (-this.screenWidth) + 'px, 0, 0)'
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var images = this.props.images;


            return _react2.default.createElement(
                'div',
                { className: 'slide' },
                _react2.default.createElement(
                    _reactHammerjs2.default,
                    { onSwipe: this.handleSwipe.bind(this) },
                    _react2.default.createElement(
                        'ul',
                        { className: 'slide-list flex', style: { width: this.props.images.length + '00%' }, ref: 'carousel' },
                        images.length ? images.map(function (item, index) {
                            return _react2.default.createElement(
                                'li',
                                { key: index, onClick: _this4.showImg.bind(_this4, index + 1), style: { width: document.body.clientWidth } },
                                _react2.default.createElement('img', { src: item.url })
                            );
                        }) : _react2.default.createElement('img', { className: 'photo-front', src: '', alt: '\u6682\u65E0\u56FE\u7247' })
                    )
                ),
                this.state.isImgShow && _react2.default.createElement(ImgSlide, { itemImages: images, showImg: this.showImg.bind(this), imgIndex: this.state.imgIndex }),
                _react2.default.createElement(
                    'span',
                    { className: 'count' },
                    this.state.imgIndex,
                    '/',
                    images.length
                )
            );
        }
    }]);

    return Imgview;
}(_react2.default.Component);

exports.default = Imgview;