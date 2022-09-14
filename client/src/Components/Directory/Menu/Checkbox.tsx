import React from "react";

interface ICheckbox {
  	onClick: (isChecked: boolean, e: React.MouseEvent<HTMLDivElement>) => void;
	className?: string;
    checkedClass?: string;
	forceState?: boolean;
    style?: React.CSSProperties;
    children?: (isChecked: boolean) => React.ReactNode; 
}

const Checkbox: React.FC<ICheckbox> = ( { forceState, className, checkedClass, style, onClick, children } ) => {
  	
    const [ isChecked, setChecked ] = React.useState<boolean>(forceState || false)	
	
    React.useEffect( () => {
        if ( forceState === undefined ) return;
        setChecked( forceState )
    }, [forceState] )

  	return (
        <div 
            className={`${className} ${isChecked ? checkedClass : ''}`}
            style={style}
            onClick={(e) => { 	
				const update = !isChecked;								
				onClick( update, e ); 
				setChecked( update ); 
			}}
		>
			{ children && children(isChecked) }
        </div>
  	);
};

export default Checkbox;