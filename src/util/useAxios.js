import axios from 'axios'
import { DEFAULT_SERVER } from './const-util';

const defaultServer = DEFAULT_SERVER;
//const storageServer = localStorage.getItem('server-app');
//const storagePort = localStorage.getItem('port-app');
//const server = storageServer ? `${server}${storagePort ? `:${storagePort}` : ''}` : defaultServer;

const req = axios.create({ baseURL: defaultServer });


export const useRequest = () => {
    var token = localStorage.getItem('token-app');
    if (token) {
        req.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    return req;
}
