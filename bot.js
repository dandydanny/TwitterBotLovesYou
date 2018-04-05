// Adapted from https://dev.to/notfakedev/twitter-bot-in-17-lines-of-code-100m

const Twitter = require('twitter');
const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

// Keywords for bot to like
const stream = client.stream('statuses/filter', {track:'@dandydanny, dandydanny'});

stream.on('data', (event) => {

  client.post('favorites/create', {id:event.id_str}, (error, response) => {
    if(error) throw error;
    console.log('Tweet ID: '+response.id_str+' Liked! - "'+response.text+'"')
  });

});

// List of error codes https://developer.twitter.com/en/docs/basics/response-codes
// Print error, if encounterd
stream.on("error", error => console.error(error));