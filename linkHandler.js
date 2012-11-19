var URL = require('url'),
	fs = require('fs'),
	$ = require('jQuery'),
	urlParser = URL.parse;
var urlget = require('./httpUtil').urlget;

function matchLink(url, res, selector, cb){
	$(selector, res.body.toString()).each(function(){
		console.log($(this).text(), $(this).attr('href'))
  	});
	cb();
}
/*
��node-jquery���ݸ�����ѡ����,ѡ��aԪ��,��������ӵ�queue
*/
exports.matchLink = matchLink;	

function matchLinkTest(){
	var url = 'http://127.0.0.1/test.htm';
	urlget(url,function(err, res){
			if(err)throw err;
			
			var handler = matchLink;
			handler(url,res, '.clearfix a', function(){
				console.log(url, 'handled.');
				//self.emit('doWork');
			});
		})
}
matchLinkTest();	