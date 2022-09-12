import axios, { AxiosResponse, AxiosRequestConfig, ResponseType } from "axios";

const buildURL = (prefix: string, path: string) => prefix + path

const responseHandler = <T>( url: string, cb?: (res: T) => void, err?: (res: T) => void ) => ( { status, data }: AxiosResponse<T> ) => {
    console.log(status, url);
    if ( status !== 200 && err ) err(data)
    else if ( cb ) cb(data) 
}

const Requests = {
    get: <T>( prefix: string, path: string, params: any, cb?: (res: T) => void, err?: (res: T) => void, responseType?: ResponseType ) =>
    {
        const url = buildURL( prefix, path);
        return axios
            .get<T>( url, { params, responseType } )
            .then( responseHandler(url, cb, err) )
    },

    post: <T>( prefix: string, path: string, data: any, config: AxiosRequestConfig<any>, cb?: (res: T) => void, err?: (res: T) => void ) =>
    {
        const url = buildURL( prefix, path);
        axios
            .post<T>( prefix + path, data, config )
            .then( responseHandler(url, cb, err) )
    },

    downloadBlob: (blob: any, name: string) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
    }
}

export default Requests;
