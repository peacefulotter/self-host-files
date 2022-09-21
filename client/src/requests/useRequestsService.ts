import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const proxy = {
    host: 'localhost',
    port: 3001
}

const formHeader = { "Content-Type": "multipart/form-data" }

export default (prefix: string) => { 

    const buildURL = (prefix: string, path: string) => 'http://localhost:3001' + prefix + path

    const responseHandler = <T>( url: string, cb?: (res: T) => void ) => ( { status, data }: AxiosResponse<T>) => {
        console.log(status, url);
        if ( cb ) cb(data) 
    }

    const get = <T>( path: string, params: any, cb?: (res: T) => void, err?: (res: T) => void, config?: AxiosRequestConfig<T> ) =>
    {
        const url = buildURL( prefix, path );
        return axios
            .get<T>( url, { ...config, params, proxy } )
            .then( responseHandler(url, cb) )
            .catch( responseHandler(url, err) )
    }

    const post = <T>( path: string, data: FormData, config: AxiosRequestConfig<any>, cb?: (res: T) => void, err?: (res: T) => void ) =>
    {
        const url = buildURL( prefix, path );
        axios
            .post<T>( url, data, { ...config, headers: formHeader, proxy } )
            .then( responseHandler(url, cb) )
            .catch( responseHandler(url, err) )
    }

    const downloadBlob = (blob: any) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        const id =  'download-link'
        link.setAttribute('id', id)
        link.setAttribute("download", 'files.zip');
        document.body.appendChild(link);
        link.click();
    }

    return { get, post, downloadBlob }
}