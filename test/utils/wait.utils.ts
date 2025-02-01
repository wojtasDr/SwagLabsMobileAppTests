class WaitUtils {

    async waitForTextInElement(element: ChainablePromiseElement, expectedText: string, timeout: number = 5000): Promise<void> {
        await element.waitUntil(
            async () => {
                const text = await element.getText();
                return text === expectedText;
            },
            {
                timeout: timeout,
                timeoutMsg: `Element with text "${expectedText}" was not found during ${timeout} ms.`,
            }
        );
    }

    async waitForElementToDisappear(element: ChainablePromiseElement, timeout: number = 5000): Promise<void> {
        await element.waitUntil(
            async () => {
                return !(await element.isDisplayed());
            },
            {
                timeout: timeout,
                timeoutMsg: `Element still visible after ${timeout} ms.`,
                reverse: true
            }
        );
    }
}
export default new WaitUtils();