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
	
	parse:function(x){
		eval('var res='+x);
		return res;
	},
	
	gId:function(x){
		return document.getElementById(x)
	}

}