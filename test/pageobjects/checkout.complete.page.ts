import MainBarPage from "./main.bar.page.ts";
import {$} from "@wdio/globals";

class CheckoutCompletePage extends MainBarPage {
    //locators
    public get successMessage() {
        const locator = driver.isIOS ? '//XCUIElementTypeStaticText[@name="THANK YOU FOR YOU ORDER"]' :
            '//android.widget.ScrollView[@content-desc="test-CHECKOUT: COMPLETE!"]//android.widget.TextView[1]';
        return $(locator);
    }

    //actions
    public async getSuccessMessageText(): Promise<string> {
       return await this.successMessage.getText();
    }
}
export default new CheckoutCompletePage();