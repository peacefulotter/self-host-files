import { FC } from "react";
import { FiDownload, FiPlusSquare, FiTrash2, FiX } from "react-icons/fi";

import MenuCheckbox from "./MenuCheckbox";
import PathBreadcrumb from "./PathBreadcrumb";

interface IMenu {
    someAreSelected: boolean;
    removeSelected: () => void;
    downloadSelected: () => void;
    toggleSelecting: () => void;
}

const Menu: FC<IMenu> = ( { someAreSelected, removeSelected, downloadSelected, toggleSelecting } ) => {
    return (
        <div className="flex justify-between items-center mt-16 mx-32 mb-8">
            <PathBreadcrumb />
            <div className='flex items-center gap-4'>
                { someAreSelected && <MenuCheckbox Icon={FiTrash2} color='red' name='Remove' onClick={removeSelected} behaveAsButton={true} /> }
                { someAreSelected && <MenuCheckbox Icon={FiDownload} color='blue' name='Download' onClick={downloadSelected} behaveAsButton={true} /> }
                <MenuCheckbox Icon={FiPlusSquare} color='purple' name='Select' onClick={toggleSelecting} />
            </div>
        </div>
        
    )
}

export default Menu;