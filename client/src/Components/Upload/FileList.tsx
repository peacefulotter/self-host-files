import { FC } from "react";
import { HiOutlineX } from "react-icons/hi";
import FileIcon from "../FileIcon";
import FileImg from "./FileImg";

interface IFileList {
    files: File[] | undefined;
    remFile: (i: number) => void;
}

const FileElt = ( { index, file, remFile }: { index: number, file: File, remFile: (i: number) => void } ) => {
    return (
        <div className="file-row">
            <FileIcon extension={file.name} size={2} />
            <div className="text-sm font-medium overflow-ellipsis whitespace-nowrap overflow-hidden" style={{color: '#333', maxWidth: '13vw'}}>
                {file.name}
            </div>
            <HiOutlineX type="button" className="ml-auto cursor-pointer text-gray-500 hover:text-gray-800 hover:text-lg" onClick={() => remFile(index)} />
        </div>
    )
}

const FileList: FC<IFileList> = ( { files, remFile } ) => {
    if ( files === undefined )
        return <div className='text-normal text-base text-gray-600'>No file selected</div>
    
    return (
        <div className="file-list">
            { files.map( (file, i) => 
                <FileElt key={`filename-${i}`} index={i} file={file} remFile={remFile} />
            ) }
        </div>
    ) 
}

export default FileList;