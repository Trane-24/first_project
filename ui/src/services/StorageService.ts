export default class StorageService {
  private static readonly TOKEN = 'hotels:TOKEN';

  public static getToken():string {
    return localStorage.getItem(StorageService.TOKEN) || '';
  };

  public static setToken(token: string):void {
    localStorage.setItem(StorageService.TOKEN, token);
  };

  public static removeToken():void {
    localStorage.removeItem(StorageService.TOKEN);
  };
}
