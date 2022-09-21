import { Route, Routes } from "react-router-dom";

import Explorer from "./Explorer";
import Menu from "./Menu/Menu";

import './index.css'

const Directory = () => {
    return (
        <div className="directories-wrapper">
            <Menu />
            <Routes>
                <Route path="*" element={<Explorer />} />
            </Routes>
        </div>
    )
}

export default Directory;