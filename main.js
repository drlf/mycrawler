var Worker = require('./worker'),
	queue = require('./queue').queue,
	saveAsFile = require('./handler.js').saveAsFile,
	router = require('./router').router;

var urlQueue = new 	queue();
var routers = new router();
//urlQueue.push('http://music.baidu.com');

var links = ['http://www.photophoto.cn/m77/161/012/1610120026.jpg',
'http://pic6.nipic.com/20100423/1011445_113330001125_2.jpg',
'http://pic19.nipic.com/20120317/7242719_090630381000_2.jpg',
'http://pic4.nipic.com/20091030/732473_102205082933_2.jpg',
'http://pic15.nipic.com/20110804/8027625_165559818000_2.jpg']

for(i in links)urlQueue.push(links[i]);
//routers.add('music.baidu.com','*',function(res){console.log('res:',res)});
//routers.add('music.baidu.com','*',saveAsFile);
routers.add('www.photophoto.cn','*',saveAsFile);
routers.add('pic6.nipic.com','*',saveAsFile);
routers.add('pic19.nipic.com','*',saveAsFile);
routers.add('pic4.nipic.com','*',saveAsFile);
routers.add('pic15.nipic.com','*',saveAsFile);

var worker  = Worker.newWorker(urlQueue, routers );
worker.emit('doWork');