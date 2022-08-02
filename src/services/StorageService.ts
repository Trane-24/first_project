export default class StorageService {
  public static getIsAuthorization():string {
    return localStorage.getItem('isAuthorization') || '';
  };

  public static setIsAuthorization():void {
    localStorage.setItem('isAuthorization', 'true');
  };

  public static removeIsAuthorization():void {
    localStorage.removeItem('isAuthorization');
  };
}
