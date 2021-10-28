const axios = require("axios").default;
const magnetFunctions = require('../magnetFunctions.js');

const tpbapiurl = 'https://apibay.org/q.php?q=';

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

            resolve(data.map(v => Object.assign({
                name: v.name,
                leechers: v.leechers,
                seeders: v.seeders,
                files: v.num_files,
                hash: v.info_hash,
                source: "ThePirateBay",
                magnetUrl: magnetFunctions.generateMagnetLink(v.info_hash, v.name)
            })));
        }).catch(function (error) {
            reject(error);
        });
    });

}

module.exports = { retrieve }