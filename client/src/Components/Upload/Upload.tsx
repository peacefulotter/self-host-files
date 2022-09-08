import axios from "axios";
import { useState } from "react";
import { FiPlus, FiUploadCloud, FiX } from "react-icons/fi";

import FileList from "./FileList";
import useToast from "./Toast";

import './index.css'

type States = 'disabled' | 'loaded' | 'uploading' | 'complete' 

const Upload = () => {
    const [files, setFiles] = useState<File[]>([]);
	const [state, setState] = useState<States>('disabled')
	const [progress, setProgress] = useState<number>(0)
	const { trigger, complete } = useToast()

	const handleUpload = (e: any) => {
		if ( files === undefined ) return;
		e.preventDefault();

		setState('uploading')
		setFiles([])
		trigger();

		const data = new FormData();
		files.forEach( file => data.append('file[]', file) )

		axios.post('/upload', data, {
			onUploadProgress: (e: ProgressEvent) => setProgress( (e.loaded / e.total) * 100 )
		} )
		.then( (res: any) => {
			console.log(res);
			complete().then( () => {
				setState('complete');
				setProgress(0)
			} )
		});
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
		<form className="upload-form" onSubmit={handleUpload}>
			<div className="form-header">
				<input className="inputfile" id="file" type="file" name="file" multiple onChange={addFiles} />
				<label htmlFor="file" className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer text-green-500 hover:text-green-600">
					<FiPlus className="select-btn cursor-pointer text-3xl"/>
				</label>
				<button className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer text-red-500 hover:text-red-600 disabled:text-gray-400" disabled={!(state === 'loaded')} onClick={remFiles}>
					<FiX className="select-btn cursor-pointer text-3xl"/>
				</button>
				<button className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer text-blue-500 hover:text-blue-600 disabled:text-gray-400" disabled={!(state === 'loaded')}>
					<FiUploadCloud className="select-btn cursor-pointer text-3xl"/>
				</button>
			</div>
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