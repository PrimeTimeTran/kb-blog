---
draft: false
date: 2023-08-06
title: 'Opinion: Flutter vs React Native: Why I choose Flutter before React Native'
summary: Reasons why Flutter is my framework of choice over React Native for developing cross-platform apps on desktop, mobile, & web.
tags:
  - opinion
  - flutter
  - react native
---

# Introduction

Every program is a collection of variables, functions, classes, and modules.

Different programming languages and frameworks have taken different approaches to defining and organizing these constructs.

The following are examples which I believe Dart/Flutter has exceeded JS/React Native(RN) in terms of developer experience.

<TOCInline toc={props.toc} exclude="Overview" toHeading={3} />

<br />
# Comparison

### 1. Params Help

<img src="/static/gifs/flutter-vs-rn-param-hints.gif" alt="preview" />

Want to know how to use a component/widget without resorting to docs?

The shortcut `Ctrl + Space` gives us hints on how to use a component/widget.
In RN the dropdown is filled with un-useful suggestions where in Flutter it reveals the list of the actual parameters of the widget at the cursor.

Furthermore in Flutter hovering a Widget reveals a popup which lists params a Widget takes whereas RN fails to do that.

### 2. Go to Definition

<img src="/static/gifs/flutter-vs-rn-go-to-definition.gif" alt="preview" />

Holding `Cmd` and clicking on a Widget reveals the source code for a Widget in Flutter whereas in RN the `Cmd` click does nothing.

### 3. Simplified Export/Import syntax

<img src="/static/gifs/flutter-vs-rn-export-import-syntax.gif" alt="preview" />

In RN & ES5/ES6 we have to deal with `default` & `named` `exports` & `imports` which isn't easy when dealing with a real world app(not contrived example).

Whereas in Flutter we don't have to explicitly `export` widgets/variables/constants we define. We can use them by simply importing the file in which they're defined.

UI Primitives are automatically imported in Flutter whereas in RN we have to explicitly import each component we want to use.

<div className="tab-group">
  <div className="tab">
    <button id="dart" className="tablinks">Dart</button>
    <button id="ts" className="tablinks">TypeScript</button>
  </div>

  <div id="dart" className="tabcontent">
    ```dart {} showLineNumbers
    // Imports all primitives from Material without needing to explicitly name which ones we want.

    import 'package:flutter/material.dart';
    ```

  </div>

  <div id="ts" className="tabcontent">
    ```ts {} showLineNumbers
    // Requires explicit importing of individual components we want.

    import { Text, View } from "react-native";
    ```

  </div>
</div>

### 4. Reference Null Errors

<img src="/static/gifs/flutter-vs-rn-import-null.gif" alt="preview" />
Flutter is superb in identifying null references(importing non existing widgets) whereas RN & ES5/ES6 doesn't fair nearly as well(allows us to import non existent components/variables).

### 5. Fewer Configs

Less Jerry Rigging to Build

These files are common in React Native/Expo: `app.config.js`, `eas.json`, `metro.config.js`, `babel.config.js`

- What do they do?
- Can you update them without referencing documentation?

![demo](/static/assets/flutter-vs-rn-jerry-rigging.png)

There are more: `eslintrc.js`, `markdownlint.json`, `jsconfig.json`, `postcss.config.js`, `prettier.config.js`, `tailwind.config.js`, `vite.config.js`?

![demo](/static/assets/flutter-vs-rn-more-configs.png)

Many of the files are configs for **JS** itself or tooling like **ESlint**. As both RN & JS has evolved over the years they've become more and more convoluted whilst trying to support previous versions, deprecated features & future development.

Many of these configs(such as those for typescript) could be avoided altogether if choosing a framework with static typing like Dart out of the box.

### 6. Style UI Once

![demo](/static/assets/flutter-vs-rn-style-once.png)

In RN we often repeat code, especially for styling(as RN components come with no Style by default).

<img src="/static/gifs/flutter-vs-rn-style-once.gif" alt="preview" />

In Flutter we can style widgets once(using Material themes) and see those styles applied to child widgets(without reapplying style/code).

### 7. Community

Flutter now leads React Native in terms of stars on Github meaning more people are working on making it better.

- [Flutter GitHub Repo Stars 170k](https://github.com/flutter/flutter)
- [React Native GitHub Repo Stars 120k](https://github.com/facebook/react-native)

### 8. Performance

There have been many case studies over the years on the speed of Dart vs JS.

- [Benchmarks are better](https://www.orientsoftware.com/blog/flutter-vs-react-native-performance/#:~:text=Similar%20to%20the%20Android%20performance,GPU%20usage%20of%2019.56%20percent.)

<br/>
# Conclusion

Although some might argue that the config/tooling problems in JS are solved with TS I'd argue that's working on the symptom and not addressing the root cause.

Furthermore although Dart takes a bit more to onboard it doesn't have some of the WTF moments that JS has as [documented here](https://github.com/denysdovhan/wtfjs).

For Example:

```js
parseInt(0.000001); // 0
parseInt(0.0000001); // 1

parseInt('f*ck'); // NaN
parseInt('f*ck', 15); // NaN
parseInt('f*ck', 16); // 15
parseInt('f*ck', 17); // 15
parseInt('f*ck', 18); // 15
```
