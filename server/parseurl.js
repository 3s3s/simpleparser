'use strict';

const utils = require("../utils");
const Xvfb = require('xvfb');
const Nightmare = require('nightmare');
const cheerio = require('cheerio');

exports.onParseURL = function(req, res)
{
    if (!req.body)
        return {result: false, message: "Bad request: no body"} 
    if (!req.body.URL)
        return {result: false, message: "Bad request: no URL"} 

    return new Promise(async ok => {
        try {
            let close = await utils.xvfbInit(new Xvfb());
            let NM = Nightmare({
                switches: {
                    //'proxy-server': '18.217.51.255:4138',
                    'ignore-certificate-errors': true,
                },
                show: false
            })
            
            await NM.goto(req.body.URL);

            let result = await ProcessStartPage(NM);

            close();
            
            return ok(result) 
        }
        catch(e) {
           return ok({result: false, message: e.message}) 
        }
    })
}

function ProcessStartPage(nightmare)
{
    return new Promise(async ok => {
        try {
            await nightmare.wait("body");
            
            const html = await nightmare.evaluate(() => {return document.documentElement.innerHTML});

            console.log(html);
            
            const $ = cheerio.load(html)//(html.replace(/&nbsp;/g,''))

            const tables = GetTables($);
            
            const topLinks = GetTopLinks($);
            
            return ok({result: true, data: {tables: tables, topLinks: topLinks} }) 
        }
        catch(e) {
            console.log("ProcessStartPage: "+e.message);
            return ok({result: false, message: e.message})            
        }
    })
}

function GetTopLinks(jquery)
{
    const $ = jquery;
    
    console.log($('div.largeCard').length)
    
    let largeCards = [];
    $('div.largeCard').each((index, card) => {
        largeCards.push($(card).html());
    });
    
     return largeCards;
}

function GetTables(jquery)
{
    const $ = jquery;
    
    //console.log($('table').length)
    
    let tables = [];
    $('table').each((index, table) => {
        tables.push($(table).html());
    });
    return tables;
}