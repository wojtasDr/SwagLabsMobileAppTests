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
        platformName: 'iOS',
        'appium:deviceName': process.env.IOS_DEVICE_NAME,
        'appium:platformVersion': process.env.IOS_VERSION,
        'appium:automationName': 'XCUITest',
        'appium:app': process.env.IOS_APP_PATH
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 200000,
    connectionRetryCount: 10,
    services: ['appium'],
    framework: 'mocha',
    reporters: ['junit', ['allure', {outputDir: 'allure-results'}]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 200000
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

        await driver.terminateApp(process.env.IOS_APP_BUNDLE_ID);
        await driver.activateApp(process.env.IOS_APP_BUNDLE_ID);
    }
}
