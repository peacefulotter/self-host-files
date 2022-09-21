import { FC } from "react";
import { FiDownload, FiPlusSquare, FiTrash2 } from "react-icons/fi";
import { useExplorerCtx } from "../../../context/ExplorerCtx";

import MenuCheckbox from "./MenuCheckbox";
import PathBreadcrumb from "./PathBreadcrumb";

interface IMenu {
}

const Menu: FC<IMenu> = () => {

    const { isSelecting, explorer, removeSelected, downloadSelected, toggleSelect } = useExplorerCtx();

    const someAreSelected = isSelecting && explorer.some( v => v.selected );

    return (
        <div className="flex justify-between items-center mt-16 mx-32 mb-8">
            <PathBreadcrumb />
            <div className='flex items-center gap-4'>
                { someAreSelected && <MenuCheckbox Icon={FiTrash2} color='red' name='Remove' onClick={removeSelected} behaveAsButton={true} /> }
                { someAreSelected && <MenuCheckbox Icon={FiDownload} color='blue' name='Download' onClick={downloadSelected} behaveAsButton={true} /> }
                <MenuCheckbox Icon={FiPlusSquare} color='purple' name='Select' onClick={toggleSelect} />
            </div>
        </div>
        
    )
}

export default Menu;