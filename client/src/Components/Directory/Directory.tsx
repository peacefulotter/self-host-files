import { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Explorer from "./Explorer";
import Menu from "./Menu/Menu";

import useSelectMode, { UNSELECTED } from "../../Hooks/useSelectMode";
import { DirectoryContent } from "../../types";

import './index.css'

interface IDirectory {
    uploadedFiles: string[];
    clearUploadedFiles: () => void;
}

const Directory: FC<IDirectory> = ( { uploadedFiles, clearUploadedFiles } ) => {

    const [directory, setDirectory] = useState<DirectoryContent>({
        folders: [],
        files: []
    });

    const { selecting, selectedFiles, menuFunctions, toggleSelectFile } = useSelectMode(directory, (selectedFiles) => {
        const temp = { ...directory }
        temp.files = directory.files.filter( (f, i) => selectedFiles[i] === UNSELECTED )
        console.log(directory.files, temp.files, selectedFiles);
        
        setDirectory(temp)
    })

    useEffect( () => {
        if ( uploadedFiles.length === 0 ) return;
        const temp = { ...directory }
        temp['files'] = [...directory['files'], ...uploadedFiles].sort()
        setDirectory(temp);
        clearUploadedFiles()
    }, [uploadedFiles] )

    const someAreSelected = selecting && selectedFiles.filter(f => f !== UNSELECTED).length > 0

    return (
        <div className="directories-wrapper">
            <Menu someAreSelected={someAreSelected} {...menuFunctions} />
            <Routes>
                <Route path="*" element={
                    <Explorer 
                        directory={directory}
                        setDirectory={setDirectory}
                        selecting={selecting}
                        selectedFiles={selectedFiles}
                        toggleSelectFile={toggleSelectFile} />
                } />
            </Routes>
        </div>
    )
}

export default Directory;