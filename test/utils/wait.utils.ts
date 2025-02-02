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
}
export default new WaitUtils();