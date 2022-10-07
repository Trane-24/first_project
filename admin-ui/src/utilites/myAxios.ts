import axios from "axios";
import StorageService from "services/StorageService";

const headers = {headers: {Authorization: `Barrer ${StorageService.getToken()}`}};

const myAxios = {
  get: (url: string, nextParams?: URLSearchParams) => nextParams
    ? axios.get(`${url}?${nextParams}`, headers)
    : axios.get(`${url}`, headers),
  post: (url: string, data: any) => axios.post(url, data, headers),
  put: (url: string, id: string | number, data: any) => axios.put(`${url}/${id}`, data, headers),
  delete: (url: string, id: string | number) => axios.delete(`${url}/${id}`, headers),
};

export default myAxios;
