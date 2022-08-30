import axios from "axios";
import { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { RiUploadCloud2Line } from "react-icons/ri";

import FileList from "./FileList";

import './index.css'

type States = 'disabled' | 'loaded' | 'uploading' | 'complete' 

const btnTexts: Record<States, string> = {
	'disabled': 'Upload',
	'loaded': 'Upload',
	'uploading': 'Uploading...',
	'complete': 'Complete!'
}

const Upload = () => {
    const [files, setFiles] = useState<File[]>();
	const [state, setState] = useState<States>('disabled')
	const [progress, setProgress] = useState(0); 

	const handleUpload = (e: any) => {
		if ( files === undefined ) return;

		e.preventDefault();
		setState('uploading')
		const data = new FormData();
		files.forEach( file => data.append('file[]', file) )

		axios.post('/upload', data, {
			onUploadProgress: (e: ProgressEvent) => setProgress( (e.loaded / e.total) * 100 )
		} )
		.then( (res: any) => {
			console.log(res);
			setState('complete');
			setFiles(undefined)
		});
	}

	const handleFileChange = (e: any) => {
		setProgress(0)
		setFiles([...e.target.files]);
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

    return (
		<form className="upload-form" onSubmit={handleUpload}>
			<div className="form-header">
				<input className="inputfile" id="file" type="file" name="file" multiple onChange={handleFileChange} />
				<label htmlFor="file"><HiOutlineUpload className="select-btn"/></label>
				<button className={`upload-btn ${state === 'complete' ? 'upload-btn-complete' : ''}`} disabled={!(state === 'loaded')}>
					<div className="upload-btn-progress" style={{width: `${progress}%`}}></div>
					<span className='upload-btn-text'>{btnTexts[state]}{state === 'loaded' ? <RiUploadCloud2Line /> : null}</span>
				</button>
			</div>
			<FileList files={files} remFile={remFile}/>
		</form>
    )
}

export default Upload;