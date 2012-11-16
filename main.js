var Worker = require('./worker'),
	queue = require('./queue').queue,
	saveAsFile = require('./handler.js').saveAsFile,
	router = require('./router').router;

var urlQueue = new 	queue();
var routers = new router();
//urlQueue.push('http://music.baidu.com');
urlQueue.push('http://music.baidu.com/song/31094101');
urlQueue.push('http://music.baidu.com/song/30931191');
urlQueue.push('http://music.baidu.com/song/31149781');
//routers.add('music.baidu.com','*',function(res){console.log('res:',res)});
routers.add('music.baidu.com','*',saveAsFile);
var worker  = Worker.newWorker(urlQueue, routers );
worker.emit('doWork');