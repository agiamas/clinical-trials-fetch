var path = require('path'),
rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
    db: 'mongodb://localhost/clinicaltrials'
    //process.env.MONGOHQ_URL
}
