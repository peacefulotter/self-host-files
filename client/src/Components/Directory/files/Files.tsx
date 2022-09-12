import { FC } from "react";
import RFile from "./RFile";

interface IFiles {
    files: string[];
    path: string;
}

const Files: FC<IFiles> = ( { files, path } ) => {

    return (
        <>
        { files.length > 0 
            ? files.map( ( name, i ) => 
                <RFile key={`file-${i}`} path={path} name={name} />
            ) : <p className="m-auto mt-32 text-xl text-gray-500">this folder contains no files</p>
        }
        </>
    )
}

export default Files;