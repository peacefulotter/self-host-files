import { ChangeEvent, useCallback, useState } from "react";

import FileList from "./FileList";
import Header from "./Header";

import FileRequests from "../../requests/FileReq";
import UploadingToast from "../../swal/UploadingToast";
import { UploadState } from "../../types";

import './index.css'

const Upload = () => {
    const [files, setFiles] = useState<File[]>([]);
	const [state, setState] = useState<UploadState>('disabled')
	const [progress, setProgress] = useState<number>(0)

	const uploadFiles = (e: any) => {
		e.preventDefault();

		setState('uploading')
		UploadingToast.uploading();

		const data = new FormData();
		files.forEach( file => data.append('files[]', file) )

		FileRequests.upload( data, 
			( { loaded, total } ) => setProgress( (loaded / total) * 100 ), 
			() => { 
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

	const remFiles = () => {
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