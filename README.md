## Clinical Trials ETL and Search API

  A software system designed to Extract data from clinicaltrials.gov, Transform it into a convenient to search data format and Load it into our MongoDB database. 
  
  ETL is pulling all recent data from the RSS feed of clinicaltrials.gov, filtering for P2/P3 and active recruiting studies and storing them in separate collections based on if they are of interest to us or not.

  A REST API is exposed with the following methods. All results are JSON formatted.

[ROOT_API] = /api/v1

[ROOT_API]/clinical_trials : fetches all clinical trials. Limited to 100 results to avoid blowing up the DB

[ROOT_API]/clinical_trials/[CLINICAL_TRIAL_ID] : fetches all information for a specific clinical trial id i.e. NCT00000102

[ROOT_API]/clinical_trials_search?condition=[CONDITION]&location=[LOCATION] : searches using a full-text index for [CONDITION] and [LOCATION] all trials and returns all trials that match the search query.



## Future improvements
  * Add other information sources like clinicaltrials.eu maybe..
  * Geocode locations into lon/lat coordinates to be able to search in proximity.
  


## Quick Install
  The quickest way to get started with MEAN is to clone the project and utilize it like this:

  Install dependencies:

    $ npm install

  We recommend using [Grunt](https://github.com/gruntjs/grunt-cli) to start the server:

    $ grunt
    
  When not using grunt you can use:

    $ node server
    
  Then open a browser and go to:

    http://localhost:3000


## Troubleshooting
During install some of you may encounter some issues, most of this issues can be solved by one of the following tips.
If you went through all this and still can't solve the issue, feel free to contact me(Amos), via the repository issue tracker or the links provided below.

#### Update NPM, Bower or Grunt
Sometimes you may find there is a weird error during install like npm's *Error: ENOENT*, usually updating those tools to the latest version solves the issue.

Updating NPM:
```
$ npm update -g npm
```

Updating Grunt:
```
$ npm update -g grunt-cli
```

Updating Bower:
```
$ npm update -g bower
```

#### Cleaning NPM and Bower cache
NPM and Bower has a caching system for holding packages that you already installed.
We found that often cleaning the cache solves some troubles this system creates.

NPM Clean Cache:
```
$ npm cache clean
```

Bower Clean Cache:
```
$ bower cache clean
```

 
## Configuration
All configuration is specified in the [config](config/) folder, particularly the [config.js](config/config.js) file and the [env](config/env/) files. Here you will need to specify your application name, database name, as well as hook up any social app keys if you want integration with Twitter, Facebook, GitHub or Google.

### Environmental Settings

There are three environments provided by default, __development__, __test__, and __production__. Each of these environments has the following configuration options:
* __db__ - This is the name of the MongoDB database to use, and is set by default to __mean-dev__ for the development environment.
* __app.name__ - This is the name of your app or website, and can be different for each environment. You can tell which environment you are running by looking at the TITLE attribute that your app generates.
* __Social OAuth Keys__ - Facebook, GitHub, Google, Twitter. You can specify your own social application keys here for each platform:
	* __clientID__
	* __clientSecret__
	* __callbackURL__

To run with a different environment, just specify NODE_ENV as you call grunt:

	$ NODE_ENV=test grunt

If you are using node instead of grunt, it is very similar:

	$ NODE_ENV=test node server

> NOTE: Running Node.js applications in the __production__ environment enables caching, which is disabled by default in all other environments.
