var urlget = require('./httpUtil').urlget;
var events = require('events'),
	util = require('util'),
	domain = require('domain');
	


var Worker = function(queue, router){
	events.EventEmitter.call(this);
	var self = this;
	this.queue = queue;
	this.router = router;
	this.doWork = function(){
		//throw new Error('test err');
		var url = queue.pop();
		if(!url)throw new Error('Empty url queue.');
		urlget(url,function(err, res){
			if(err)throw err;
			var handler = router.getHandler(url);
			if(!handler)throw new Error('No handler found for ' + url);
			handler(url,res, null, function(){
				//console.log(url);
				self.emit('doWork');
			});
		})
	};
	this.d = domain.create();
	this.d.on('error',function(err){
		console.log('domain error: ',err);
		//console.log(self);
	})
}
util.inherits(Worker, events.EventEmitter);

var newWorker = exports.newWorker = function(queue, router){
	var worker = new Worker(queue, router);
	worker.on('doWork', worker.doWork);
	worker.d.add(worker);
	return worker;
}

//console.log(newWorker(null,null));