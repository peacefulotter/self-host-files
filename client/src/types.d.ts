
export type UploadState = 'disabled' | 'loaded' | 'uploading' | 'complete' 

export interface DirectoryContent {
    folders: string[];
    files: string[];
}