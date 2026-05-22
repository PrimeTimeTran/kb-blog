---
draft: false
date: 2023-08-20
title: 'System Design: Automated Integration Testing with Appium & Mocha'
summary: Manually repeating these tests is costly and time consuming. Once created, automated tests can be run over and over again at no additional cost and they are much faster than manual tests. Automated software testing can reduce the time to run repetitive tests from days to hours.
tags:
  - Mocha
  - Automation
  - Mobile
  - appium
  - system-design
  - react-native
---

# Introduction

In order to build a robust app that can maintain velocity as product requirements grow teams have to implement an automated testing system.

Although manual testing works for POCs or MVPs any application containing more than a handful of user personas should include automation as the number of edge cases for business logic often grow exponentially.

## Automated Testing

What is automated testing? Automated testing is the application of software tools to automate a human-driven manual process of reviewing and validating a software product. Most modern agile and DevOps software projects now include automated testing from inception.

With [Appium](https://appium.io/docs/en/2.1/) we automate any behavior a user can do such as pressing on UI elements, filling in forms, submitting them, and navigating the app.

![Preview](https://s11.gifyu.com/images/SgN3x.gif)

In this walkthrough we'll complete the following automation tests for our app's Auth screen.

- [✔] should (load successfully)
- [✔] should respond to user interaction
- [✔] should display an error message when an invalid email is entered
- [✔] should display an error message when an invalid password is entered
- [✔] should not display an error message when valid email & password is entered
- [✔] should navigate to success screen after form is submitted with valid email & password

## Dependencies

- Expo 49.07
- Appium 2.0.1
- Appiumappium-webdriver 1.0.3

## Initialize Project

Initialize new project/repo. Install dependencies. Switch to bare workflow.

```sh
npx create-expo-app mobile-testing
cd mobile-testing
npm install --save-dev sharp-cli
npx expo prebuild
```

Answer yes to package name on Android & iOS.

## Setup Appium

Install appium dependencies and ensure it's working.

```sh
npm install --save-dev webdriverio
npm install appium-webdriver appium-webdriveragent
appium
```

You should now see the Appium server start & keep it open/running in a separate terminal window/pane so it can listen for new session requests.

![appium server](https://i.imgur.com/VOAK3Hr.png)

## Setup Android Integration Test

```sh
mkdir integration
touch integration/android.js
```

Appium doesn't support a hybrid driver for React Native yet. We have to initialize and run tests for Android & iOS separately.

```js
const { remote } = require('webdriverio');

// Configure the driver driver
// Configs such as platform, activity, package, and automation name

const capabilities = {
  platformName: 'Android',
  'appium:deviceName': 'Android',
  'appium:appActivity': '.MainActivity',
  'appium:automationName': 'UiAutomator2',
  'appium:appPackage': 'com.primetimetran.mobiletesting',
};

const wdOpts = {
  capabilities,
  logLevel: 'debug',
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
};

// driver.$(...) is used to identify/select UI elements to test.
// In this case we select the default text of a new RN project, "Open up App.js to start" & then click it.

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    var el = await driver.$(`//*[contains(@text, "Open up App.js to start")]`);
    await el.click();
    await driver.pause(1000);
    await el.click();
    await driver.pause(1000);
    await el.click();
    await driver.pause(1000);
    await el.click();
  } catch {
    console.log('Error: Running Tests');
  }
}

runTest().catch(console.error);
```

## Install development build on Android emulator and run first test

```sh
# Switch Pixel_6_Pro_API_33 to your preferred Android emulator
emulator -avd Pixel_6_Pro_API_33

# Install the Expo dev client on the device
npx expo run:android
expo start
node integration/android.js
```

The Appium logs printing something like below. The most important thing being the ending **200** status code.

```sh
[HTTP] <-- POST /session/f4622dcd-58a3-409d-afc4-45b7ad9eeb91/element/00000000-0000-001a-ffff-ffff0000000e/click 200 264 ms - 14
```

And the console which you ran `node integration/android.js` exiting without big red error messages.

## Add logic to change color of text on click/press

Appium can change the state of our application by performing any behavior a user would, pressing on a UI element as an example.

```js
// This post assumes React Native experience.
// We add state to the App component for keeping track of the number of presses on the default/header text.
// If the number of presses is even, we change the header text to blue.

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCount(count + 1)}>
        <Text style={count % 2 == 0 ? styles.blue : {}}>Open up App.js to start working on your app!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blue: {
    color: '#4287f5',
  },
});
```

Run the tests and observe the resulting behavior.

```sh
node integration/android.js
```

You should see that the log process opens up the Android app, runs the automation, and the header text switch between blue and black; **excellent**.

## Add pauses & more clicks

We'll often need to slow down the testing process to give the app time to catchup as well as observe the UI behavior more easily.

```js
const { remote } = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:deviceName': 'Android',
  'appium:appActivity': '.MainActivity',
  'appium:automationName': 'UiAutomator2',
  'appium:appPackage': 'com.primetimetran.mobiletesting',
};

