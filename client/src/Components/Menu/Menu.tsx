import { FC } from "react";
import { FiDownload, FiSquare } from "react-icons/fi";
import { IconType } from "react-icons/lib";

import PathBreadcrumb from "./PathBreadcrumb";

interface IBtn {
    icon: IconType;
    name: string;
}

const Btn: FC<IBtn> = ( { icon, name } ) => {
    const Icon = icon;
    return (
        <div className="flex items-center gap-2">
            <Icon className='text-xl'/>
            <p className='text-sm font-medium'>{ name }</p>
        </div>
    )
}

const Menu = () => {
    return (
        <div className="flex justify-between items-center mt-16 mx-32 mb-8">
            <PathBreadcrumb />
            <div className='flex items-center gap-8'>
                <Btn icon={FiDownload} name='Download' />
                <Btn icon={FiSquare} name='Select' />
            </div>
        </div>
        
    )
}

export default Menu;