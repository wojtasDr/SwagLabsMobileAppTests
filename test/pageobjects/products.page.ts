import {$} from "@wdio/globals";
import ActionsUtils from "../utils/action.utils.ts";
import MainBarPage from "./main.bar.page.ts";

class ProductsPage extends MainBarPage {
    //locators
    public get filterButton(): ChainablePromiseElement {
        return $('~test-Modal Selector Button');
    }

    public filterOption(optionName: string): ChainablePromiseElement {
        const locator = driver.isIOS ? `//XCUIElementTypeOther[@name="${optionName}"]` :
            `//android.widget.TextView[@text="${optionName}"]`;
        return $(locator);
    }

    public get productsTitles(): ChainablePromiseArray {
        return $$('~test-Item title');
    }

    public get productsPrices(): ChainablePromiseArray {
        return $$('~test-Price');
    }

    public addToCartButtonByProductText(productName: string) {
        const locator = driver.isIOS ? `//XCUIElementTypeStaticText[@label="${productName}"]/../..//XCUIElementTypeOther[@name="ADD TO CART"]` :
            `//android.widget.TextView[@text="${productName}"]/../android.view.ViewGroup[@content-desc="test-ADD TO CART"]`;
        return $(locator);
    }

    public removeButton(productName: string): ChainablePromiseElement {
        const locator = driver.isIOS ? `//XCUIElementTypeStaticText[@label="${productName}"]/../..//XCUIElementTypeOther[@name="REMOVE"]` :
            `//android.widget.TextView[@text="${productName}"]/../android.view.ViewGroup[@content-desc="test-REMOVE"]`;
        return $(locator);
    }

    //actions
    public async clickFilterButton(): Promise<void> {
        await this.filterButton.click();
    }

    public async clickFilterOption(optionName: string): Promise<void> {
        await this.filterOption(optionName).click();
    }

    public async filterProductsBy(optionName: string): Promise<void> {
        await this.clickFilterButton();
        await this.clickFilterOption(optionName);
    }

    public async getProductsAttributes(attribute: string): Promise<string[]> {
        const productList = await $('~test-Item title');
        await productList.waitForDisplayed();

        const attributes = new Set<string>();

        while (true) {
            const productsAttributes = attribute === 'title' ? await this.productsTitles : await this.productsPrices;
            const attributesSetSizeBeforeScroll = attributes.size;

            for (const attribute of productsAttributes) {
                const attributeText = await attribute.getText();
                attributes.add(attributeText);
            }
            await ActionsUtils.scrollDownHalfScreen();

            const attributesSetSizeAfterScroll = attributes.size;
            if (attributesSetSizeBeforeScroll === attributesSetSizeAfterScroll) break;
        }

        return [...attributes];
    };

    public async addProductToCart(productName: string): Promise<void> {
        await ActionsUtils.scrollToElement(productName);
        await this.addToCartButtonByProductText(productName).click();
    }

    public async removeProductFromCart(productName: string): Promise<void> {
        await ActionsUtils.scrollToElement(productName);
        await this.removeButton(productName).click();
    }
}
export default new ProductsPage();