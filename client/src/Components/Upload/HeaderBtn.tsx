import { FC } from "react";
import { IconType } from "react-icons";

interface IHeaderBtn {
    icon: IconType;
    className: string;
    disabled: boolean;
    onClick?: (e: any) => void;
}

const HeaderBtn: FC<IHeaderBtn> = ( { icon, className, disabled, onClick } ) => {
    const Icon = icon;

    return (
        <button 
            className={className}
            disabled={disabled}
            onClick={onClick}
        >
            <Icon className="select-btn text-3xl"/>
        </button>
    )
}

export default HeaderBtn;