const wdOpts = {
  capabilities,
  logLevel: 'debug',
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
};

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    var el = await driver.$(`//*[contains(@text, "Open up App.js to start")]`);
    await el.click();
    await driver.pause(1000);
    await el.click();
    await driver.pause(1000);
    await el.click();
    await driver.pause(1000);
    await el.click();
  } catch {
    console.log('Error: Running Tests');
  }
}

runTest().catch(console.error);
```

We'll now see the header text oscillate between black & blue on clicks of the header text; **incredible**.

Lessons learned about Appium:

- We can automate app open.
- We can automate text search.
- We can automate mimicking user behavior such as button clicks/presses.

## Add Form for Integration Testing

Forms are everywhere in the wild. Let's automate finding a text input, filling it with data, submitting, and the resulting behavior.

The purpose of this blog isn't to teach react so we'll describe the below at a 10,000 ft overview.

- We define state for form & success.
- We define a handler for submitting the form.
- We define helpers for validating email & passwords.
- We define two text fields which capture the user's email & password.

```js
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

async function onSignIn(data) {
  fetch('https://httpbin.org/post', {
    method: 'POST',
    body: JSON.stringfy(data),
  });
}

export default function App() {
  const [count, setCount] = useState(0);
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {
    const errors = {};
    try {
      // Submit email and password. If everything goes
      // well server side clear the form & navigate the user to a new screen.
      const resp = await onSignIn({ email, password });
      if (resp.code == 200) {
        setForm({});
        setSuccess(true);
      }
    } catch (error) {
      console.error('Error: fillAndSubmitForm', error);
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCount(count + 1)} accessibilityLabel="Open App">
        <Text style={[styles.header, count % 2 == 0 ? styles.blue : {}]}>My App</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <TextInput
        value={form.email}
        style={styles.input}
        placeholder="john@email.com"
        accessibilityLabel="emailTextInput"
        onChangeText={(text) => setForm({ ...form, email: text })}
      />
      <TextInput
        type="password"
        placeholder="*******"
        style={styles.input}
        value={form.password}
        secureTextEntry={true}
        accessibilityLabel="passwordTextInput"
        onChangeText={(text) => setForm({ ...form, password: text })}
      />
      <TouchableOpacity onPress={onSubmit} style={styles.button} accessibilityLabel="submitButton">
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  blue: {
    color: '#4287f5',
  },
  success: {
    color: 'green',
    fontSize: 30,
  },
  prompt: {
    height: 30,
  },
  error: {
    color: 'red',
  },
  input: {
    height: 44,
    padding: 10,
    width: '95%',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: 'grey',
  },
  button: {
    height: 44,
    width: '95%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4287f5',
  },
});
```

Update the integration tests:

- Look for text "My App" now.
- Find the email input from the value of accessibilityLabel.
- Find the password input from the value of accessibilityLabel.

```js
const { remote } = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:deviceName': 'Android',
  'appium:appActivity': '.MainActivity',
  'appium:automationName': 'UiAutomator2',
  'appium:appPackage': 'com.primetimetran.bttesting',
};

