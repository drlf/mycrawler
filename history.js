history = exports.history = function() {
  this.cache = [];
  this.push = function (url){
	if (this.contains(url))return;
	this.cache.push(url);
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