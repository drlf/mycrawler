var routes = require('routes')
	,util = require('util')
	,urlParse = require('url').parse
  , urlResolve = require('url').resolve

router = exports.router = function() {
  this.cache = {};
  var self = this;
  this.add = function (hosts, pattern, cb){
		if (typeof hosts === 'string') {
			hosts = [hosts];
		}
	  hosts.forEach(function (host) {
		if (!self.cache[host])self.cache[host] = new routes.Router();
		self.cache[host].addRoute(pattern, cb);
	  })
  }
  
  this.getHandler = function (url, cb){
	var u = urlParse(url)
	if (this.cache[u.host]) {
	    var r = this.cache[u.host].match(u.href.slice(u.href.indexOf(u.host)+u.host.length));
		//console.log(util.inspect(r));
		if(r)return r.fn;
	  }  
  }
  this.hasHandler = function (url){
	if(this.getHandler(url))return true;
	return false;
  }
  
  this.dump= function(){
	console.log(util.inspect(this.cache));
  }
}

/*
var myrouter = new router();
myrouter.add('127.0.0.1',/^\/Handle/,function(msg){console.log('Handle msg:',msg)});
myrouter.add('127.0.0.1',/^\/Msg/,function(msg){console.log('msg:',msg)});
(myrouter.getHandler('http://127.0.0.1/Handle'))('fsdf');
(myrouter.getHandler('http://127.0.0.1/Msg'))('fsdf');
(myrouter.getHandler('http://127.0.0.2/Handle'))('fsdf');
*/
//myrouter.dump();