export class Config {
  static get apiUrl() {
    if (window.location.hostname === 'localhost') {
      return `${window.location.protocol}//localhost:3000/v2`;
    }
    const parts = window.location.hostname.split('.');
    parts[0] = `${parts[0]}-api`;
    const twigApiHostname = parts.join('.');
    return `${window.location.protocol}//${twigApiHostname}/v2`;
  };
  static modelsFolder = 'models';
  static twigletsFolder = 'twiglets';
  static viewsFolder = 'models';
}
