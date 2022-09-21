
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { FcFolder } from 'react-icons/fc'
import { Link, useLocation } from 'react-router-dom';
import { useExplorerCtx } from '../../../context/ExplorerCtx';

import { alertError, alertWarning } from '../../../swal/swal';
import { FileOrFolder } from '../../../types';

interface IFolder {
    folders: FileOrFolder[];
    folder: FileOrFolder;
    renameFolder: (newName: string, err: () => void) => void;
    toggleSelect: () => void;
}

const catchEnter = ( e: KeyboardEvent<HTMLInputElement> ) => {
    if ( e.key !== 'Enter') return false;
    e.preventDefault();
    e.stopPropagation();
    return true;
}

const RFolder: FC<IFolder> = ( { folders, folder, renameFolder, toggleSelect } ) => {

    const { name, selected } = folder;
    const { pathname } = useLocation()
    const { isSelecting } = useExplorerCtx();

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
        else if ( folders.some( f => f.name === editName ) )
        {
            alertWarning( 'Folder name already used' )
            return setEditName(name)
        }

        renameFolder( editName, () => setEditName(name) )
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
            to={isSelecting ? '' : pathname + name + '/'} 
            className="repo-elt repo-elt-folder animate-fade-in"
            style={{pointerEvents: editing ? 'none' : 'auto'}}
            onClick={() => isSelecting && toggleSelect()}
        >
            <FcFolder className='repo-icon'/>
            <input 
                type='text'
                className="bg-transparent p-1 font-mono font-bold text-xs rounded-sm focus:ring-gray-500 border-transparent" 
                style={{width: width + "ch", maxWidth: '105%'}}
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