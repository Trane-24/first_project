import axios from "axios";
import StorageService from "./StorageService";

class HttpService {
  public static async get(path: string, params: any = {}) {
    const nextParams = new URLSearchParams();
    Object.keys(params).forEach((key: string) => { if (params[key]) nextParams.append(key, params[key]) });
    return await axios.get(`${path}?${nextParams}`, { headers: { Authorization: `Barrer ${StorageService.getToken()}` } });
  }
  public static async post(path: string, data: any) {
    return await axios.post(path, data, { headers: { Authorization: `Barrer ${StorageService.getToken()}` } });
  }
  public static async put(path: string, data: any) {
    return await axios.put(path, data, { headers: { Authorization: `Barrer ${StorageService.getToken()}` } });
  }
  public static async delete(path: string) {
    return await axios.delete(path, { headers: { Authorization: `Barrer ${StorageService.getToken()}` } });
  }
}

export default HttpService;
