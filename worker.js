var urlget = require('./httpUtil').urlget;
var events = require('events');
var util = require('util');

var Worker = function(queue, router){
	events.EventEmitter.call(this);
	this.queue = queue;
	this.router = router;
	this.doWork = function(){
		var url = queue.pop();
		urlget(url,function(err, res){
			if(err)this.emit('error',err);
			handler = router.getHandler(url);
			if(!handler)this.emit('error','No handler found!');
			handler(res, function(){
				this.emit('doWork');
			});
		})
	};
	this.onError = function(err){
		//TODO log error
		this.emit('doWork');
	};
	
}
util.inherits(Worker, events.EventEmitter);

var newWorker = exports.newWorker = function(queue, router){
	var worker = new Worker(queue, router);
	worker.on('doWork', worker.doWork);
	return worker;
}

//console.log(newWorker(null,null));