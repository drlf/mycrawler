/* mkdir -p for node */
var fs = require('fs'),
    path = require('path');
    
function mkdirpSync (basedir, pathes, mode) {
    mode = mode || 0777;
    var dirs = pathes.trim().split('/');
	console.log(dirs);
    if (dirs[0] == '.') {
        // ./aaa
        dirs.shift();
    }

    if (dirs[0] == '..') {
        // ../aaa
        dirs.splice(0, 2, dirs[0] + '/' + dirs[1]);
    }
    
    dirs.length && mkdir(basedir + dirs.shift());
    // mkdir
    function mkdir (d) {
		console.log('.....',d);
        if (!path.existsSync(d)) {
            fs.mkdirSync(d, mode);
        }
        
        dirs.length && mkdir(d + '/' + dirs.shift());
    }
}

// eg
var basedir = 'D:/tmp/nodejs/mycrawler/test';
mkdirpSync(basedir,'/hongru/me');