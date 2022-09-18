import { alertError, alertSuccess } from "../swal/swal";
import UploadingToast from "../swal/UploadingToast";
import Requests from "./Requests";

const prefix = '/file/';

const FileRequests = 
{
    upload: ( data: FormData, onUploadProgress: (e: ProgressEvent) => void, cb?: () => void, err?: () => void ) =>
    {
        Requests.post( 
            prefix, 'upload', data, { onUploadProgress }, 
            () => UploadingToast.complete().then( cb ),
            () => UploadingToast.error().then( err ) 
        )
    },

    download: (to: string, name: string) =>
    {
        fetch(to)
            .then( res => res.blob() )
            .then( blob => Requests.downloadBlob(blob, name) )
    },

    remove: (to: string, name: string) =>
    {
        Requests.get( 
            prefix, 'remove', { to }, 
            () => alertSuccess('Successfully removed ' + name),
            () => alertError('Failed to remove ' + name) 
        )
    }
}  

export default FileRequests;