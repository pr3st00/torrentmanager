const express = require('express');
const router = express.Router();
const piratebay = require('../lib/retrievers/piratebay');

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

  // Only Pirate bay so far
  piratebay.retrieve(query, hash)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500);
      res.send(error);
    });
}

module.exports = router;
