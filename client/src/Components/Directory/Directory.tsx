import { Route, Routes } from "react-router-dom";

import Explorer from "./Explorer";
import Menu from "./Menu/Menu";

import './index.css'

const Directory = () => {
    return (
        <div className="w-full">
            <Menu />
            <Routes>
                <Route path="*" element={<Explorer />} />
            </Routes>
        </div>
    )
}

export default Directory;