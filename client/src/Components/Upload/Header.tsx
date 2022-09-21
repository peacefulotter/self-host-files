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
        <div className="flex items-center justify-between flex-wrap w-full gap-2">
            <input className="inputfile" id="file" type="file" name="files[]" multiple onChange={addFiles} />
            <label htmlFor="file" className="btn-upload-green w-[30%]">
                <FiPlus className="select-btn text-8xl"/>
            </label>
            <HeaderBtn icon={FiX} onClick={remFiles} className='btn-upload-red w-[30%]' disabled={disabled}/>
            <HeaderBtn icon={FiUploadCloud} onClick={uploadFiles} className='btn-upload-blue w-[30%]' disabled={disabled}/>
        </div>
    )
}

export default Header;