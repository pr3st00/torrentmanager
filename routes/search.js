const express = require('express');
const router = express.Router();
const axios = require("axios").default;
const magnetFunctions = require('../lib/magnetFunctions.js');

const tpbapiurl = 'https://apibay.org/q.php?q=';

router.get('/', function (req, res, next) {
  sendResponse(req.query.query, req.query.hash, res);
});

router.get('/:query/:hash?', function (req, res, next) {
  sendResponse(req.params.query, req.params.hash, res);
});

function sendResponse(query, hash, res) {

  var options = {
    method: 'GET',
    url: tpbapiurl + query,
    headers: {
    }
  };

  axios.request(options).then(function (response) {

    let data = {};

    if (hash) {
      console.log("Restricting data to hash ", hash);
      data = response.data.filter((x) => x.info_hash === hash);
    }
    else {
      data = response.data;
    }

    res.send(data.map(v => Object.assign({
      name: v.name,
      leechers: v.leechers,
      seeders: v.seeders,
      files: v.num_files,
      hash: v.info_hash,
      source: "ThePirateBay",
      magnetUrl: magnetFunctions.generateMagnetLink(v.info_hash, v.name)
    })));
  }).catch(function (error) {
    console.error(error);
    res.status(500);
    res.send(error);
  });

}

module.exports = router;
