var URL = require('url'),
	fs = require('fs'),
	path = require('path'),
	urlParser = URL.parse;

var baseDir = path.resolve(__dirname , 'data' );
var sample = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash';
var f = new parseUrlToFile(sample);
var filePath = path.resolve(baseDir , f.path, f.filename);	//文件绝对路径,含文件名
mkdirpSync(baseDir, f.path);
console.log(filePath);
fs.writeFileSync(filePath,'fsdfs');


function parseUrlToFile(url){
	var u = URL.parse(url);
	this.path = u.hostname;
	this.fullName = u.pathname;
	/*
	1. 根路径 http://music.baidu.com, fullName为空字符, 无路径无文件名,-->文件名默认为index.html
	2.http://music.baidu.com/song/ 有路径无文件名, -->文件名默认为index.html
	3.http://music.baidu.com/song/31094101 ,带路径和文件名
	*/
	if(this.fullName[this.fullName.length-1] == '/'){ //情况1和2
		this.filename='index.html';
		this.path += this.fullName;
	}else{
		this.filename = path.basename(this.fullName);
		this.path += path.dirname(this.fullName);
	}
}

/*
basedir  可以是绝对路径,
pates 相对路径,不能以/开头,
*/
function mkdirpSync (basedir, pathes, mode) {
    mode = mode || 0777;
    var dirs = pathes.trim().split('/');
	console.log(dirs);
    dirs.length && mkdir(basedir + '/' + dirs.shift());
    // mkdir
    function mkdir (d) {
        if (!fs.existsSync(d)) {
            fs.mkdirSync(d, mode);
        }
        dirs.length && mkdir(d + '/' + dirs.shift());
    }
}

/*
初始化第一个实例的时候要检查data目录是否存在,如不存在需要创建
*/

//mkdirpSync(pathname);