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

    public async typeUserName(userName: string): Promise<void> {
        await this.userNameInput.setValue(userName);
    }

    public async typePassword(password: string): Promise<void> {
        await this.passwordInput.setValue(password);
    }

    public async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }
}

export default new LoginPage();
