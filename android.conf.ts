export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    port: 4723,
    specs: [
        './test/specs/**/*.ts'
    ],
    exclude: [],
    maxInstances: 10,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME,
        'appium:platformVersion': process.env.ANDROID_VERSION,
        'appium:automationName': 'UiAutomator2',
        'appium:appWaitActivity': `${process.env.ANDROID_APP_PACKAGE}.${process.env.ANDROID_APP_WAIT_ACTIVITY}`,
        'appium:app': process.env.ANDROID_APP_PATH
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['appium'],
    framework: 'mocha',
    reporters: ['junit', ['allure', {outputDir: 'allure-results'}]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 100000
    },
    /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {object}  test             test object
     * @param {object}  context          scope object the test was executed with
     * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
     * @param {*}       result.result    return object of test function
     * @param {number}  result.duration  duration of test
     * @param {boolean} result.passed    true if test has passed, otherwise false
     * @param {object}  result.retries   information about spec related retries, e.g. `{ attempts: 0, limit: 0 }`
     */
    afterTest: async function (test, context, {error, result, duration, passed, retries}) {
        if (!passed) {
            await browser.takeScreenshot();
        }

        await driver.terminateApp(process.env.ANDROID_APP_PACKAGE);
        await driver.activateApp(process.env.ANDROID_APP_PACKAGE);
    }
}
