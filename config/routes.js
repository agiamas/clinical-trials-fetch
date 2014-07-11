var async = require('async');

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Article Routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

    //Finish with setting up the articleId param
    app.param('articleId', articles.article);

    //Clinical Trials Routes
    var ct = require('../app/controllers/clinical_trials');
    app.get('/clinical_trials', ct.all);
    app.get('/clinical_trials/:clinicaltrialId', ct.show);
    app.get('/api/v1/clinical_trials_search/:ctcondition/:ctlocation', ct.search)

    //http://localhost:3000/api/v1/clinical_trials_search/lung/greece
    app.param('ctcondition', ct.clinical_trial_condition);
    app.param('ctlocation', ct.clinical_trial_location);
    app.param('clinicaltrialId', ct.clinical_trial);


    //Items Routes
    var items = require('../app/controllers/items');
    app.get('/items', items.all);
    app.post('/items', auth.requiresLogin, items.create);
    app.get('/items/:itemId', items.show);
    app.put('/items/:itemId', auth.requiresLogin, auth.article.hasAuthorization, items.update);
    app.del('/items/:itemId', auth.requiresLogin, auth.article.hasAuthorization, items.destroy);

    //Finish with setting up the articleId param
    app.param('itemId', items.item);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);


};