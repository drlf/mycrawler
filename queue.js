
queue = exports.queue = function() {
  this.cache = [];
  this.push = function (url){
	if (this.contains(url))return;
	this.cache.push(url);
  }
  
  this.pop = function (){
	return this.cache.pop();
  }
  
  this.contains= function (obj){
	for(var i in this.cache){  
            if(obj===this.cache[i]){  
                return true;  
            }  
        }  
        return false;  
  }
  
  this.dump= function(){
	for(var i in this.cache){  
		console.log(this.cache[i]);
    }  
  }
}
/*
var myqueue = new queue();
myqueue.push('aaa');
myqueue.push('bbb');
myqueue.push('bbb');
//myqueue.dump();
console.log(myqueue.pop());
console.log(myqueue.pop());
console.log(myqueue.pop());
*/