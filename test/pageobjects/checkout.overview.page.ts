import ActionsUtils from "../utils/action.utils.ts";
import MainBarPage from "./main.bar.page.ts";
import {$} from "@wdio/globals";

class CheckoutOverviewPage extends MainBarPage {
    //locators
    public get productName(): ChainablePromiseElement {
        const locator = driver.isIOS ? '//XCUIElementTypeOther[@name="test-Description"]/XCUIElementTypeStaticText' :
            '//android.view.ViewGroup[@content-desc="test-Description"]/android.widget.TextView';
        return $(locator);
    }

    public get totalNetPrice(): ChainablePromiseElement {
        const locator = driver.isIOS ? '//XCUIElementTypeStaticText[contains(@name, "Item total")]' :
            '//android.widget.TextView[contains(@text, "Item total")]';
        return $(locator);
    }

    public get totalTax(): ChainablePromiseElement {
        const locator = driver.isIOS ? '//XCUIElementTypeStaticText[contains(@name, "Tax")]' :
            '//android.widget.TextView[contains(@text, "Tax")]';
        return $(locator);
    }

    public get totalGrossPrice(): ChainablePromiseElement {
        const locator = driver.isIOS ? '//XCUIElementTypeStaticText[contains(@name, "Total")]' :
            '//android.widget.TextView[contains(@text, "Total")]';
        return $(locator);
    }

    public productQuantity(productName: string): ChainablePromiseElement {
        const locator = driver.isIOS ? `//XCUIElementTypeStaticText[@label="${productName}"]/../../..//XCUIElementTypeOther[@name="test-Amount"]` :
            `//android.widget.TextView[@text="${productName}"]/../../android.view.ViewGroup[@content-desc="test-Amount"]/android.widget.TextView`;
        return $(locator);
    }

    public productPrice(productName: string): ChainablePromiseElement {
        const locator = driver.isIOS ? `//XCUIElementTypeStaticText[@label="${productName}"]/../../..//XCUIElementTypeOther[@name="test-Price"]` :
            `//android.widget.TextView[@text="${productName}"]/../../android.view.ViewGroup[@content-desc="test-Price"]/android.widget.TextView`;
        return $(locator);
    }

    public get finishButton(): ChainablePromiseElement {
        return $('~test-FINISH');
    }

    //actions
    public async getProductQuantity(productName: string): Promise<string> {
        return await this.productQuantity(productName).getText();
    }

    public async getProductPrice(productName: string): Promise<string> {
        return await this.productPrice(productName).getText();
    }

    public async getTotalNetPrice(): Promise<string> {
        return await this.totalNetPrice.getText();
    }

    public async getTotalTax(): Promise<string> {
        return await this.totalTax.getText();
    }

    public async getTotalGrossPrice(): Promise<string> {
        return await this.totalGrossPrice.getText();
    }

    public async getProductName(): Promise<string> {
        return await this.productName.getText();
    }

    public async clickFinishButton(): Promise<void> {
        await ActionsUtils.scrollToElement('FINISH');
        await this.finishButton.click();
    }
}

export default new CheckoutOverviewPage();