import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:3333"
  baseURL:"https://www.aparecida.go.gov.br/wp-json/wp/v2"
  //baseURL:"http://10.111.135.197/wp-json/wp/v2"
});

export default api;