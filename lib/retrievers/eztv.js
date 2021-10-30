const axios = require('axios').default;
const cheerio = require('cheerio');
const magnetFunctions = require('../magnetFunctions.js');

const url = 'https://eztv.re/search/';
const source = "EZTV";

/**
 * Retrieves torrent data from pirate bay
 * 
 * @param {*} query 
 * @param {*} hash 
 */
function retrieve(query, hash) {

    return new Promise((resolve, reject) => {

        var options = {
            method: 'GET',
            url: url + query,
            headers: {
            }
        };

        axios.request(options).then(function (response) {

            let $ = cheerio.load(response.data);

            let data = [];

            $('.magnet').each((i, e) => {
                let name = $(e).attr('title') || "NA";
                let magnetUrl = $(e).attr('href');

                let hash = magnetUrl.match(/magnet:\?xt=urn:btih:([^&]+)&/)[1];

                data[i] = {
                    name: name,
                    leechers: 0,
                    seeders: 0,
                    files: 0,
                    hash: hash,
                    source: source,
                    magnetUrl: magnetUrl
                };
            });

            if (hash) {
                console.log("Restricting data to hash ", hash);
                data = data.filter((x) => x.hash === hash);
            }

            resolve(data);

        }).catch(function (error) {
            reject(error);
        });
    });

}

module.exports = { retrieve }