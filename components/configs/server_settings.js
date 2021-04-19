var config_file;
try {
  // this can cause a warning if file is missing, but it is ok
  config_file = require('./server_settings_local.js');
} catch (err) {
  config_file = require('./server_settings_default.js');
}


export const server_settings = {
  FLASK_URL : 'https://flask.datenadler.de',
  PLONE_URL : 'https://backend.datenadler.de',
  MY_URL : 'https://datenadler.de',
  RDF_DOWNLOAD_URL : 'https://flask.datenadler.de/download'
}
	
