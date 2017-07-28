var keys = require("./keys.js");
//save keys in a variable keyList
var keyList = keys.twitterKeys;
//create variable for input
var inputString = process.argv[2];
//"song name" variable ot "Movie" variable
var detail = process.argv[3];
//defining commands
var tweets = "my-tweets";
var spotify = "spotify-this-song";
var movie = "movie-this";
var random = "do-what-it-says";

if (inputString === random) {

    /***************
     * * Using the `fs` Node package, LIRI will take the text inside of random.txt 
     * and then use it to call one of LIRI's commands.
     ****************/

    //update "inputString" variable to the saved command before running switch


}

switch (inputString) {
    case tweets:
        //show last 20 tweets and when they were created
        break;
    case spotify:
        /***************
         *  Artist(s)
         * The song's name
         * A preview link of the song from Spotify
         * The album that the song is from
         * If no song is provided then your program will default to "The Sign" by Ace of Base.
         ****************/

        break;
    case movie:
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

        break;

}

/*****************
 * 
### BONUS

* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

* Make sure you append each command you run to the `log.txt` file. 

* Do not overwrite your file each time you run a command.

 ******************/