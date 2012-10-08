//https://api.23andme.com/user/login/?redirect=/authorize/?redirect_uri=http://jmat.googlecode.com/git/23andme.html&response_type&code%26client_id=D09568fd79aa7911dad7727a024936f8d&scope=basic

MB23={ // 23and me application document object model
	code:null,
	parms:{},
	search4parms:function(){ // gets parameters from call and pushes them to .parms
		var parms = window.document.location.search.slice(1).split('&');
		parms.map(function(x){
			xx = x.split('=');
			MB23.parms[xx[0]]=xx[1]
		})

		//
	}
}



// find out what is being provided and push it to parms
MB23.search4parms();
if(!!MB23.parms.code){
	MB23.code=MB23.parms.code;
	console.log('code = '+MB23.code);
}
else if (!!localStorage.getItem('code')){ // find out if there is one in the localstorage
	MB23.code = localStorage.getItem('code');
	console.log('code = '+MB23.code);
}
else{
	throw('23andme access code not found :-(')
}