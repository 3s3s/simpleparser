'use strict';

const g_constants = require('./constants');
const utils = require('./utils');
const cors = require('cors');

exports.handle = function(app, wss)
{
    app.post('/parseurl', cors(), onParseURL);
/*    app.post('/getuserstat', cors(), onGetUserStat);
    app.post('/getposts', cors(), onGetPosts);
    app.post('/subscribe', onSubscribe);
    
    app.get('/user', cors(), onGetUser);*/
    app.get('/', cors(), onGetMainPage);
}

function onGetMainPage(req, res)
{
    utils.render(res, 'pages/index');
}

async function onParseURL(req, res)
{
    const ret = await require('./server/parseurl').onParseURL(req, res);
    
    utils.renderJSON(req, res, ret);
}