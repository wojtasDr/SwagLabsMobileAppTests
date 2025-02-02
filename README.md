# SwagLabsMobileAppTests

# Short description

This project is testing framework for Android and iOS SwagLabsMobileApp native
mobile app. Android and iOS setup is done for simulators. Test were executed and prepared
also for simulators.

# Project structure

- page objects are defined in [pageobjects](test/pageobjects)
- tests are defined in [purchase.process.tests.e2e.ts](test/specs/purchase.process.tests.e2e.ts)
- utils are defined in [utils](test/utils)
- complex validators for pege obects are defined in [validators](test/validators)
- file with project properties [.env](.env)
- android configuration file [android.conf.ts](android.conf.ts)
- ios configuration file [ios.conf.ts](ios.conf.ts)
- project dependencies and scripts to run tests and generated reports [package.json](package.json)

# Tools used

- WebdriverIO
- Appium
- Typescript
- Mocha
- Allure
- XCode (iOS simulator)
- Android Studio (Android simulator)

# How to set up the project

1. Install nodeJS, npm, Appium server, Android Studio (for Android), XCode (for iOS), git, WebdriverIO
2. Create Android simulator in Android Studio (Tools -> Device Manager).
3. Create iOS simulator in XCode.
4. Go to https://github.com/saucelabs/sample-app-mobile/releases/ and download .apk file for Android,
   .zip file for iOS (simulator).

# How to start tests

1. Do the project setup steps, presented above.
2. Clone this repository
3. Import project to any TS IDE (e.g. WebStorm) and do the

```sh
npm install
```

4. start the appium server

```sh
   appium --allow-cors
```

5. Start simulators
6. Set all parameters (deviceName name, platformVersion, app path) in [android.conf.ts](android.conf.ts)
   and [ios.conf.ts](ios.conf.ts)
7. Run the tests

```sh
npm run android
```

or

```sh
npm run ios
```

Be aware that both scripts will delete old allure reports!

# Tests results

Test results are stored in allure-results directory (will be created after first test run).
In order to generate and open the report run

```sh
npm run allure:report
```

# Tests development - create mobile app elements selectors with appium inspector.

1. Go to https://inspector.appiumpro.com/
2. Set _Remote Host_ to 127.0.0.1 and _Remote Port_ to 4732
3. Set following capabilities
   Android:

```
{
  "appium:platformVersion": "9.0",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "emulator-5554",
  "platformName": "Android",
  "appium:app": "{path to .apk file}",
  "appium:appWaitActivity": "com.swaglabsmobileapp.MainActivity"
}
```   

iOS:

``` 
{
  "appium:platformVersion": "16.4",
  "appium:automationName": "XCUITest",
  "appium:deviceName": "iPhone 14",
  "platformName": "iOS",
  "appium:app": "{path to .zip file}"
}
```











