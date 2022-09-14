import axios, { AxiosResponse, AxiosRequestConfig, ResponseType } from "axios";

const buildURL = (prefix: string, path: string) => prefix + path

const responseHandler = <T>( url: string, cb?: (res: T) => void ) => ( { status, data }: AxiosResponse<T>) => {
    console.log(status, url);
    if ( cb ) cb(data) 
}

const Requests = {
    get: <T>( prefix: string, path: string, params: any, cb?: (res: T) => void, err?: (res: T) => void, config?: AxiosRequestConfig<T> ) =>
    {
        const url = buildURL( prefix, path );
        return axios
            .get<T>( url, { ...config, params } )
            .then( responseHandler(url, cb) )
            .catch( responseHandler(url, err) )
    },

    post: <T>( prefix: string, path: string, data: FormData, config: AxiosRequestConfig<any>, cb?: (res: T) => void, err?: (res: T) => void ) =>
    {
        const url = buildURL( prefix, path );
        axios
            .post<T>( prefix + path, data, { ...config, headers: { "Content-Type": "multipart/form-data" } } )
            .then( responseHandler(url, cb) )
            .catch( responseHandler(url, err) )
    },

    downloadBlob: (blob: any, name: string) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        const id =  'download-link'
        link.setAttribute('id', id)
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
    }
}

export default Requests;
