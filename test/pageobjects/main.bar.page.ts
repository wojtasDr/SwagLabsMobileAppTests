import {$} from "@wdio/globals";

export default class MainBarPage {
    //locators
    public get cartIcon(): ChainablePromiseElement {
        return $('~test-Cart');
    }

    public get cartItemsNumber() {
        const locator = driver.isIOS ? '//XCUIElementTypeOther[@name="test-Cart"]/XCUIElementTypeOther[@name]' :
            '//android.view.ViewGroup[@content-desc="test-Cart"]//android.widget.TextView';
        return $(locator);
    }

    //actions
    public async goToCart(): Promise<void> {
        await this.cartIcon.click();
    }
}