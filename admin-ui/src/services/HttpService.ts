import axios from "axios";
import StorageService from "services/StorageService";

class HttpService {
  public static async get(path: string, params: any = {}) {
    const nextParams = new URLSearchParams();
    Object.keys(params).forEach((key: string) => {
      if (params[key] && params[key] !== ' ') {
        nextParams.append(key, params[key]);
      }
    });

    return await axios.get(`${path}?${nextParams}`, { headers: { Authorization: `Barrer ${StorageService.getToken()}` } });
  }
  public static async post(path: string, data: any) {
    const isFormData = data instanceof FormData;
    const nextData: any = {};
    Object.keys(data).forEach((key: string) => { if (data[key]) nextData[key] = data[key] });
    return await axios.post(path, isFormData ? data : nextData, { headers: { Authorization: `Barrer ${StorageService.getToken()}` } });
  }
  public static async put(path: string, data: any) {
    const nextData: any = {};
    Object.keys(data).forEach((key: string) => { if (data[key]) nextData[key] = data[key] });
    return await axios.put(path, nextData, { headers: { Authorization: `Barrer ${StorageService.getToken()}` } });
  }
  public static async delete(path: string) {
    return await axios.delete(path, { headers: { Authorization: `Barrer ${StorageService.getToken()}` } });
  }
}

export default HttpService;
