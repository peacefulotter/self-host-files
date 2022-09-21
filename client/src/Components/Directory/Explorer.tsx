

import RFolder from './Folders/RFolder';
import RFile from './Files/RFile';
import AddFolderBtn from './Folders/AddFolderBtn';

import { useExplorerCtx } from '../../context/ExplorerCtx';
import { FileOrFolder } from '../../types';
import { useMemo } from 'react';

interface FileOrFolderWithIndex extends FileOrFolder { i: number; }

const Explorer = () => {

    const { explorer, renameFolder, toggleSelectExplorer } = useExplorerCtx();

    // FIXME: useMemo??
    const [files, folders] = useMemo( () => explorer.reduce( (acc, cur, i) => {
        acc[cur.type === 'file' ? 0 : 1].push({...cur, i});
        return acc;
    }, [[], []] as [FileOrFolderWithIndex[], FileOrFolderWithIndex[]]), [explorer] )

    // FIXME: pass i or functions??
    return (
        <div className="directories">
            { folders.map( (folder, i) => 
                <RFolder 
                    key={`folder-${i}`} 
                    folders={folders} 
                    folder={folder} 
                    renameFolder={renameFolder(folder.i)} 
                    toggleSelect={toggleSelectExplorer(folder.i)} />
            ) }
            <AddFolderBtn />

            <div className='w-full' />
            
            { files.length > 0 
                ? files.map( ( file, i ) => 
                    <RFile 
                        key={`file-${i}`} 
                        file={file} 
                        i={file.i} />
                ) 
                : <p className="m-auto mt-32 text-xl text-gray-500">
                    this folder contains no files
                </p>
            }
        </div>
    )
}

export default Explorer;