var URL = require('url'),
	fs = require('fs'),
	path = require('path'),
	urlParser = URL.parse;

var baseDir = path.resolve(__dirname , 'data' );	
	
function saveAsFile(url, res, pathcb, cb){
	if(!pathcb)pathcb = parseUrlToFile;
	var f = new parseUrlToFile(url);
	var filePath = path.resolve(baseDir , f.path, f.filename);	//�ļ�����·��,���ļ���
	mkdirpSync(baseDir, f.path);
	fs.writeFile(filePath,res.body,'utf8',cb);
}
/*
�Ѵ������ȡ���ļ��洢�ڱ���.Ĭ���ļ���ȡurl�е�·�����ļ���
*/
exports.saveAsFile = saveAsFile;

/*
��url·��ת��Ϊ�洢�ڱ��ص�·��
*/
function parseUrlToFile(url){
	var u = URL.parse(url);
	this.path = u.hostname;
	this.fullName = u.pathname;
	/*
	1. ��·�� http://music.baidu.com, fullNameΪ���ַ�, ��·�����ļ���,-->�ļ���Ĭ��Ϊindex.html
	2.http://music.baidu.com/song/ ��·�����ļ���, -->�ļ���Ĭ��Ϊindex.html
	3.http://music.baidu.com/song/31094101 ,��·�����ļ���
	*/
	if(this.fullName[this.fullName.length-1] == '/'){ //���1��2
		this.filename='index.html';
		this.path += this.fullName;
	}else{
		this.filename = path.basename(this.fullName);
		this.path += path.dirname(this.fullName);
	}
}

/*
basedir  �����Ǿ���·��,
pates ���·��,������/��ͷ,
*/
function mkdirpSync (basedir, pathes, mode) {
    mode = mode || 0777;
    var dirs = pathes.trim().split('/');
	//console.log(dirs);
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
��ʼ����һ��ʵ����ʱ��Ҫ���dataĿ¼�Ƿ����,�粻������Ҫ����
*/