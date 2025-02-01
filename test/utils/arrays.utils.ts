class ArraysUtils {
    public async sortArray(arrayToBeSorted: number[], reverse: boolean = false): Promise<number[]> {
        return  [...arrayToBeSorted].sort((a, b) => reverse ? b - a : a - b);
    }

    public async mapCurrencyToNumberArray(currency: string,currencyArray: string[]): Promise<number[]> {
        return currencyArray.map(price => parseFloat(price.replace(currency, '')));
    }
}
export default new ArraysUtils();