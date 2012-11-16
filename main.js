var Worker = require('./worker'),
	queue = require('./queue').queue,
	router = require('./router').router;

var urlQueue = new 	queue();
var routers = new router();
urlQueue.push('http://music.baidu.com');
routers.add('music.baidu.com','*',function(res){console.log('res:',res)});
var worker  = Worker.newWorker(urlQueue, routers );
worker.emit('doWork');