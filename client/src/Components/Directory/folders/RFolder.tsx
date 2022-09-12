
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { FcFolder } from 'react-icons/fc'
import { Link } from 'react-router-dom';

import { alertError, alertWarning } from '../../../swal/swal';
import FolderRequests from '../../../requests/FolderReq';

interface IFolder {
    folders: string[];
    path: string;
    name: string;
    renameFolder: (newName: string) => void;
}

const catchEnter = ( e: KeyboardEvent<HTMLInputElement> ) => {
    if ( e.key !== 'Enter') return false;
    e.preventDefault();
    e.stopPropagation();
    return true;
}

const RFolder: FC<IFolder> = ( { folders, path, name, renameFolder } ) => {

    const [editing, setEditing] = useState<boolean>(false);
    const [editName, setEditName] = useState<string>(name);

    useEffect( () => {
        setEditName(name)
    }, [name] )

    const onFocus = () => setEditing(true)
    const onBlur = () => {
        setEditing(false)
        if ( editName === name ) return;
        else if ( editName.length === 0 ) return setEditName(name)
        else if ( folders.includes(editName) )
        {
            alertWarning( 'Folder name already used' )
            return setEditName(name)
        }
        FolderRequests.rename(
            path, name, editName, 
            () => renameFolder(editName),
            () => {
                setEditName(name)
                alertError( 'Renaming folder failed' )
            }
        ) 
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setEditName(e.target.value)

    const onKeyDown = catchEnter;
    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => { 
        if ( !catchEnter(e) ) return;
        (e.target as any).blur()
        console.log('enter key');
    }

    const padding = 1.3
    const width = (editName.length > 0 ? editName.length : name.length) + padding

    return (
        <Link 
            to={path + name + '/'} 
            className="repo-elt repo-elt-folder"
            style={{pointerEvents: editing ? 'none' : 'auto'}}
        >
            <FcFolder className='repo-icon'/>
            <input 
                type='text'
                className="bg-transparent p-1 font-mono text-sm rounded-sm focus:ring-gray-500 border-transparent" 
                style={{width: width + "ch"}}
                placeholder={name} 
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange} 
                onKeyUp={onKeyUp}
                onKeyDown={onKeyDown}
                value={editName} />
        </Link>
    )
}

export default RFolder;