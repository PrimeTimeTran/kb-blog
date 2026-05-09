---
title: Flutter lacks support for WebView
date: '2023-01-20'
tags: ['flutter', 'TIL']
draft: true
summary: Flutter works in many situations but it doesn't work for all.
---

## Lack of webview support

I wanted to add HCaptcha to a project using a Webview and found out it doesn't
work on web; only Android and iOS.

> webview_flutter package does not support macOS target which is the reason why
> you see the error

https://stackoverflow.com/questions/70906118/flutter-webview-ios-error-default-webview-implementation-for-targetplatform-mac

https://github.com/flutter/flutter/issues/41725

https://stackoverflow.com/questions/58150503/webview-in-flutter-web
