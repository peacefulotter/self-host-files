import { FC } from "react";
import { IconBaseProps, IconType } from "react-icons";
import { FcAudioFile, FcDocument, FcFile, FcImageFile, FcVideoFile } from "react-icons/fc";

const EXTENSIONS_ICON = new Proxy<{ [key: string]: IconType }>( {
    'png|jpg|jpeg': FcImageFile,
    'txt|pdf': FcDocument,
    'mp3': FcAudioFile,
    'mp4': FcVideoFile,
}, {
    get: (target, property) => {
        for ( let k in target )
            if ( new RegExp(k).test(property as string) )
                return target[k]
        return FcFile
    }
} )

interface IFileIcon extends IconBaseProps {
    extension: string;
    size?: number;
}

const FileIcon: FC<IFileIcon> = ( { extension, size, ...props } ) => {
    const Icon = EXTENSIONS_ICON[extension]
    return <Icon style={size ? {fontSize: `${size}em`} : {}} {...props} />
}

export default FileIcon;