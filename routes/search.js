const express = require('express');
const router = express.Router();
const piratebay = require('../lib/retrievers/piratebay');
const eztv = require('../lib/retrievers/eztv');

router.get('/', function (req, res, next) {
  sendResponse(req.query.query, req.query.hash, res);
});

router.get('/:query/:hash?', function (req, res, next) {
  sendResponse(req.params.query, req.params.hash, res);
});

/**
 * Sends the response json
 * 
 * @param {*} query 
 * @param {*} hash 
 * @param {*} res 
 */
function sendResponse(query, hash, res) {

  Promise.all([
    piratebay.retrieve(query, hash),
    eztv.retrieve(query, hash)
  ])
    .then((allTorrents) => {
      res.send(allTorrents[0].concat(allTorrents[1]));
    })
    .catch((e) => {
      console.error(e);
      res.status(500);
      res.send(e);
    });

}

module.exports = router;
