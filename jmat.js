console.log('jmat :-)')

jmat = {

	transpose:function (x){ // transposes 2D array
		var y=[],n=x.length,m=x[0].length
		for(var j=0;j<m;j++){
			y[j]=[];
			for(var i=0;i<n;i++){
				y[j][i]=x[i][j];
			}
		}
		return y
	},
	
	uid:function(prefix){
		if(!prefix){prefix='UID'}
		var uid=prefix+Math.random().toString().slice(2);
		return uid
	},
	
	parseUrl:function(url){ // parsing url and its arguments out
		var u = {};
		u.url=url.match(/[htf]+tp[s]*:\/\/[^?]+/);
		if (u.url.length!==1){throw ('something is wrong with the syntax this url: '+url)}
		else{
			u.url=u.url[0];u.parms={};
			url.slice(u.url.length+1).split('&').map(function(x){y=x.split('=');u.parms[y[0]]=y[1];return x});
		}
		return u
	},

	sort:function (x){ // [y,I]=sort(x), where y is the sorted array and I contains the indexes
		var y = new Array;
		for(var i =0;i<x.length;i++){y[i]=i} // indexes
		y=y.map(function(i){return [x[i],i]});
		y.sort(function(a,b){return a[0]-b[0]});	
		return this.transpose(y)
	},
	
	stringify:function(x){ // extends JSON.stringify to work with both values and functions
		var y=typeof(x);
		switch (y){
			case 'function':
			y=x.toString();
			break;		
			case 'object':
			if (Array.isArray(x)){
				var y='[';
				for(var i=0;i<x.length;i=i+1){
					y=y+this.stringify(x[i])+','
				}
				y=y.slice(0,y.length-1)+']';
			}
			else{
				y='{';
				for(var v in x){
					y=y+v+':'+this.stringify(x[v])+',';
				}
				y=y.slice(0,y.length-1)+'}';
			}
			break;
			case 'string':
			y=JSON.stringify(x);
			break;
			case 'number':
			y=JSON.stringify(x);
			default:
		}
		return y;
	},
	
	parse:function(x){ // x is a stringified Object
		eval('var res='+x);
		return res;
	},
	
	gId:function(x){ // x is the id of an existing DOM element
		return document.getElementById(x)
	},
	
	unique:function(x){ // x is an Array
		var u = []; // store unique here
		u[0]=x[0];
		for (var i=1; i<x.length; i++){
			// check if x[i] is new
			if (u.map(function(ui){return ui===x[i]}).reduce(function(a,b){return a+b})==0){
				u[u.length]=x[i];
			}
		}
		return u
	},
	
	ranksum:function(x,y){ // this is just a first approximation while something saner emerges for stats
		var s=x.map(function(xi){return y.map(function(yi){return [yi>xi,yi<xi]}).reduce(function(a,b){return [a[0]+b[0],a[1]+b[1]]})}).reduce(function(a,b){return [a[0]+b[0],a[1]+b[1]]});
		return Math.abs(s[0]-s[1])/(x.length*y.length);
	},
	
	log:function(x,n){
		if (!n){return Math.log(x)}
		else{return Math.log(x)/Math.log(n)}
	},
	
	toBin:function(x,n){
		if(!n){n=this.log(x,2)+1};
		var b='';
		for(i=n-1;i>=0;i=i-1){
			m=Math.pow(2,i);
			if(x>=m){b=b+'1';x=x-m}
			else{b=b+'0'}
		};
		return b
	},
	
	cat:function(x,y){ // cat will work for matrices and objects
		x=this.stringify(x);
		y=this.stringify(y);
		return this.parse(x.slice(0,x.length-1)+','+y.slice(1,y.length));		
	},
	
	length:function(x){ // js Array.length returns highest index, not always the numerical length
		var n=0
		for(var i in x){n++};
		return n
	},
	
	array2mat:function(x){ // to handle indexed arrays by converting them into two separate numerically indexed arrays
		var j = 0, y1=[], y2=[];
		for(var i in x){
			y1[j]=i;
			y2[j]=x[i];
			j=j+1;
		}	
		return [y1,y2]	
	}
	
}