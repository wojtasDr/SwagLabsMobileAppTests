import {$} from '@wdio/globals'

class LoginPage {
    //locators
    public get userNameInput(): ChainablePromiseElement {
        return $('~test-Username');
    }

    public get passwordInput(): ChainablePromiseElement {
        return $('~test-Password');
    }

    public get loginButton(): ChainablePromiseElement {
        return $('~test-LOGIN');
    }

    //actions
    public async login(username: string, password: string) {
        await this.typeUserName(username);
        await this.typePassword(password);
        await this.clickLoginButton();
    }

    /**
     * a method to type username into username input
     * @param {string} userName
     */
    public async typeUserName(userName: string): Promise<void> {
        await this.userNameInput.setValue(userName);
    }

    /**
     * a method to type password into password input
     * @param {string} password
     */
    public async typePassword(password: string): Promise<void> {
        await this.passwordInput.setValue(password);
    }

    /**
     * a method to click on login button
     */
    public async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }
}
export default new LoginPage();
