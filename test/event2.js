var events = require('events');
var util = require('util');

var Eventer = function(name){
  this.name = name;
  events.EventEmitter.call(this);
  this.call =  function(phoneNum){
    console.log(this.name,"call phonenum:",phoneNum);
	this.emit('ringme',52);
  };
  this.ring =  function(times){
    console.log(this.name,"ring times:", times);
  };
  
};
util.inherits(Eventer, events.EventEmitter);

var getEventer = exports.getEvent = function(name){
	var eventer = new Eventer(name);
	eventer.on('callme', eventer.call);
	eventer.on('ringme', eventer.ring);
	return eventer;
}



//var eventer1 = getEventer('event1');
//eventer.on('callme', eventer.call);
//eventer1.emit('callme','123123123123');