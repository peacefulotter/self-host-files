import { FC } from "react";
import { FiPlus, FiUploadCloud, FiX } from "react-icons/fi";

import HeaderBtn from "./HeaderBtn";

import { UploadState } from "../../types";

interface IHeader {
    state: UploadState;
    addFiles: (e: any) => void;
    remFiles: (e: any) => void;
    uploadFiles: (e: any) => void;
}

const Header: FC<IHeader> = ( { state, addFiles, remFiles, uploadFiles } ) => {

    const disabled = !(state === 'loaded')

    return (
        <div className="flex items-center justify-between flex-wrap w-12/12 gap-2">
            <input className="inputfile" id="file" type="file" name="files[]" multiple onChange={addFiles} />
            <label htmlFor="file" className="btn-upload-green w-full">
                <FiPlus className="select-btn text-3xl"/>
            </label>
            <HeaderBtn icon={FiX} onClick={remFiles} className='btn-upload-red w-[47%]' disabled={disabled}/>
            <HeaderBtn icon={FiUploadCloud} onClick={uploadFiles} className='btn-upload-blue w-[47%]' disabled={disabled}/>
        </div>
    )
}

export default Header;