var $ = require('jQuery');

//selector
//$("<h1>test passes</h1>").appendTo("body");
//console.log($("body").html());

//ajax
$.ajax({
      method: 'get',
      url: 'http://127.0.0.1/test.htm',
      success: function(r) {
        //console.log(r);
		$('.clearfix a', r).each(function(){
			//console.log(this);
			console.log($(this).text(), $(this).attr('href'))
		});
      }
    });