import {$} from "@wdio/globals";

export default class MainBarPage {
    //locators
    public get cartIcon(): ChainablePromiseElement {
        return $('~test-Cart');
    }

    public get cartItemsNumber() {
        return $('//android.view.ViewGroup[@content-desc="test-Cart"]//android.widget.TextView');
    }

    //actions
    public async goToCart(): Promise<void> {
        await this.cartIcon.click();
    }

    public async getNumberOfCartItems(): Promise<string> {
        return await this.cartItemsNumber.getText();
    }
}