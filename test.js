'use strict'

const utils = require("./utils.js");
const URL = require('url');
const Xvfb = require('xvfb');
const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const zlib = require('zlib');


exports.Init = async function()
{
    let close = await utils.xvfbInit(new Xvfb());
    let NM = Nightmare({
        switches: {
            //'proxy-server': '18.217.51.255:4138',
            'ignore-certificate-errors': true,
        },
        show: false
    })
    
    console.log("1")
    await NM.goto("https://duckduckgo.com");
    console.log("2")
    
    let result = await ProcessStartPage(NM);
    console.log(result)
    console.log("3")
    
    close();
}

function ProcessStartPage(nightmare)
{
    return new Promise(async ok => {
        try {
            console.log("4")
            await nightmare.wait("body");
            console.log("5")
            const html = await nightmare.evaluate(() => {return document.documentElement.innerHTML});
            //console.log(html)
            return ok(html);
        }
        catch(e) {
            console.log("ProcessStartPage: "+e.message);
            return ok(false);            
        }
    })
}

exports.Init();


/*const Nightmare = require('nightmare');
const nightmare = Nightmare({
	show: true});

const SEARCH_TEXT = process.argv[2] || 'Illinois Tech';

nightmare
	.goto('http://broken-flask.glitch.me/')
	.type('textarea', SEARCH_TEXT)
	.evaluate(function(){
		//throw new Error('No search results');
		var titles = [];
		var results = document.querySelector('textarea').value;
		return results;
	})

	.end()
		.then(function (result) {
			console.log(result)
		})
		.catch(function (error) {
			console.error('Error:', error);
		});*/