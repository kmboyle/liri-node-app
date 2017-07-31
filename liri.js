var keys = require("./keys.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify({
    id: "c623aae5da62434783c921614e70614f",
    secret: "0ec2650c4bb64e269215538f104dab02"
});

//save keys in a variable keyList
var keyList = keys.twitterKeys;
//create variable for input
var inputString = process.argv[2];
//"song name" variable or "Movie" variable
var detail = process.argv[3];
//defining commands
var tweets = "my-tweets";
var music = "spotify-this-song";
var movie = "movie-this";
var random = "do-what-it-says";

switch (inputString) {
    case tweets:
        getTweets();
        break;
    case music:
        var songName = detail;
        //call spotify search function and pass the music search term along
        getMusic(songName);
        break;
    case movie:
        var movieName = detail;
        //call the OMDB searh function and pass the movie search term along
        getMovie(movieName);
        break;
    case random:
        getCommand();
        break;
}

function getTweets() {
    //show last 20 tweets and when they were created

    var access = keyList.access_token_key;

    var url = "https://userstream.twitter.com/1.1/user.json";

    request(url, function(err, res, data) {
        console.log(JSON.stringify(data));

    });



}

function getMusic(songName) {
    /***************
     *  Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
     * If no song is provided then your program will default to "The Sign" by Ace of Base.
     ****************/

    if (songName !== undefined) {
        spotify.search({
                type: "track",
                query: songName,
                limit: 1
            },
            function(err, data) {
                if (err) {
                    return console.log("Error occurred: " + err);
                }

                var result = data.tracks;
                console.log(result);
                var artist = data.tracks.items[0].artists[0].name;
                var song = data.tracks.items[0].name;
                var album = data.tracks.items[0].album.name;
                var preview = data.tracks.items[0].preview_url;

                console.log(`Artist : ${artist}`);
                console.log(`Song Name : ${song}`);
                console.log(`Album Name : ${album}`);
                console.log(`Preview: ${preview}`);
            });


    } else {
        spotify.search({
                type: "track",
                query: "The Sign Ace of Base",
                limit: 1
            },
            function(err, data) {
                if (err) {
                    return console.log("Error occurred: " + err);

                }
                var result = data.tracks;
                console.log(result);
                var artist = data.tracks.items[0].artists[0].name;
                var song = data.tracks.items[0].name;
                var album = data.tracks.items[0].album.name;
                var preview = data.tracks.items[0].preview_url;

                console.log(`Artist : ${artist}`);
                console.log(`Song Name : ${song}`);
                console.log(`Album Name : ${album}`);
                console.log(`Preview: ${preview}`);

            });
    }

}


function getMovie(movieName) {

    /********************
     * 
     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
       *
     ```
       * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

     ********************/
    var key = "40e9cece";
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + key;
    if (movieName !== undefined) {
        request(queryURL, function(err, res, data) {
            if (!err && res.statusCode === 200) {
                var result = JSON.parse(data);
                var Title = result.Title;
                var Year = result.Year;
                var Country = result.Country;
                var Language = result.Language;
                var Plot = result.Plot;
                var Actors = result.Actors;
                var Rating = result.Ratings;
                var ratings = "";
                for (var i = 0; i < Rating.length - 1; i++) {
                    ratings += `${Rating[i].Value} - ${Rating[i].Source}
        `;
                }
                console.log(`Title: ${Title}
Year: ${Year} 
Rating: ${ratings}
Country: ${Country}

Languages: ${Language}

Plot: ${Plot}

Actors: ${Actors}`);
            }

        });


    } else {
        var defaultURL = "http://www.omdbapi.com/?t=Mr.Nobody&apikey=" + key;
        request(defaultURL, function(err, res, data) {

            if (!err && res.statusCode === 200) {

                var result = JSON.parse(data);
                var Title = result.Title;
                var Year = result.Year;
                var Country = result.Country;
                var Language = result.Language;
                var Plot = result.Plot;
                var Actors = result.Actors;
                var Rating = result.Ratings;
                var ratings = "";
                for (var i = 0; i < Rating.length - 1; i++) {
                    ratings += `${Rating[i].Value} - ${Rating[i].Source}
        `;
                }
                console.log(`Title: ${Title}
Year: ${Year} 
Rating: ${ratings}
Country: ${Country}

Languages: ${Language}

Plot: ${Plot}

Actors: ${Actors}`);
            }
        });
    }
}

function getCommand() {
    /***************
     * * Using the `fs` Node package, LIRI will take the text inside of random.txt 
     * and then use it to call one of LIRI's commands.
     ****************/
    fs.readFile("random.txt", "UTF-8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.split(",");
        //update "inputString" variable and "detail" before running switch
        inputString = result[0];
        detail = result[1];
        console.log("Line 221: " + inputString);
        if (inputString === music) {
            getMusic(detail);
        } else if (inputString === movie) {
            getMovie(detail);
        } else if (inputString === tweets) {
            getTweets();
        }

    });

}

/*****************
 * 
### BONUS

* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

* Make sure you append each command you run to the `log.txt` file. 

* Do not overwrite your file each time you run a command.

 ******************/