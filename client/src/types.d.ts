import Requests from "./requests/useRequestsService";

export type UploadState = 'disabled' | 'loaded' | 'uploading' | 'complete' 

export interface FileOrFolder {
    name: string;
    selected: boolean;
    type: 'file' | 'folder'
}

export type Explorer = FileOrFolder[]