import React from "react";
import useHover from "../../../Hooks/useHover";

interface ICheckbox {
  	onClick: (isChecked: boolean, e: React.MouseEvent<HTMLDivElement>) => void;
	className?: string;
    checkedClass?: string;
	forceState?: boolean;
    behaveAsButton?: boolean;
    style?: React.CSSProperties;
    children?: (isChecked: boolean, hover: boolean) => React.ReactNode; 
}

const Checkbox: React.FC<ICheckbox> = ({ forceState, className, checkedClass, style, behaveAsButton, onClick, children }) => {
  	
    const [isChecked, setChecked] = React.useState<boolean>(forceState || false)	
	const { hover, onMouseOver, onMouseOut } = useHover();

    React.useEffect( () => {
        if ( forceState === undefined ) return;
        setChecked( forceState )
    }, [forceState] )

  	return (
        <div 
            className={`${className} ${isChecked ? checkedClass : ''}`}
            style={style}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onMouseDown={() => behaveAsButton && setChecked(true)}
            onMouseUp={() => behaveAsButton && setChecked(false)}
            onClick={e => { 	
				const update = forceState !== undefined ? forceState : !isChecked;	
				onClick( update, e ); 
				!behaveAsButton && setChecked( update ); 
			}}
		>
			{ children && children(isChecked, hover) }
        </div>
  	);
};

export default Checkbox;