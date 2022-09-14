import { FiPlus, FiUploadCloud, FiX } from "react-icons/fi";

import HeaderBtn from "./HeaderBtn";

import { UploadState } from "../../types";
import { FC } from "react";

interface IHeader {
    state: UploadState;
    addFiles: (e: any) => void;
    remFiles: (e: any) => void;
    uploadFiles: (e: any) => void;
}

const Header: FC<IHeader> = ( { state, addFiles, remFiles, uploadFiles } ) => {

    const disabled = !(state === 'loaded')

    return (
        <div className="form-header">
            <input className="inputfile" id="file" type="file" name="files[]" multiple onChange={addFiles} />
            <label htmlFor="file" className="btn-upload-green">
                <FiPlus className="select-btn text-3xl"/>
            </label>
            <HeaderBtn icon={FiX} onClick={remFiles} className='btn-upload-red' disabled={disabled}/>
            <HeaderBtn icon={FiUploadCloud} onClick={uploadFiles} className='btn-upload-blue' disabled={disabled}/>
        </div>
    )
}

export default Header;