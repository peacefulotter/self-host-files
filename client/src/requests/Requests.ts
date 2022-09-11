import axios,  { AxiosResponse } from "axios";

export default class Requests {
    prefix: string;

    constructor(prefix: string)
    {
        this.prefix = prefix;
    }
    
    get<T>( path: string, params: any, cb?: (res: T) => void, err?: (res: T) => void )
    {
        axios
            .get<T>( this.prefix + path, { params } )
            .then( ( { status, data } ) => {
                console.log(status, data);
                if ( status !== 200 && err ) err(data)
                else if ( cb ) cb(data) 
            } )
    }
}