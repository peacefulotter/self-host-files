import { FC } from "react";
import colors from 'tailwindcss/colors'
import { IconType } from "react-icons";

import Checkbox from "./Checkbox";

import styles, { BtnColor } from "../../../tailwind";

interface IMenuCheckbox {
    Icon: IconType;
    name: string;
    color: BtnColor;
    onClick: (isChecked: boolean) => void;
    behaveAsButton?: boolean;
}

const MenuCheckbox: FC<IMenuCheckbox> = ( { Icon, name, color, onClick, behaveAsButton } ) => {
    
    const style = styles[color];

    return (
        <Checkbox 
            className={style.base} 
            checkedClass={style.checked}
            onClick={onClick}
            behaveAsButton={behaveAsButton}
        >
            { (isChecked, hover) => <>
                <Icon className={style.icon + ' ' + style.childrenCheck(isChecked)} />
                { false && hover && <p className={style.p}>{name}</p> }
            </>}
            
        </Checkbox>
    )
}

export default MenuCheckbox;