let delugeUrl = process.env.DELUGE_URL || "http://localhost:8112/json";
let delugePassword = process.env.DELUGE_PASS || "deluge";

const deluge = require('better-deluge')(delugeUrl, delugePassword);

/**
 * Returns a promise which resolves to true or false indicating whether deluge is connected or not
 */
function IsDelugeConnected() {

    return new Promise((resolve, reject) => {

        deluge.isConnected((error, result) => {
            error ? reject(error) : resolve(result);
        });

    });
}

/**
 * Adds a magnet url to the deluge instance
 * 
 * @param {*} magnetUrl 
 * @param {*} dlpath 
 * @param {*} errorCallBack 
 * @param {*} successCallBack 
 */
function addMagnetUrl(magnetUrl, dlpath, errorCallBack, successCallBack) {

    return new Promise((resolve, reject) => {
        deluge.add(magnetUrl, dlpath, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });

}

/**
 * Connects deluge to the first host id found
 * 
 */
function connect() {

    return new Promise((resolve, reject) => {

        deluge.getHosts((error, result) => {
            if (error) {
                reject(error);
            }
            else {
                if (!result || !result[0] || !result[0].id) {
                    reject(new Error("Id not found"));
                    return;
                }

                let hostId = result[0].id;
                console.debug(`First host in list is [${hostId}]`);

                connectToDaemon(hostId, (error, result) => {
                    error ? reject(error) : resolve();
                });
            }
        });
    });
}

/**
 * Dummy promise which simply resolves
 * 
 */
function justContinue() {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

/**
 * Connect deluge to hostId
 * 
 * @param {*} hostId 
 * @param {*} callback 
 */
function connectToDaemon(hostId, callback) {

    console.debug(`Connecting to hostId [${hostId}]`);

    deluge.connect(hostId, (error, result) => {
        callback(error, result);
    });

}

/**
 * Dumps some details for debugging
 * 
 */
function printDetails() {
    console.debug(`Deluge config: URL = [${delugeUrl}]`);
}

module.exports = { IsDelugeConnected, addMagnetUrl, connect, justContinue, connectToDaemon, printDetails }