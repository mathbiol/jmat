console.log('fun with tables (funTable) loaded');

funTable={
	loadFiles:function(files,readAs,callback){
		//<input type="file" id="files" multiple onchange="funTable.loadFiles(this.files,'readAsText')"></input>
		if(!readAs){readAs='readAsDataURL'} // default is to read as dataURL
		for(var i=0;i<files.length;i++){
			this.readFile(files[i],readAs)
		}
		return i
	},
	readFile:function(f,readAs,callback){
		var that = this;
		if(!callback){callback=function(x){ // DEAFAULT CALLBACK - you may want to write your own
			console.log('---'+x.file.fileName+'---');console.log(x.result); // comment out if you don't want to track reading in the cnsole
			if(!that.work){that.work={}};if(!that.work.files){that.work.files=[]} // results stored in .work.files
			that.work.files[x.file.fileName]={file:x.file,result:x.result}; // array indexed to file name
			}
		}
		var reader = new FileReader();
		reader.onload=(function(theFile){
			return function(ev){
				//if(!funTable.work.Files){funTable.work.Files=[]}
				//funTable.work.Files[theFile.fileName]={file:theFile,result:ev.target.result};
				callback({file:theFile,result:ev.target.result})
				//console.log(ev.target.result,theFile)
			}
		})(f)
		reader[readAs](f);
	},
	log:function(x){
		console.log(x);
		jmat.gId('msg').textContent+=x+'\n';
	},
	clearConsole:function(){
		var c=jmat.gId('console');
		c.textContent='>';
		c.focus();
	},
	clearMsg:function(){
		var m=jmat.gId('msg');
		m.textContent='';
		c.focus();
	},
	work:{
		// workspace variables 
	}
}
	

