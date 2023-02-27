interface apiConfig {
  imgPath: string;
}

const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  api: 'f4dff989aeebe08758854a530c47abf3',
  originalImage: (imgPath: string) =>
    `https://image.tmbd.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string) => `https://image.tmbd.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
