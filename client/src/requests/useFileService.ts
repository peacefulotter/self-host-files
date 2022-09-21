
import RequestsService from "./useRequestsService";

import { alertError, alertSuccess } from "../swal/swal";
import UploadingToast from "../swal/UploadingToast";

import { Explorer, FileOrFolder } from "../types";
import useRequestsService from "./useRequestsService";

interface Args {
    pathname: string;
    files: FileOrFolder[];
    folders: FileOrFolder[];
}

export default () => {  
    
    const service = useRequestsService('/file/');

    const upload = (data: FormData, onUploadProgress: (e: ProgressEvent) => void, cb?: () => void, err?: () => void) => {
        service.post( 'upload', data, { onUploadProgress }, 
            () => UploadingToast.complete().then( cb ),
            () => UploadingToast.error().then( err ) 
        )
    }

    const downloadOne = (pathname: string) => (name: string) =>
        fetch(pathname + name)
            .then( res => res.blob() )
            .then( service.downloadBlob )

    const removeOne = (pathname: string, cb: (name: string) => void) => (name: string) => {
        service.get( 'remove/one', { pathname, name }, 
            () => cb(name),
            () => alertError('Failed to remove ' + name) 
        )
    }

    const downloadMany = (pathname: string, explorer: Explorer) => () => { 
        service.get( 'download/many', { pathname, explorer }, service.downloadBlob, 
            () => alertError('Failed to prepare files to download'),
            { responseType: 'blob' }
        )
    }

    const removeSelected = (pathname: string, explorer: Explorer, cb: () => void) => () => {
        service.get( 'remove/selected', { pathname, explorer }, 
            cb, 
            () => alertError('Failed to remove files') 
        )
    }

    return { upload, downloadOne, downloadMany, removeOne, removeSelected }
}  