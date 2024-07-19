import axios from "axios";
import decode from "jwt-decode";
import { Configs } from "./config";
// import { DEFAULT_SERVER } from "./const-util";
// const defaultServer = DEFAULT_SERVER;

const defaultServer = Configs.DEFAULT_SERVER;
// const server = defaultServer;

//const storageServer = localStorage.getItem('server-app');
//const storagePort = localStorage.getItem('port-app');
//const server = storageServer ? `${server}${storagePort ? `:${storagePort}` : ''}` : defaultServer;

const req = axios.create({ baseURL: defaultServer });

req.interceptors.request.use(
  (config) => {
    checkTokenExpiration();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
req.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token-app");
      window.location.href = "/";
      return Promise.reject("Token je istekao. Prijavite se ponovo.");
    } else {
      return Promise.reject(error);
    }
  }
);
const checkTokenExpiration = () => {
  const accessToken = localStorage.getItem("token-app");
  if (accessToken) {
    const decodedToken = decode(accessToken);
    const expirationTime = decodedToken.exp * 1000;
    if (Date.now() >= expirationTime) {
      window.location.reload();
    }
  }
};

export const useRequest = () => {
  var token = localStorage.getItem("token-app");
  // var token = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEcmFnYW5hNSIsImlhdCI6ODY0MDAsImV4cCI6MTcyMTM2OTM0OX0.zK2kJpj83bn1Qao5c22bjRLMp_tASNy_LZJBc6C9_1A`;

  if (token) {
    req.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return req;
};
