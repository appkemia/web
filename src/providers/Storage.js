export default class Storage {
  static tokenKey = '@kemia/token';

  static refreshTokenKey = '@kemia/refreshToken';

  static userKey = '@kemia/user';

  static empresaKey = '@kemia/empresa';

  static localKey = '@kemia/local';

  static async getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static async removeItem(key) {
    localStorage.removeItem(key);
  }

  static async setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
