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
            .then( blob => {
                console.log(blob);
                Requests.downloadBlob(blob, name)
            } )
    }
}  

export default FileRequests;