import { FC } from "react";
import RFile from "./RFile";

interface IFiles {
    files: string[];
    path: string;
    selectedFiles: boolean[];
    selecting: boolean;
    toggleSelectFile: (i: number) => () => void;
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
                    isSelected={selectedFiles[i]} 
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