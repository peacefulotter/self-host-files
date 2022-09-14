import { alertError, alertSuccess } from "../swal/swal";
import Requests from "./Requests";

const prefix = '/files/';

const FilesRequests = 
{
    download: (tos: string[], cb: () => void) =>
    {
        Requests.get(
            prefix, 'download', { tos }, 
            (blob) => {
                Requests.downloadBlob(blob, 'files.zip')
                cb()
            }, 
            () => {
                alertError('Failed to prepare files to download')
                cb()
            },
            { responseType: 'blob' }
        )
    }
}  

export default FilesRequests;