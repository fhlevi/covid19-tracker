export const toNumber = (val) => {
    return formatNumber(Number(val))
}
export const formatNumber = (amount, decimalCount = 2, decimal = ",", thousands = ".") => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    
        const negativeSign = amount < 0 ? "-" : "";
    
        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
    
        return negativeSign + (j ? i.substr(0, j) + decimal : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + decimal);
    } catch (e) {
        return '0,00'
    }
}