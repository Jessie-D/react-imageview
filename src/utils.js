var Pic = function(id){
		this._config = {},
		this._id = typeof id =='string'? document.querySelector(id):id;
		this.mc = new Hammer.Manager(this._id);
		this.timer = false;
		this.translateX = 0;
		this.translateY = 0;
		this.scale = 1;
		this.firstTouch = true; //用户第一次触摸
        this.img = this._id.firstChild;
        this.container = this._id.parentNode;
        this.screenW = this.container.clientWidth;
        this.screenH = this.container.clientHeight;
        //console.log(this.img,this.container.clientHeight,document.body.clientHeight,this.img.offsetHeight)
		this._relateX =0// (document.body.clientWidth - this.img.offsetWidth)/2;
		this._relateY =0// (document.body.clientHeight - this.img.offsetHeight)/2;
		this._oldX = 0;
		this._oldY = 0;
		this._oldScale = 1;
	}
	Pic.prototype = {
		constructor: Pic,
		picAnimate: function(){
			return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {  
            	setTimeout(callback, 1000 / 60);  
	        }; 
		},
		_setPosition: function(){
			var that = this;
			var _relateX = 0;
			var _relateY = 0;
			var _relateTop = 0;
			var _relateLeft = 0; 
            
			// _relateX = (document.body.clientWidth - this.img.offsetWidth)/2;
			// _relateY = (document.body.clientHeight - this.img.offsetHeight)/2;
			_relateTop = this._id.offsetTop;
			_relateLeft = this._id.offsetLeft;

			that._selfPosition({
				translateX: that._relateX,
				translateY: that._relateY,
				scale: that.scale
			})
		},
		_selfPosition: function(pos){
			var that = this;
			var _pos = function(){
				var _style = [
					'translate3d(' + pos.translateX + 'px,' + pos.translateY + 'px,0)',
					'scale(' + pos.scale + ',' + pos.scale + ')'
				]
				_style = _style.join(' ');
				that._id.style.transform = _style;
				//that._id.innerHTML = _style;
			};
			that._picAnimate(_pos);
		},
		_picAnimate: function(fn){
			return this.picAnimate()(fn);
		}, 
		picInit: function(){
			var that = this;
			that.mc.on("hammer.input", function(ev){
				if(ev.isFinal) {
					//that._setPosition();
					that._oldX = that.translateX;
					that._oldY = that.translateY;
					that._oldScale = that.scale;
				}
			})
			that.mc.add( new Hammer.Pan({
				direction: Hammer.DIRECTION_ALL,
				threshold: 0, 
				pointers: 0
			}));
			that.mc.add(new Hammer.Pinch({
				threshold: 0
			})).recognizeWith(that.mc.get('pan'));
            that.mc.add( new Hammer.Tap({event: 'doubletap', taps: 2}));
            
			that.mc.on('panstart panmove', _onPan);
			that.mc.on('pinchstart pinchmove', _onPinch);
            that.mc.on('doubletap', _onDoubletap);

			that._setPosition();

			function _onPan(ev){

				if(that.firstTouch) {
					that._oldX = that._relateX;
					that._oldY = that._relateY;
				};
		        
				that.translateX = that._oldX + ev.deltaX;
				that.translateY = that._oldY + ev.deltaY;

				var _position = {
					translateX: that.translateX,
					translateY: that.translateY,
					scale: that.scale
				};
				
				that._selfPosition(_position);
				that.firstTouch = false;
			};

			function _onPinch(ev) {
				
				that.scale = that._oldScale * ev.scale;

		  		that._selfPosition({
		  			translateX: that.translateX,
		  			translateY: that.translateY,
		  			scale: that.scale
		  		})

		  		that._selfPosition(that._position);
			};

            function _onDoubletap(ev) {console.log(ev)
				if(that._oldScale==1){
				    that.scale =1.5;
                }
                else that.scale =1;
				 
				that.translateX = ev.deltaX // (document.body.clientWidth - that.img.offsetWidth)/2;
				that.translateY = ev.deltaY //(document.body.clientHeight - that.img.offsetHeight)/2;
		  		that._selfPosition({
		  			translateX: that.translateX,
		  			translateY: that.translateY,
		  			scale: that.scale
		  		})
 
			};
		}
	}
	window.Pic = Pic;