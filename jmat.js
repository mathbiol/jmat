console.log('jmat :-)')

jmat = {

array2mat:function(x){ // to handle indexed arrays by converting them into two separate numerically indexed arrays
	var j = 0, y1=[], y2=[];
	for(var i in x){
		y1[j]=i;
		y2[j]=x[i];
		j=j+1;
	}	
	return [y1,y2]	
},

array2str:function(x,sp){ // convert array into a sp separated
	if (!sp){sp='\n'}
	y=x[0];
	for (var i=1;i<x.length;i++){
		y=y+sp+x[i];
	}
	return y
},

bin2dec:function(x){
	var n=x.length;
	return x.split('').map(function(xi,i){return xi*Math.pow(2,n-i-1)}).reduce(function(a,b){return a+b});
},

cat:function(x,y){ // cat will work for matrices and objects
	x=this.stringify(x);
	y=this.stringify(y);
	return this.parse(x.slice(0,x.length-1)+','+y.slice(1,y.length));		
},

catArray:function(A){ // optimized for conCATenation of an array of numerically indexed arrays
	// this function was developed to adress memory issues of dealing with large arrays, not performance
	var Astr='[',Ai='';
	for(var i=0;i<A.length;i++){
		Ai=JSON.stringify(A[i]);
		Astr+=Ai.slice(1,Ai.length-1)+',';
	}
	return JSON.parse(Astr.slice(0,Astr.length-1)+']');
},

cEl:function(x,id){
	x = document.createElement(x);
	if(id){x.id=id}
	return x
},

clone:function(x){ // clone object without functional elements
	return JSON.parse(JSON.stringify(x))
},

clone2:function(x){ // clone object that may have functional elements
	return jmat.parse(jmat.stringify(x))
},

cloneArray:function(A){
	if(Array.isArray(A)){return A.map(function(x){return jmat.cloneArray(x)})}
	else{return A}
},

data2imData:function(data){ // the reverse of im2data, data is a matlabish set of 4 2d matrices, with the r, g, b and alpha values
	var n=data.length, m=data[0].length;
	//var imData = {width:m, height:n, data:[]};
	var imData = document.createElement('canvas').getContext('2d').createImageData(m,n);
	for (var i=0;i<n;i++){ //row
		//data.r[i]=[];data.g[i]=[];data.b[i]=[];data.a[i]=[];
		for (var j=0;j<m;j++){ // column
			ij=(i*m+j)*4;
			imData.data[ij]=data[i][j][0];
			imData.data[ij+1]=data[i][j][1];
			imData.data[ij+2]=data[i][j][2];
			imData.data[ij+3]=data[i][j][3];
		}
	}
	return imData;
},

dec2bin:function(x,n){
	if(!n){n=Math.ceil(this.log(x,2))+1};
	var b='';
	for(i=n-1;i>=0;i=i-1){
		m=Math.pow(2,i);
		if(x>=m){b=b+'1';x=x-m}
		else{b=b+'0'}
	};
	return b
},

disp:function(x){ // by default displays both in the console and in document.body
	console.log(x);
	document.body.innerHTML+='<br><span color=blue>'+x+'</span>';
},

dotFun:function(A,B,fun){ // dot matrix function
	4;
},

get:function(key,callback,url){ // get content at url or key
	if (!callback){callback=function(x){console.log(x)}}
	if (!url){url=this.webrwUrl};
	var uid = this.uid();
	if(!this.get.jobs){this.get.jobs=[]}
	this.get.jobs[uid]={'fun':callback};
	var url=url+'?get='+key+'&callback=jmat.get.jobs.'+uid+'.fun';
	var s=document.createElement('script');
	s.id = uid;s.src=url;
	document.body.appendChild(s);
	setTimeout('document.body.removeChild(document.getElementById("'+uid+'"));delete jmat.get.jobs.'+uid+';',10000); // is the waiting still need ? script onload would be another possibility to delete it
	return uid;
},

fieldnames:function(x){
	y=[];i=0;
	for(var f in x){
		y[i]=f;
		i++;
	}
	return y;
},

gId:function(x){ // x is the id of an existing DOM element
	// return null if neither id nor class are found
	// so constructs like !jmat.gId(someID) can be used
	//var y=document.getElementById(x);
	//if(!y){
	//	var z=document.getElementsByClassName(x);
	//	if(z.length>0){return z}
	//	else{return y}
	//}
	//else{return y}
	return document.getElementById(x)
},

imread:function(cv){ // reads image from context into matrix
	// find out what type of input
	if(typeof(cv)=='string'){ // cv is the id of a canvas element
		cv=jmat.gId(cv)
	}
	var ct=cv.getContext('2d'), n=cv.width, m=cv.height;
	var imData=ct.getImageData(0,0,n,m); // pixel values will be stored in imData.data
	return this.imData2data(imData)
},

imwrite:function(cv,im,dx,dy){
	if(!dy){dx=0;dy=0} // default location
	if(typeof(cv)=='string'){cv=jmat.gId(cv)} //cv can also be the id of a canvas element
	if(!im.data){im=jmat.data2imData(im)} // such that im can also be the matrix created by imread
	var ct = cv.getContext('2d');
	ct.putImageData(im,dx,dy);
	return ct;
},

imData2data:function(imData){ // imData is the data structure returned by canvas.getContext('2d').getImageData(0,0,n,m)
	var m=imData.width, n=imData.height, data=[];
	for (var i=0;i<n;i++){ //row
		data[i]=[];
		for (var j=0;j<m;j++){ // column
			ij=(i*m+j)*4;
			data[i][j]=[imData.data[ij],imData.data[ij+1],imData.data[ij+2],imData.data[ij+3]]
		}
	}
	return data;	
},

length:function(x){ // js Array.length returns highest index, not always the numerical length
	var n=0
	for(var i in x){n++};
	return n
},

load:function(url){ // load script / JSON
	var s = document.createElement('script');
	s.src=url;
	s.id = this.uid();
	document.body.appendChild(s);
	setTimeout('document.body.removeChild(document.getElementById("'+s.id+'"));',30000); // is the waiting still needed ?
},

loadFiles:function(files,readAs,callback){
	//<input type="file" id="files" multiple onchange="jmat.loadFiles(this.files,'readAsText')"></input> //<-- example of button for reading text files
	if(!readAs){readAs='readAsDataURL'} // default is to read as dataURL
	for(var i=0;i<files.length;i++){
		this.readFile(files[i],readAs)
	}
	return i
},

readFile:function(f,readAs,callback){
	var that = this;
	if(!callback){callback=function(x){ // DEAFAULT CALLBACK - you may want to write your own
		console.log('---'+x.file.fileName+'---');console.log(x.result); // comment out if you don't want to track reading in the console
		if(!that.work){that.work={}};if(!that.work.files){that.work.files=[]} // results stored in .work.files
		that.work.files[x.file.fileName]={file:x.file,result:x.result}; // array indexed to file name
		}
	}
	var reader = new FileReader();
	reader.onload=(function(theFile){
		return function(ev){
			callback({file:theFile,result:ev.target.result})
		}
	})(f)
	reader[readAs](f);
},

log:function(x,n){
	if (!n){return Math.log(x)}
	else{return Math.log(x)/Math.log(n)}
},

max:function(x){ //return maximum value of array
	return x.reduce(function(a,b){if(a>b){return a}else{return b}})
},

max2:function(x){ // returns maximum value of array and its index, i.e.  [max,i]
	return x.map(function(xi,i){return [xi,i]}).reduce(function(a,b){if(a[0]>b[0]){return a}else{return b}})
},

parse:function(x){ // x is a stringified Object
	eval('var res='+x);
	return res;
},

parseUrl:function(url){ // parsing url and its arguments out
	var u = {};u.url=url.match(/[htf]+tp[s]*:\/\/[^?]+/);
	if (u.url.length!==1){throw ('something is wrong with the syntax this url: '+url)}
	else{
		u.url=u.url[0];u.parms={};url.slice(u.url.length+1).split('&').map(function(x){y=x.split('=');u.parms[y[0]]=y[1];return x});
	}
	return u
},

ranksum:function(x,y){ // this is just a first approximation while something saner emerges for stats
	var s=x.map(function(xi){return y.map(function(yi){return [yi>xi,yi<xi]}).reduce(function(a,b){return [a[0]+b[0],a[1]+b[1]]})}).reduce(function(a,b){return [a[0]+b[0],a[1]+b[1]]});
	return Math.abs(s[0]-s[1])/(x.length*y.length);
},

reval:function(x,fun,callback,url){ 
	if (!Array.isArray(x)){x=[x]} // make sure x is an array
	if (!Array.isArray(fun)){fun=[fun]} // make sure it is an array of functions
	if (!url){url=this.webrwUrl};
	//if (!Array.isArray(fun)){fun=[fun]} // make sure it is an array of functions
	// create webrw jobList
	if (!this.reval.jobs){this.reval.jobs=[]}
	var uid = this.uid();
	this.reval.jobs[uid]={fun:fun,x:x,callback:callback,url:url}
	//match x and fun dimensions
	var n = Math.max(jmat.reval.jobs[uid].x.length,jmat.reval.jobs[uid].fun.length);
	for (var i=jmat.reval.jobs[uid].x.length;i<n;i++){jmat.reval.jobs[uid].x[i]=jmat.reval.jobs[uid].x[i-1]}
	for (var i=jmat.reval.jobs[uid].fun.length;i<n;i++){jmat.reval.jobs[uid].fun[i]=jmat.reval.jobs[uid].fun[i-1]}
	this.set('if(!window.jmatReval){jmatReval=[]};jmatReval["'+uid+'"]={ jobs:'+jmat.stringify(jmat.reval.jobs[uid])+'};',this.parse('function(key){jmat.reval.jobs.'+uid+'.key=key;jmat.revalSet("'+uid+'");}'),undefined,url);
},

revalSet:function(uid){ // set job for remote evaluation, task is the key of the webrw document aggregating individual jobs
	console.log('remote eval of '+uid+' at '+jmat.reval.jobs[uid].url+'/doc/'+jmat.reval.jobs[uid].key);
	console.log(uid);
},

revalGet:function(task){ //
	4;
},

set:function(val,callback,key,url){ // set key-val pairs in the webrw endpoint, calback will have the key as its argument
	if (!callback){callback=function(x){console.log(x)}};
	if (typeof(val)!='string'){this.stringify(val)};
	if (!url){url=this.webrwUrl}
	if(!this.set.jobs){this.set.jobs=[]}
	var uid = this.uid();
	this.set.jobs[uid]={'fun':callback};
	var s=document.createElement('script');s.id=uid;
	if (!key){s.src=url+'?set='+val+'&callback=jmat.set.jobs.'+uid+'.fun'}
	else{s.src=url+'?set='+val+'&key='+key+'&callback=jmat.set.jobs.'+uid+'.fun'}
	document.body.appendChild(s);
	setTimeout('document.body.removeChild(document.getElementById("'+uid+'"));delete jmat.set.jobs.'+uid+';',10000);
	return uid;
},

sort:function(x){ // [y,I]=sort(x), where y is the sorted array and I contains the indexes
	x=x.map(function(xi,i){return [xi,i]});
	x.sort(function(a,b){return a[0]-b[0]});	
	return this.transpose(x)
},

sum:function(x){return x.reduce(function(a,b){return a+b})},

str2num:function(x){
	return JSON.parse(x);
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

webrwUrl:'http://sandbox1.mathbiol.org/webrw.php',

}