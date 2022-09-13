import { FC } from "react";
import { IconType } from "react-icons";

import Checkbox from "./Checkbox";

interface IMenuCheckbox {
    icon: IconType;
    name: string;
    onClick: (isChecked: boolean) => void;
}

const MenuCheckbox: FC<IMenuCheckbox> = ( { icon, name, onClick } ) => {
    const Icon = icon;
    return (
        <Checkbox 
            className="flex items-center gap-2 rounded cursor-pointer rounded bg-palette-b-100 hover:bg-palette-b-200 p-2 px-4 transition-colors" 
            checkedClass="bg-palette-a-600 hover:bg-palette-a-700"
            onClick={onClick}
        >
            { (isChecked: boolean) => 
            <>
                <Icon className={`text-xl text-palette-a-700 transition-colors ${isChecked && 'text-palette-b-200'}`}/>
                <p className={`text-sm font-medium text-palette-a-700 transition-colors ${isChecked && 'text-palette-b-200'}`}>{name}</p>
            </> 
            }
        </Checkbox>
    )
}

export default MenuCheckbox;