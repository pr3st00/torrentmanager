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

            $('.epinfo').each((i, e) => {
                let name = $(e).attr('title') || "NA";

                data[i] = {
                    name: name,
                    leechers: "2",
                    seeders: "1",
                    files: "3",
                    hash: "hash",
                    source: source,
                    magnetUrl: magnetFunctions.generateMagnetLink("hash", "name")
                };
            });

            if (hash) {
                console.log("Restricting data to hash ", hash);
                data = data.filter((x) => x.info_hash === hash);
            }

            resolve(data);

        }).catch(function (error) {
            reject(error);
        });
    });

}

module.exports = { retrieve }