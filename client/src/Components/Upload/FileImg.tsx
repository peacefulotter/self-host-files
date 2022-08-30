import { FcImageFile } from "react-icons/fc";
import useFileSrc from "../../Hooks/useFileSrc";

const FileImg = ( { file }: { file: File } ) => {

    const src = useFileSrc(file)

    return src === undefined
        ? <FcImageFile className="toast-img" style={{fontSize: '3em'}}/>
        : <img className="toast-img" src={src}></img>;
}

export default FileImg;