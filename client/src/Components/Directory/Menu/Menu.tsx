import { FC } from "react";
import { FiDownload, FiPlusSquare } from "react-icons/fi";

import MenuCheckbox from "./MenuCheckbox";
import PathBreadcrumb from "./PathBreadcrumb";

interface IMenu {
    downloadSelected: () => void;
    toggleSelecting: () => void;
}

const Menu: FC<IMenu> = ( { downloadSelected, toggleSelecting } ) => {
    return (
        <div className="flex justify-between items-center mt-16 mx-32 mb-8">
            <PathBreadcrumb />
            <div className='flex items-center gap-4'>
                <MenuCheckbox icon={FiDownload} name='Download' onClick={downloadSelected} />
                <MenuCheckbox icon={FiPlusSquare} name='Select' onClick={toggleSelecting} />
            </div>
        </div>
        
    )
}

export default Menu;