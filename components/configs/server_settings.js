var config_file;
try {
  // this can cause a warning if file is missing, but it is ok
  config_file = require('./server_settings_local.js');
} catch (err) {
  config_file = require('./server_settings_default.js');
}

export const server_settings = config_file.server_settings;
