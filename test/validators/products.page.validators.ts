import ArraysUtils from "../utils/arrays.utils.ts";

class ProductsPageValidators {
    public async expectProductsAreSortedByPrice(arrayToBeChecked: string[], reverse: boolean = false): Promise<void> {
        let actualArray: number[] = await ArraysUtils.mapCurrencyToNumberArray('$', arrayToBeChecked);
        let expectedArray: number[] = await ArraysUtils.sortArray(actualArray, reverse);

        await expect(actualArray).toEqual(expectedArray);
    }
}

export default new ProductsPageValidators();