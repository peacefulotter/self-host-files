import { FC } from "react";
import AddFolderBtn from "./AddFolderBtn";
import RFolder from "./RFolder";

interface IFolders {
    folders: string[];
    setFolders: React.Dispatch<React.SetStateAction<string[]>>;
    path: string;
}

const Folders: FC<IFolders> = ( { folders, setFolders, path } ) => {

    const renameFolder = (i: number) => (newName: string) => {
        const temp = [...folders];
        temp[i] = newName;
        setFolders( temp )
    }

    const addFolder = (name: string) => setFolders( prev => [...prev, name] )

    return (
        <>
        { folders.map( ( name, i) => 
            <RFolder key={`folder-${i}`} path={path} name={name} renameFolder={renameFolder(i)} />
        ) }
        <AddFolderBtn folders={folders} addFolder={addFolder} path={path} />
        </>
    )
}

export default Folders;