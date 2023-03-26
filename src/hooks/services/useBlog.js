import {  useQuery } from "react-query"
import axios from 'axios'
import { DEFAULT_SERVER } from '../../util/const-util';


const defaultServer = DEFAULT_SERVER;
const req = axios.create({ baseURL: defaultServer});

export const useApprovedBlogs = () => {
    return useQuery(
        ['approved-blogs'],
        async () => getApprovedBlogs()
    );
}

const getApprovedBlogs = async () => {
    const result = await req({ url: '/api/blog/approvedBlogs', method: 'get' });
    return result.data;
}