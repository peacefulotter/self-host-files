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
            ) : <p className="m-32 text-xl">This folder contains no files</p>
        }
        </>
    )
}

export default Files;