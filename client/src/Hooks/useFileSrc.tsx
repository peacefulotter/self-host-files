import { useEffect, useState } from "react";

const useFileSrc = ( file: File ) => {

    const [src, setSrc] = useState<string>();
    
    useEffect( () => {
        const reader = new FileReader();
        reader.onload = () => {
            const src = reader.result as string;
            if ( !src.startsWith('data:image') ) return;
            setSrc( src );
        }
        reader.readAsDataURL(file);
    }, [file] )

    return src;
}

export default useFileSrc;