class ActionUtils {
    public async  scrollToElement(elementText: string): Promise<ChainablePromiseElement> {
        await this.scrollToBeginning();
        return await $(`android=new UiScrollable(new UiSelector()).scrollIntoView(new UiSelector().text("${elementText}"))`);
    }

    public async scrollToBeginning(): Promise<ChainablePromiseElement> {
        await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollToBeginning(3)`);
    }

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