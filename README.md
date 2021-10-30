<h1 align="center">Torrent Manager</h1>

<p>
Web interface which can search for torrents and send them to deluge for downloading
</p>

## Web interface
Screenshots:

1. Main interface

![Main interface](https://i.imgur.com/MJU5QGP.png "Main interface")

2. Torrent sent to deluge for downloading

![Torrent added to Deluge](https://i.imgur.com/pdnTrfv.png "Torrent added to Deluge")

3. Deluge starts to download

![Deluge downloading](https://i.imgur.com/KX2DmNp.png "Deluge downloading")

## Configuration
By default the interface will try to connect to a deluge instance running on localhost with the default password of "deluge"
and the default download folder of "/downloads"

Those values can be customized by setting environment variables as shown below:

export DELUGE_URL="http://<delugeHost>:8112/json"   
export DELUGE_PASS="<delugePass>"   
export DOWNLOAD_PATH="<downloadDir>"   

In case you're building a docker container, the docker.sh script will pass those variables to the running container as well.

## Sources currently supported
1. The pirate bay
2. EZTV

## Current Feature Requests/Suggestions
Pending..

## License
MIT

## Author
[Fernando Almeida] (fernando.c.almeida@gmail.com)