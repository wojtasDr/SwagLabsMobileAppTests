/**
 * Utility class for performing various scrolling actions in a mobile application.
 * Supports both iOS and Android platforms.
 */
class ActionUtils {
    /**
     * Scrolls to an element with the specified text.
     * First, it scrolls to the beginning of the screen, then scrolls down until it finds the element with the given text.
     *
     * @param {string} elementText - The text of the element to scroll to.
     * @returns {Promise<ChainablePromiseElement>} - A promise that resolves to the element with the specified text.
     * @example
     * await ActionUtils.scrollToElement("Submit");
     */
    public async  scrollToElement(elementText: string): Promise<ChainablePromiseElement> {
        await this.scrollToBeginning();
        if(driver.isIOS) {
            return await driver.execute('mobile: scroll', {
                direction: 'down',
                predicateString: `name == "${elementText}"`,
                toVisible: true,
            })
        }
        return await $(`android=new UiScrollable(new UiSelector()).scrollIntoView(new UiSelector().text("${elementText}"))`);
    }

    /**
     * Scrolls to the beginning of the screen.
     * On iOS, it scrolls up. On Android, it uses a UiScrollable selector to scroll to the beginning.
     *
     * @returns {Promise<void>} - A promise that resolves when the scroll action is complete.
     * @example
     * await ActionUtils.scrollToBeginning();
     */
    public async scrollToBeginning(): Promise<void> {
        driver.isIOS ? await driver.execute('mobile: scroll', { direction: 'up' }) :
            await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollToBeginning(3)`);
    }

    /**
     * Scrolls down by half the screen height.
     * This method simulates a touch gesture to scroll down the screen.
     *
     * @returns {Promise<void>} - A promise that resolves when the scroll action is complete.
     * @example
     * await ActionUtils.scrollDownHalfScreen();
     */
    public async scrollDownHalfScreen(): Promise<void> {
        const { height, width } = await driver.getWindowSize();

        const startY = height * 0.7;
        const endY = height * 0.2;
        const centerX = width / 2;

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: centerX, y: startY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 500 },
                    { type: 'pointerMove', duration: 600, x: centerX, y: endY },
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);

        await driver.pause(1000);
    }
}

export default new ActionUtils();