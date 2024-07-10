import axios from "axios";
import { DEFAULT_SERVER } from "./const-util";

const defaultServer = DEFAULT_SERVER;
//const storageServer = localStorage.getItem('server-app');
//const storagePort = localStorage.getItem('port-app');
//const server = storageServer ? `${server}${storagePort ? `:${storagePort}` : ''}` : defaultServer;

const req = axios.create({ baseURL: defaultServer });

export const useRequest = () => {
  // var token = localStorage.getItem('token-app');
  var token = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEcmFnYW5hNSIsImlhdCI6ODY0MDAsImV4cCI6MTcyMDcwNDczNX0.gJEzmHxJPfAQjTcYC6h1UPGxY7n04Wg_ZjkkrYsEcgA`;
  if (token) {
    req.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return req;
};
