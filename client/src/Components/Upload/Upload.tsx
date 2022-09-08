import axios from "axios";
import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
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
    const [files, setFiles] = useState<File[]>([]);
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
			setFiles([])
		});
	}

	const addFiles = (e: any) => {
		setProgress(0)
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
		<form className="upload-form" onSubmit={handleUpload}>
			<div className="form-header">
				<input className="inputfile" id="file" type="file" name="file" multiple onChange={addFiles} />
				<label htmlFor="file" className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer bg-green-500">
					<FiPlus className="select-btn cursor-pointer text-2xl"/>
				</label>
				{ files.length > 0
					? <div className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer bg-red-500" onClick={remFiles}>
						<FiX className="select-btn cursor-pointer text-2xl"/>
					</div>
					: null
				}
				<button className={`btn upload-btn ${state === 'complete' ? 'upload-btn-complete' : ''}`} disabled={!(state === 'loaded')}>
					<div className="upload-btn-progress" style={{width: `${progress}%`}}></div>
					<span className='upload-btn-text'>{btnTexts[state]}{state === 'loaded' ? <RiUploadCloud2Line /> : null}</span>
				</button>
			</div>
			<FileList files={files} remFile={remFile}/>
		</form>
    )
}

export default Upload;