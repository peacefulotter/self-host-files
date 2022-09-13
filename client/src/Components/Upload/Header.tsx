import { FiPlus, FiUploadCloud, FiX } from "react-icons/fi";

import HeaderBtn from "./HeaderBtn";

import { UploadState } from "../../types";
import { FC } from "react";

interface IHeader {
    state: UploadState;
    addFiles: (e: any) => void;
    remFiles: () => void;
    uploadFiles: (e: any) => void;
}

const Header: FC<IHeader> = ( { state, addFiles, remFiles, uploadFiles } ) => {
    return (
        <div className="form-header">
            <input className="inputfile" id="file" type="file" name="files[]" multiple onChange={addFiles} />
            <label htmlFor="file" className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer text-green-500 hover:text-green-600">
                <FiPlus className="select-btn cursor-pointer text-3xl"/>
            </label>
            <HeaderBtn icon={FiX} onClick={remFiles} color='red' disabled={!(state === 'loaded')}/>
            <HeaderBtn icon={FiUploadCloud} onClick={uploadFiles} color='blue' disabled={!(state === 'loaded')}/>
        </div>
    )
}

export default Header;