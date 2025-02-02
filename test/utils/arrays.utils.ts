/**
 * Utility class for performing various operations on arrays.
 * Supports both iOS and Android platforms.
 */
class ArraysUtils {
    /**
     * Sorts a given array of numbers in ascending or descending order.
     * @param {number[]} arrayToBeSorted - The array of numbers to sort.
     * @param {boolean} [reverse=false] - If true, sorts in descending order; otherwise, sorts in ascending order.
     * @returns {Promise<number[]>} A sorted array of numbers.
     * @example
     * await ArraysUtils.sortArray(actualArray, true);
     */
    public async sortArray(arrayToBeSorted: number[], reverse: boolean = false): Promise<number[]> {
        return [...arrayToBeSorted].sort((a, b) => reverse ? b - a : a - b);
    }

    /**
     * Converts an array of currency-formatted strings to an array of numbers.
     * @param {string} currency - The currency symbol to remove (e.g., '$').
     * @param {string[]} currencyArray - The array of currency strings (e.g., ['$10.99', '$5.00']).
     * @returns {Promise<number[]>} An array of numbers converted from currency strings.
     * @example
     * await ArraysUtils.mapCurrencyToNumberArray('$', currencyArray);
     */
    public async mapCurrencyToNumberArray(currency: string, currencyArray: string[]): Promise<number[]> {
        return currencyArray.map(price => parseFloat(price.replace(currency, '')));
    }
}

export default new ArraysUtils();