/**
 * Utility class for waiting on elements in WebdriverIO tests.
 */
class WaitUtils {
    /**
     * Waits until an element contains the expected text.
     * @param {ChainablePromiseElement} element - The element to check.
     * @param {string} expectedText - The expected text content.
     * @param {number} [timeout=5000] - Timeout in milliseconds before failing.
     * @returns {Promise<void>} Resolves when the expected text is found.
     * @example
     * await WaitUtils.waitForTextInElement(CheckoutInformationPage.errorMessage, 'Last Name is required');
     */
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

    /**
     * Waits until an element disappears from the page.
     * @param {ChainablePromiseElement} element - The element to wait for.
     * @param {number} [timeout=5000] - Timeout in milliseconds before failing.
     * @returns {Promise<void>} Resolves when the element is no longer displayed.
     * @example
     * await WaitUtils.waitForElementToDisappear(CartPage.cartItemsNumber);
     */
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