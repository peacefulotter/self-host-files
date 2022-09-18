import { alertError, alertSuccess } from "../swal/swal";
import Requests from "./Requests";

const prefix = '/files/';

const FilesRequests = 
{
    download: (pathname: string, filenames: string[]) => {
        Requests.get(
            prefix, 'download', { pathname, filenames }, 
            (blob) => Requests.downloadBlob(blob, 'files.zip'), 
            () => alertError('Failed to prepare files to download'),
            { responseType: 'blob' }
        )
    },

    remove: (pathname: string, filenames: string[], cb: () => void ) => {
        Requests.get(
            prefix, 'remove', { pathname, filenames },
            () => { alertSuccess('Removed ' + filenames.length + ' files'); cb() },
            () => alertError('Failed to remove ' + filenames.length + ' files')
        )
    }
}  

export default FilesRequests;