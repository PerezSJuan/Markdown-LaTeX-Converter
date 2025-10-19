const horizontalSpace = (options) => {
    if (options.spaceBetweenElements === 'small') return `\\smallskip\n`;
    else if (options.spaceBetweenElements === 'medium') return `\\medskip\n`;
    else if (options.spaceBetweenElements === 'big') return `\\bigskip\n`;
    else return `\\medskip\n`; //default
};

export default horizontalSpace;