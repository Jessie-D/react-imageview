'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHammerjs = require('react-hammerjs');

var _reactHammerjs2 = _interopRequireDefault(_reactHammerjs);

require('./imgview.css');

require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImgSlide = function (_Component) {
    _inherits(ImgSlide, _Component);

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
                                    _react2.default.createElement('img', { src: PIC_URL + item.url })
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);

    return ImgSlide;
}(_react.Component);