import { FC } from "react";
import { UNSELECTED } from "../../../Hooks/useSelectMode";
import RFile from "./RFile";

interface IFiles {
    files: string[];
    path: string;
    selecting: boolean;
    selectedFiles: (string | undefined)[];
    toggleSelectFile: (i: number) => (name: string) => void;
}

const Files: FC<IFiles> = ( { files, path, selectedFiles, selecting, toggleSelectFile } ) => {
    return (
        <>
        { files.length > 0 
            ? files.map( ( name, i ) => 
                <RFile 
                    key={`file-${i}`} 
                    path={path} 
                    name={name} 
                    selecting={selecting} 
                    isSelected={selectedFiles[i] !== UNSELECTED} 
                    toggleSelectFile={toggleSelectFile(i)}  />
            ) 
            : <p className="m-auto mt-32 text-xl text-gray-500">
                this folder contains no files
            </p>
        }
        </>
    )
}

export default Files;