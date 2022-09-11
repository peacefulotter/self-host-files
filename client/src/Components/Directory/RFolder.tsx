
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { FcFolder } from 'react-icons/fc'
import { Link } from 'react-router-dom';
import { FolderRequests } from '../../requests/FolderReq';
import fire from '../../swal/swal';

interface IFolder {
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

const RFolder: FC<IFolder> = ( { path, name, renameFolder } ) => {

    const [editing, setEditing] = useState<boolean>(false);
    const [editName, setEditName] = useState<string>(name);

    const onFocus = () => setEditing(true)
    const onBlur = () => {
        setEditing(false)
        if ( editName === name ) return;
        console.log(path, name, editName);
        new FolderRequests().rename(
            path, name, editName, 
            () => renameFolder(editName),
            () => fire( { title: 'Renaming folder failed', icon: 'error' } )
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
    const width = editName.length > 0 ? (editName.length + padding) : name.length

    return (
        <Link 
            to={path + '/' + name} 
            className="repo-elt repo-elt-folder"
            style={{pointerEvents: editing ? 'none' : 'auto'}}
        >
            <FcFolder className='repo-icon'/>
            <input 
                type='text'
                className="bg-transparent p-1 rounded-sm focus:ring-gray-500 border-transparent" 
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