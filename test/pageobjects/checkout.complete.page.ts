import MainBarPage from "./main.bar.page.ts";

class CheckoutCompletePage extends MainBarPage {
    //locators
    public get successMessage() {
        return $('//android.widget.ScrollView[@content-desc="test-CHECKOUT: COMPLETE!"]//android.widget.TextView[1]');
    }

    //actions
    public async getSuccessMessageText(): Promise<string> {
       return await this.successMessage.getText();
    }
}
export default new CheckoutCompletePage();