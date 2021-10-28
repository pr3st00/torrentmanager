const express = require('express');
const router = express.Router();
const magnetFunctions = require('../lib/magnetFunctions.js');

const deluge = require('../lib/deluge.js');

let dlpath = process.env.DOWNLOAD_PATH || "/downloads";

router.get('/', function (req, res, next) {
  sendResponse(req.query.hash, req.query.name, res);
});

router.get('/:hash/:name', function (req, res, next) {
  sendResponse(req.params.hash, req.params.name, res);
});

/**
 * Adds the magnet url determined by hash and name to deluge. Runs the deluge connection logic, if necessary.
 * 
 * @param {*} hash 
 * @param {*} name 
 * @param {*} res 
 */
function sendResponse(hash, name, res) {

  deluge.IsDelugeConnected()
    .then((isConnected) => {
      return isConnected ? deluge.justContinue() : deluge.connect();
    })
    .then(() => {
      return deluge.addMagnetUrl(magnetFunctions.generateMagnetLink(hash, name), dlpath);
    })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500);
      res.send({ "status": "error" });
    })
    .finally(() => {
      deluge.printDetails();
    });

};

module.exports = router;
