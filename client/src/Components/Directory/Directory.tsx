import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Explorer from "./Explorer";
import Menu from "./Menu/Menu";

import useSelectMode from "../../Hooks/useSelectMode";
import { DirectoryContent } from "../../types";

import './index.css'

const Directory = () => {

    const [directory, setDirectory] = useState<DirectoryContent>({
        folders: [],
        files: []
    });

    const { selecting, selectedFiles, downloadSelected, toggleSelecting, toggleSelectFile } = useSelectMode(directory)

    return (
        <div className="directories-wrapper">
            <Menu downloadSelected={downloadSelected} toggleSelecting={toggleSelecting} />
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