//https://api.23andme.com/authorize/?redirect_uri=http://jmat.googlecode.com/git/23andme.html&response_type=code&client_id=09568fd79aa7911dad7727a024936f8d&scope=basic
// response directed to http://jmat.googlecode.com/git/23andme.html, alternative URL:
//https://dl-web.dropbox.com/get/http/jmat/23andme.html?w=bba1484b&code={borrow from above}
//
UAB={ // 23and me application document object model
	code:null,
	parms:{},
	search4parms:function(){ // gets parameters from call and pushes them to .parms
		var parms = window.document.location.search.slice(1).split('&');
		parms.map(function(x){
			xx = x.split('=');
			UAB.parms[xx[0]]=xx[1]
		})

		//
	}
}



// find out what is being provided and push it to parms
UAB.search4parms();
if(!!UAB.parms.code){
	UAB.code=UAB.parms.code;
	console.log('code = '+UAB.code);
}
else if (!!localStorage.getItem('code')){ // find out if there is one in the localstorage
	UAB.code = localStorage.getItem('code');
	console.log('code = '+UAB.code);
}
else{
	throw('23andme access code not found :-(')
}