var Twit = require("twit");
var tracery	= require("tracery-grammar");

var T = new Twit(require("./secrets"));

var grammar = tracery.createGrammar(require("./grammar.json")); //loads json object with grammar from file



//stream of tweet mentions
var stream = T.stream('statuses/filter', {
	track: ['@queertheorybot']
});


stream.on('tweet', function(tweet) {
	var response = grammar.flatten('#question_origin#');

	//ensures it is short enough for twitter
	while (response.length > (140 - 2 - tweet.user.screen_name.length) {
		response = grammar.flatten('#question_origin#');
	};

	//replies to mentions with a question
	T.post('statuses/update', {
		status: '@' + tweet.user.screen_name + ' ' + response,
		in_reply_to_status_id: tweet.id_str
	}, 
	function (err, data, response) {
		console.log(data);
	});	

});

function postTweet() {
	//generates and posts a new tweet
	var tweet = grammar.flatten('#origin#');

	//ensures it is short enough for twitter
	while (tweet.length > 140) {
		tweet = grammar.flatten('#origin#');
	};

	T.post('statuses/update', { status: tweet }, function(err, data, response) {
		console.log(data);
	});

}


//post every 3 hours: 1000 (ms) * 60 (s) * 60 (m) * 3 (h)s
setInterval(postTweet,1000*60*60*3);
