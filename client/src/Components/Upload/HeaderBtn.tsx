import { FC } from "react";
import { IconType } from "react-icons";

interface IHeaderBtn {
    icon: IconType;
    color: string;
    disabled: boolean;
    onClick?: (e: any) => void;
}

const HeaderBtn: FC<IHeaderBtn> = ( { icon, color, disabled, onClick } ) => {
    const Icon = icon;
    return (
        <button 
            className={`w-8 h-8 rounded-full flex justify-center items-center cursor-pointer text-${color}-500 hover:text-${color}-600 disabled:text-gray-400`}
            disabled={disabled}
            style={{pointerEvents: disabled ? 'none' : 'auto'}}
            onClick={onClick}
        >
            <Icon className="select-btn cursor-pointer text-3xl"/>
        </button>
    )
}

export default HeaderBtn;