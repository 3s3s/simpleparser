'use strict'

// xvfb wrapper
exports.xvfbInit = function(xvfb, options) {

  function close() {
    return new Promise((resolve, reject) => {
      xvfb.stop(err => (err ? reject(err) : resolve()))
    })
  }

  return new Promise((resolve, reject) => {
    xvfb.start(err => {
        //console.log(err)
        (err ? reject(err) : resolve(close))
    })
  })
}

exports.render = function(responce, page, info)
{
    const lang = (info && info.lang ? info.lang : 'en');

    let render_info = info || {};
    
    render_info['lang'] = lang;
    render_info['debug'] = false;
    
    responce.render(page, render_info);
}

exports.renderJSON = function(req, res, params)
{
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(params));
};

