var getEventer = require('./event2').getEvent;

var eventer1 = getEventer('event1');
eventer1.emit('callme','123123123123');
eventer1.emit('ringme',54);
var eventer1 = getEventer('event3');
eventer1.emit('callme','11111');