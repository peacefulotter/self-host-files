
export type BtnColor = 'pink' | 'purple' | 'blue' | 'cyan' | 'green' | 'red' | 'orange' | 'yellow';

interface BtnStyle {
    base: string;
    checked: string;
    icon: string;
    p: string;
    childrenCheck: (isChecked: boolean) => string; 
}

const getStyle = (color: string): BtnStyle => {
    const hoverBgLow = `hover:bg-${color}-200`
    const bgMid = `bg-${color}-500`
    const hoverBgMid = `hover:bg-${color}-400`
    const textLow = `text-${color}-200`
    const strokeLow = `stroke-${color}-200`
    const groupStrokeHigh = `group-hover:stroke-${color}-700`
    const groupTextHigh = `group-hover:text-${color}-700`
    return {
        base: `btn group relative ${textLow} ${hoverBgLow}`,
        checked: `${textLow} ${bgMid} ${hoverBgMid}`,
        icon: `btn-icon ${groupStrokeHigh}`,
        p: `btn-text ${groupTextHigh}`,
        childrenCheck: isChecked => isChecked ? `${strokeLow} ${textLow}` : ''
    }
}

const colors: BtnColor[] = ['pink', 'purple', 'blue', 'cyan', 'green', 'red', 'orange', 'yellow']

const styles: Record<string, BtnStyle> = colors.reduce( (acc, cur) => ({ ...acc, [cur]: getStyle(cur) }), {} )

export default styles;