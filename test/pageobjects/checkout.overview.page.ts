import ActionsUtils from "../utils/action.utils.ts";
import MainBarPage from "./main.bar.page.ts";
import {$} from "@wdio/globals";

class CheckoutOverviewPage extends MainBarPage {
    //locators
    public get productName(): ChainablePromiseElement {
        return $('//android.view.ViewGroup[@content-desc="test-Description"]/android.widget.TextView');
    }

    public get totalNetPrice(): ChainablePromiseElement {
        return $('//android.widget.TextView[contains(@text, "Item total")]');
    }

    public get totalTax(): ChainablePromiseElement {
        return $('//android.widget.TextView[contains(@text, "Tax")]');
    }

    public get totalGrossPrice(): ChainablePromiseElement {
        return $('//android.widget.TextView[contains(@text, "Total")]');
    }

    public productQuantity(productName: string): ChainablePromiseElement {
        return  $(`//android.widget.TextView[@text="${productName}"]/../../android.view.ViewGroup[@content-desc="test-Amount"]/android.widget.TextView`);
    }

    public productPrice(productName: string): ChainablePromiseElement {
        return  $(`//android.widget.TextView[@text="${productName}"]/../../android.view.ViewGroup[@content-desc="test-Price"]/android.widget.TextView`);
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

    public get finishButton(): ChainablePromiseElement {
        return $('~test-FINISH');
    }

    public async getProductName(): Promise<string> {
        return await this.productName.getText();
    }

    public async clickFinishButton(): Promise<void> {
        const finishButton = await ActionsUtils.scrollToElement('FINISH');
        await finishButton.click();
    }
}
export default new CheckoutOverviewPage();