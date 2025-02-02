import MainBarPage from "./main.bar.page.ts";
import {$} from "@wdio/globals";

class CheckoutInformationPage extends MainBarPage {
    //locators
    public get firstNameInput() {
        return $('~test-First Name');
    }

    public get lastNameInput() {
        return $('~test-Last Name');
    }

    public get zipPostalCodeInput() {
        return $('~test-Zip/Postal Code');
    }

    public get continueButton() {
        return $('~test-CONTINUE');
    }

    public get errorMessage() {
        const locator = driver.isIOS ? '//XCUIElementTypeOther[@name="test-Error message"]/XCUIElementTypeStaticText' :
            '//android.view.ViewGroup[@content-desc="test-Error message"]/android.widget.TextView';
        return $(locator);
    }

    //actions
    public async typeFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.setValue(firstName);
    }

    public async typeLastName(lastName: string): Promise<void> {
        await this.lastNameInput.setValue(lastName);
    }

    public async typeZipPostalCode(zipPostalCode: string): Promise<void> {
        await this.zipPostalCodeInput.setValue(zipPostalCode);
    }

    public async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    public async fillInCheckoutFormAndContinue(firstName: string, lastName: string, zipPostalCode: string): Promise<void> {
        await this.typeFirstName(firstName);
        await this.typeLastName(lastName);
        await this.typeZipPostalCode(zipPostalCode);
        await this.clickContinueButton();
    }
}

export default new CheckoutInformationPage();