import React, { FC } from "react";
import { IconType } from "react-icons";

interface IFileBtn {
    className: string;
    iconClassName: string;
    Icon: IconType;
    display: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const FileBtn: FC<IFileBtn> = ( { className, iconClassName, Icon, display, onClick } ) => {
    if ( !display ) return null;

    return (
        <div 
            className={`absolute p-1 transition-colors rounded shadow animate-fade-in ${className}`}
            onClick={onClick}
        >
            <Icon className={`text-2xl ${iconClassName}`} />
        </div> 
    )
}

export default FileBtn;