import MainBarPage from "./main.bar.page.ts";
import {$} from "@wdio/globals";
import ActionsUtils from "../utils/action.utils.ts";

class CartPage extends MainBarPage{
    //locators
    public productQuantity(productName: string): ChainablePromiseElement {
        const locator = driver.isIOS ? `//XCUIElementTypeStaticText[@label="${productName}"]/../../..//XCUIElementTypeOther[@name="test-Amount"]` :
            `//android.widget.TextView[@text="${productName}"]/../../android.view.ViewGroup[@content-desc="test-Amount"]/android.widget.TextView`;
        return $(locator);
    }

    public productPrice(productName: string): ChainablePromiseElement {
        const locator = driver.isIOS ? `//XCUIElementTypeStaticText[@label="${productName}"]/../../..//XCUIElementTypeOther[@name="test-Price"]/XCUIElementTypeStaticText` :
            `//android.widget.TextView[@text="${productName}"]/../../android.view.ViewGroup[@content-desc="test-Price"]/android.widget.TextView`;
        return $(locator);
    }

    public removeButton(productName: string): ChainablePromiseElement {
        const locator = driver.isIOS ? `//XCUIElementTypeStaticText[@label="${productName}"]/../../..//XCUIElementTypeOther[@name="REMOVE"]` :
            `//android.widget.TextView[@text="${productName}"]/../..//android.view.ViewGroup[@content-desc="test-REMOVE"]/android.widget.TextView`;
        return $(locator);
    }

    public get checkoutButton(): ChainablePromiseElement {
        return $('~test-CHECKOUT');
    }

    //actions
    public async getProductQuantity(productName: string): Promise<string> {
        return await this.productQuantity(productName).getText();
    }

    public async getProductPrice(productName: string): Promise<string> {
        return await this.productPrice(productName).getText();
    }

    public async removeProductFromCart(productName: string): Promise<void> {
        await ActionsUtils.scrollToElement(productName);
        await this.removeButton(productName).click();
    }

    public async checkoutCart(): Promise<void> {
        await this.checkoutButton.click();
    }
}
export default new CartPage();