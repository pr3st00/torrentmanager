const trackers = [
    'udp://tracker.coppersurfer.tk:6969/announce',
    'udp://9.rarbg.to:2920/announce',
    'udp://tracker.opentrackr.org:1337',
    'udp://tracker.internetwarriors.net:1337/announce',
    'udp://tracker.leechers-paradise.org:6969/announce',
    'udp://tracker.pirateparty.gr:6969/announce',
    'udp://tracker.cyberia.is:6969/announce'
];

/**
 * Generate magnet link for torrent object and returns it as a string
 * 
 * @param {*} hash 
 * @param {*} name 
 */
function generateMagnetLink(hash, name) {
    const trackersQueryString = `&tr=${trackers.map(encodeURIComponent).join('&tr=')}`;

    return `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(name)}${trackersQueryString}`;
}

module.exports = { generateMagnetLink };