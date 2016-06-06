
	var mbUploadImg = {
		changeSize:false,
		maxWidth:2000,
		maxHeight:1500,
		imgurl:null,
		

		init:function(obj){
			for(var v in obj){
				this[v] = obj[v];
			}

		},

		imgHandle:function(src){

		},

		handleFile:function(){

			var _this = mbUploadImg;

			window.URL = window.URL || window.webkitURL;
			var sUserAgent= navigator.userAgent.toLowerCase();
			var selected_file = upload.files[0];
			//判断文件类型是否为图片
			var imageType = /image.*/;
    
		    if (!selected_file.type.match(imageType)) {
		      return false;
		    }
		   

			if(sUserAgent.match(/android/i) == "android"){
		    	
			    var reader = new FileReader();
			    reader.onload = function(e) {
			    	_this.imgurl = e.target.result;
			    	if(_this.changeSize){
			    		_this.changeSizeHandle(_this.imgurl);
			    	}else{
			    		_this.imgHandle(_this.imgurl);
			    	}
			    };
			    reader.readAsDataURL(selected_file);

			}else{
			    var reader = new FileReader();
			    reader.onload = function(e) {
			    	_this.imgurl = e.target.result;
			    	if(_this.changeSize){
			    		_this.changeSizeHandle(_this.imgurl);
			    	}else{
			    		_this.imgHandle(_this.imgurl);
			    	} 
			    };
			    reader.readAsDataURL(selected_file);
			}
		},

		changeSizeHandle:function(src){
			var _t = this;
			var img = new Image();
			var newSrc = '';
			var qlt = 1;

			img.onload = function(){
				var iWidth = img.width;
				var iHeight = img.height;
				var nWidth = iWidth , nHeight = iHeight;
				if(iWidth > iHeight){
					//宽型图片
					if(iWidth > _t.maxWidth){
						nWidth = _t.maxWidth;
						nHeight = (iHeight/iWidth)*nWidth;
						qlt = _t.maxWidth / iWidth;
					}
				}else if(iHeight > iWidth){
					//高型图片
					if(iHeight > _t.maxHeight){
						nHeight = _t.maxHeight;
						nWidth = (iWidth/iHeight)*nHeight;
						qlt = _t.maxHeight / iHeight;
					}
				}
				var can = document.createElement('canvas');
				var ctx = can.getContext('2d');
				can.width = nWidth;
				can.height = nHeight;
				ctx.drawImage(img,0,0,nWidth,nHeight);
				
				newSrc = can.toDataURL("image/jpeg",qlt);
				_t.imgHandle(newSrc);

			}
			img.src = src;
		}
	}

