import axiosClient from "./axiosClient";

export const category: { [key: string]: string } = {
  movie: "movie",
  tv: "tv",
};

export const movieType: { [key: string]: string } = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType: { [key: string]: string } = {
  upcoming: "popular",
  popular: "top_rated",
  top_rated: "on_the_air",
};

interface TmdbApi {
  getMoviesList(type: string, params: object): Promise<any>;
  getTvList(type: string, params: object): Promise<any>;
  getVideos(cate: string, id: number): Promise<any>;
  search(cate: string, params: object): Promise<any>;
  detail(cate: string, id: number, params: object): Promise<any>;
  credits(cate: string, id: number): Promise<any>;
  similar(cate: string, id: number): Promise<any>;
}

const tmdbApi: TmdbApi = {
  getMoviesList: (type: string, params: object) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, { params: params });
  },
  getTvList: (type: string, params: object) => {
    const url = "tv/" + tvType[type];
    return axiosClient.get(url, params);
  },
  getVideos: (cate: string, id: number) => {
    const url = category[cate] + "/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },
  search: (cate: string, params: object) => {
    const url = "search/" + category[cate];
    return axiosClient.get(url, params);
  },
  detail: (cate: string, id: number, params: object) => {
    const url = category[cate] + "/" + id;
    return axiosClient.get(url, params);
  },
  credits: (cate: string, id: number) => {
    const url = category[cate] + "/" + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate: string, id: number) => {
    const url = category[cate] + "/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
