import { FC } from "react";

import AddFolderBtn from "./AddFolderBtn";
import RFolder from "./RFolder";

interface IFolders {
    folders: string[];
    addFolder: (name: string) => void;
    renameFolder: (i: number) => (newName: string) => void;
    path: string;
    selecting: boolean;
    toggleSelectFile: (i: number) => (name: string) => void;
}

const Folders: FC<IFolders> = ( { folders, addFolder, renameFolder, path, selecting, toggleSelectFile } ) => {
    return (
        <>
        { folders.map( ( name, i) => 
            <RFolder 
                key={`folder-${i}`} 
                folders={folders} 
                path={path} 
                name={name} 
                renameFolder={renameFolder(i)} 
                selecting={selecting} 
                toggleSelectFile={toggleSelectFile(i)} />
        ) }
        <AddFolderBtn 
            folders={folders} 
            addFolder={addFolder} 
            path={path} />
        </>
    )
}

export default Folders;