const wdOpts = {
  capabilities,
  logLevel: 'debug',
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
};

async function runTest() {
  const driver = await remote(wdOpts);
  await changeColors(driver);
  await fillAndSubmitForm(driver);
}

async function changeColors(driver) {
  try {
    var el = await driver.$(`//*[contains(@text, "My App")]`);
    await el.click();
    await driver.pause(1000);
    await el.click();
    await driver.pause(1000);
    await el.click();
    await driver.pause(1000);
    await el.click();
  } catch (error) {
    console.error('Error: changeColors', error);
  } finally {
    console.log('Success: changeColors');
  }
}

async function fillAndSubmitForm(driver) {
  try {
    const el = await driver.$('android=new UiSelector().description("emailTextInput")');
    await el.setValue('dev@ltran.net');

    const el2 = await driver.$('android=new UiSelector().description("passwordTextInput")');
    await el2.setValue('Abc123!');

    const submitButton = await driver.$('android=new UiSelector().description("submitButton")');
    await submitButton.click();
  } catch (error) {
    console.error('Error: fillAndSubmitForm', error);
  } finally {
    console.log('Success: fillAndSubmitForm');
  }
}

runTest().catch(console.error);
```

When we run our tests now, we should see:

- The app opens
- Toggles the header text between blue & black
- Enters an email
- Enters a password
- Submits the the data
- Changes to a screen which indicates a successfully submitted form.

## Handle Invalid Email & Password Client Side.

Although having the server validate works, it's almost always a better idea to validate user import client side.

Run test again and notice we're navigated to the success screen. Incredible!

Run the integration test with an invalid password and notice we get a prompt for the password.

```js
await el2.setValue('Abc123');
```

Run the integration test with an invalid email and notice we get a prompt for the email.

```js
await el.setValue('dev@ltran.net');
```

These past two tests could be done easily with unit tests. We added them as proof of concept for inputting invalid data.

Furthermore, the tests can be used to valid the behavior of the UI, showing or removing prompts as appropriate depending on what the user did correctly.

How might we validate the app/ui behaved correctly given a user entered an invalid email, specifically using Appium?

How might we validate the app/ui behaved correctly given a user entered an invalid password, specifically using Appium?

## Add iOS Tests

As any experienced React Native or Flutter developer knows, both iOS & Android need to be tested because they'll both require platform specific code for a meaningfully large project.

> ⚠️ You need an Apple Developer account to finish the rest of the tutorial.

## Set iOS project team

Open XCode and select your development team.

![Development Team](https://i.imgur.com/krkqivV.png)

Clean build folder on XCode
Select any iOS simulator device (arm64, x86_64) & build

cd ~/Library/Developer/Xcode/DerivedData/mobiletesting-bzxocugyfrvpjfhfuzmjukoowyvy/Build/Products/Debug-iphonesimulator

Create Payload dir
Copy mobiletesting.app
Compress folder and rename to integration.ipa

Mv to working directory of mobile-testing

Copy over integration/ios.js

```js
const assert = require('assert');
const { remote } = require('webdriverio');

const capabilities = {
  platformName: 'iOS',
  'appium:platformVersion': '16.4',
  'appium:automationName': 'XCUITest',
  'appium:deviceName': 'iPhone 14 Pro Max',
  'appium:bundleId': 'com.primetimetran.mobiletesting',
  'appium:app': `${process.env.HOME}/Desktop/work/mobiletesting/integration.ipa`,
};

const wdOpts = {
  capabilities,
  logLevel: 'error',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  hostname: process.env.APPIUM_HOST || 'localhost',
};

