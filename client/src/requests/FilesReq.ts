import axios from "axios";
import UploadingToast from "../swal/UploadingToast";
import Requests from "./Requests";

const prefix = '/files/';

const FilesRequests = 
{
    download: (tos: string[]) =>
    {
        Requests.get(
            prefix, 'download', { tos }, 
            (blob) => Requests.downloadBlob(blob, 'testtt.zip'), 
            console.error,
            'blob'
        )
    }
}  

export default FilesRequests;