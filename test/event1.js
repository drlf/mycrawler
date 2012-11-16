var events = require('events');
var util = require('util');

Eventer = function(name){
	this.name = name;
  events.EventEmitter.call(this);
  this.call =  function(phoneNum){
    console.log(this.name,"call phonenum:",phoneNum);
  };
  
 };
util.inherits(Eventer, events.EventEmitter);
var eventer = new Eventer('event');
var eventer1 = new Eventer('event1');

eventer.on('callme', eventer.call);
eventer1.on('callme', eventer.call);
eventer.emit('callme','123123123123');
eventer1.emit('callme','123123123123');