describe('Auth screen', function () {
  let driver;

  beforeEach(async function () {
    this.timeout(20000);
    driver = await remote(wdOpts);
  });

  afterEach(async function () {
    if (driver) {
      await driver.deleteSession();
    }
  });

  it('should display header', async function () {
    this.timeout(9000);
    try {
      const el = await driver.$(`~Open App`);
      await el.waitForExist({ timeout: 10000 });
      assert(el, 'Expected element to exist');
    } catch (error) {
      throw new Error('Error: should have header visible', error);
    }
  });

  it('should change colors when clicked', async function () {
    this.timeout(9000);
    try {
      const el = await driver.$(`~Open App`);
      await driver.pause(1000);
      await el.click();
      await driver.pause(1000);
      await el.click();
      await driver.pause(1000);
      await el.click();
      await driver.pause(1000);
      await el.click();
      await driver.pause(1000);
      await el.click();
      assert(el, 'Expected element to exist');
    } catch (error) {
      throw new Error('Error: should change colors when clicked', error);
    }
  });

  it('should display an error message when an invalid email is entered', async function () {
    this.timeout(9000);
    try {
      const el = await driver.$(`~emailTextInput`);
      await el.setValue('dev@ltran.net');

      const el2 = await driver.$(`~passwordTextInput`);
      await el2.setValue('Abc123!');

      const button = await driver.$(`~submitButton`);
      await button.click();
      const prompt = await driver.$(`~promptEmail`);
      assert(prompt.elementId, 'Expected prompt to exist');
    } catch (error) {
      throw new Error('Error: should change colors when clicked', error);
    }
  });

  it('should display an error message when an invalid password is entered', async function () {
    this.timeout(9000);
    try {
      const el = await driver.$(`~emailTextInput`);
      await el.setValue('dev@ltran.net');

      const el2 = await driver.$(`~passwordTextInput`);
      await el2.setValue('Abc123');

      const button = await driver.$(`~submitButton`);
      await button.click();
      const prompt = await driver.$(`~promptPassword`);
      assert(prompt.elementId, 'Expected prompt to exist');
    } catch (error) {
      throw new Error('Error: should change colors when clicked', error);
    }
  });

  it('should not display an error message when valid email & password is entered', async function () {
    this.timeout(9000);
    try {
      const el = await driver.$(`~emailTextInput`);
      await el.setValue('dev@ltran.net');

      const el2 = await driver.$(`~passwordTextInput`);
      await el2.setValue('Abc123!');

      const button = await driver.$(`~submitButton`);
      await button.click();
      const prompt = await driver.$(`~promptEmail`);
      assert(!prompt.elementId, 'Expected prompt not to exist');

      const prompt2 = await driver.$(`~promptPassword`);
      assert(!prompt2.elementId, 'Expected prompt2 not to exist');
    } catch (error) {
      throw new Error('Error: should change colors when clicked', error);
    }
  });

  it('should navigate to success screen after form is submitted', async function () {
    this.timeout(9000);
    try {
      const el = await driver.$(`~emailTextInput`);
      await el.setValue('dev@ltran.net');

      const el2 = await driver.$(`~passwordTextInput`);
      await el2.setValue('Abc123!');

      const button = await driver.$(`~submitButton`);
      await button.click();
      const prompt = await driver.$(`~promptEmail`);
      assert(!prompt.elementId, 'Expected prompt not to exist');

      const prompt2 = await driver.$(`~promptPassword`);
      assert(!prompt2.elementId, 'Expected prompt2 not to exist');

      const prompt3 = await driver.$(`~Success`);
      assert(prompt3.elementId, 'Expected prompt to exist');
    } catch (error) {
      throw new Error('Error: should change colors when clicked', error);
    }
  });
});
```

Install new dependencies

```sh
npm install --save-dev mocha mocha-html-reporter mochawesome
```

Install iOS driver and install the development build/package/bundle.

```sh
appium driver install xcuitest
npx expo run:ios
```

Run tests

```sh
npx mocha integration/ios.js
```

Generate browser report for project managers, executives, clients.

```sh
mocha --reporter mochawesome --reporter-options reportDir=./custom-output integration/ios.js
```

## Refactor Android Test Suite

To test your knowledge of Appium & Mocha refactor the Android test suite to also include the `describe()` syntax of Mocha.
