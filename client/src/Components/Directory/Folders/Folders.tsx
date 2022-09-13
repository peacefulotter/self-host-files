import { FC } from "react";

import AddFolderBtn from "./AddFolderBtn";
import RFolder from "./RFolder";

interface IFolders {
    folders: string[];
    setFolders: (newFolders: string[]) => void;
    path: string;
    selecting: boolean;
    toggleSelectFile: (i: number) => () => void;
}

const Folders: FC<IFolders> = ( { folders, setFolders, path, selecting, toggleSelectFile } ) => {

    const renameFolder = (i: number) => (newName: string) => {
        const temp = [...folders];
        temp[i] = newName;
        setFolders( temp )
    }

    const addFolder = (name: string) => setFolders( [...folders, name] )

    return (
        <>
        { folders.map( ( name, i) => 
            <RFolder key={`folder-${i}`} folders={folders} path={path} name={name} renameFolder={renameFolder(i)} selecting={selecting} toggleSelectFile={toggleSelectFile(i)} />
        ) }
        <AddFolderBtn folders={folders} addFolder={addFolder} path={path} />
        </>
    )
}

export default Folders;