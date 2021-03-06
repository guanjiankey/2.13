window.onload=function(){
	class Drag{
		constructor(obj){
			this.obj=obj;
			this.cw=document.documentElement.clientWidth;
			this.ch=document.documentElement.clientHeight;
			this.ow=this.obj.offsetWidth;
			this.oh=this.obj.offsetHeight;
			this.ox=0;
			this.oy=0;
			this.cx=0;
			this.cy=0;
			this.left=0;
			this.top=0;
			this.endx=0;
			this.endy=0;
			this.startx=0;
			this.starty=0;
			this.lenx=0;
			this.leny=0;
			
		}
		drag(){
			this.down();
		}
		down(e){
			var that=this;
			this.obj.onmousedown=function(e){
				var eve=e||window.event;
				if(eve.preventDefault){ 
					eve.preventDefault();
				}else{
					eve.returnValue=false;
				}
				that.ox=eve.offsetX;
				that.oy=eve.offsetY;
				that.move();
				that.up();
			}
		}
		move(){
			var that=this;
			document.onmousemove=function(e){
				var eve=e||window.event;
				that.cx=eve.clientX;
				that.cy=eve.clientY;
				that.left=that.cx-that.ox;
				that.top=that.cy-that.oy;
				if(that.left<=0){
					that.left=0;
				}
				if(that.top<=0){
					that.top=0;
				}
				if(that.left>=that.cw-that.ow){
					that.left=that.cw-that.ow;
				}
				if(that.top>=that.ch-that.oh){
					that.top=that.ch-that.oh;
				}
				that.obj.style.left=that.left+"px";
				that.obj.style.top=that.top+"px";
				that.endx=that.obj.offsetLeft;
				that.endy=that.obj.offsetTop;
				that.lenx=that.endx-that.startx;
				that.leny=that.endy-that.starty;
				that.startx=that.endx;
				that.starty=that.endy;
			}
		}
		up(){
			var that=this;
			document.onmouseup=function(){
				var xishu=0.8;
				var t1=setInterval(function(){
					that.lenx*=xishu;
					that.leny*=xishu;
					var x=that.obj.offsetLeft+that.lenx;
					var y=that.obj.offsetTop+that.leny;
					if(x<0){x=0;}
					if(y<0){y=0;}
					if(x>that.cw-that.ow){x=that.cw-that.ow;}
					if(y>that.ch-that.oh){y=that.ch-that.oh;}
					that.obj.style.left=x+"px";
					that.obj.style.top=y+"px";
					if(Math.abs(that.lenx)>=Math.abs(that.leny)){
						if(Math.abs(that.lenx)<1){
							clearInterval(t1);
						}
					}else{
						if(Math.abs(that.leny)<1){
							clearInterval(t1);
						}
					}
				},60)
				document.onmousemove=null;
				document.onmouseup=null;
			}
		}
	}
	var box=document.querySelector(".box");
	new Drag(box).drag();
}
	
	
	
	

