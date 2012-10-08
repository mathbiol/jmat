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