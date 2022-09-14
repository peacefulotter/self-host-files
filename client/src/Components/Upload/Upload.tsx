import React, { FC, useState } from "react";
import { useLocation } from "react-router-dom";

import FileList from "./FileList";
import Header from "./Header";

import FileRequests from "../../requests/FileReq";
import UploadingToast from "../../swal/UploadingToast";
import { UploadState } from "../../types";

import './index.css'

interface IUpload {
	newUploadedFiles: (files: string[]) => void;
}

const Upload: FC<IUpload> = ( { newUploadedFiles } ) => {
    const [files, setFiles] = useState<File[]>([]);
	const [state, setState] = useState<UploadState>('disabled')
	const [progress, setProgress] = useState<number>(0)

	const { pathname } = useLocation()

	const uploadFiles = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		setState('uploading')
		UploadingToast.uploading();

		const data = new FormData();
		data.append('pathname', pathname)
		files.forEach( file => data.append('files[]', file, file.name) )

		// TODO: return the files that have succesfully been imported
		FileRequests.upload( data, 
			( { loaded, total } ) => setProgress( (loaded / total) * 100 ), 
			() => { 
				newUploadedFiles( files.map( f => f.name ) )
				setFiles([]);
				setState('complete');
				setProgress(0);
			},
			() => {
				setState('loaded');
				setProgress(0);
			}
		)
	}

	const addFiles = (e: any) => {
		setFiles(prev => [...prev, ...e.target.files]);
		setState('loaded')
	}

	const remFile = (i: number) => {
		if ( files === undefined ) return
		const temp = [...files]
		temp.splice(i, 1)
		setFiles( temp );
		if ( temp.length === 0 )
			setState('disabled')
	}

	const remFiles = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setFiles([])
		setState('disabled')
	}

    return (
		<>
		<form className="upload-form">
			<Header state={state} addFiles={addFiles} remFiles={remFiles} uploadFiles={uploadFiles} />
			<FileList files={files} remFile={remFile}/>
		</form>

		<div className="progress-wrapper shadow-md" style={{height: state === 'uploading' ? '110px' : '0px'}}>
			<div className="progress-container" id="progress">
				<div className="upload-progress" style={{width: `${progress}%`}}></div>
			</div>
		</div>
		</>
    )
}

export default Upload;