import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import FileList from "./FileList";
import Header from "./Header";

import { useExplorerCtx } from "../../context/ExplorerCtx";
import UploadingToast from "../../swal/UploadingToast";
import { UploadState } from "../../types";

import './index.css'

const Upload = () => {
	const [opened, setOpened] = useState<boolean>(false)
    const [files, setFiles] = useState<File[]>([]);
	const [state, setState] = useState<UploadState>('disabled')
	const [progress, setProgress] = useState<number>(0)

	const { upload } = useExplorerCtx();

	const uploadFiles = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		setState('uploading')
		UploadingToast.uploading();

		upload(
			files, 
			( { loaded, total }: ProgressEvent ) => setProgress( (loaded / total) * 100 ),
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

	const remFiles = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setFiles([])
		setState('disabled')
	}

	const toggleOpen = () => setOpened(prev => !prev )

	const BurgerIcon = opened ? FiChevronLeft : FiChevronRight 

    return (
		<>
		<form className="relative flex flex-col items-center gap-3 p-4 bg-gray-100 transition-transform shadow-md" style={{transform: opened ? '' : 'translateX(-100%)'}}>
			<div className="absolute p-3 ml-auto top-0 right-0 translate-x-full bg-gray-100 hover:bg-gray-200 rounded cursor-pointer transition-colors">
				<BurgerIcon className="text-3xl text-gray-400" onClick={toggleOpen} />
			</div>
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