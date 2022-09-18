import { useState } from "react";


const useHover = () => {
    const [hover, setHover] = useState<boolean>(false);
    const onMouseOver = () => setHover(true);
    const onMouseOut = () => setHover(false)
    return { hover, onMouseOver, onMouseOut }
}

export default useHover;