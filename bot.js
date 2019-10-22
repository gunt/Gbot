const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
var twit = require("twit");
// console.log(process.env);
var Twitter = new twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
  // timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  // strictSSL: true // optional - requires SSL certificates to be valid.
});

// var retweet = function() {
//   var params = {
//     q: "#nodejs, #Nodejs",
//     result_type: "recent",
//     lang: "en"
//   };
// };

// Twitter.post("statuses/update", { status: "Hello Tech World!" }, function(
//   err,
//   data,
//   response
// ) {
//   console.log(data);
// });

var blacklist = [
  "jcllobet",
  "lesson_shop",
  "SunglassInnov",
  "@TheDevinaKaur",
  "kays_khan"
];

var retweet = function() {
  var stream = Twitter.stream("statuses/filter", {
    track: [
      "#girlswhocode",
      "#girlsintech",
      "#womenintech",
      "#womenintechnology",
      "#womenwhocode",
      "#womeninstem",
      "#femaletech",
      "#momsintech",
      "#momswhocode",
      "#femtech"
    ]
  });

  stream.on("tweet", function(tweet) {
    blacklist.forEach(blacklistedTwitterer => {
      if (tweet.user.screen_name !== blacklistedTwitterer) {
        console.log(tweet.user.screen_name + ": " + tweet.text);
        Twitter.post(
          "statuses/retweet/:id",
          {
            id: tweet.id_str
          },
          function(err, response) {
            if (response) {
              console.log("Retweeted!!!");
            }
            if (err) {
              // console.log(err);
              console.log(
                "Problem when retweeting. Possibly already retweeted this tweet!"
              );
            }
          }
        );
      }
    });
  });
};

retweet();