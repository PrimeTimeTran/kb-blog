---
title: 'Flutter - Android app connection refused to local server when iOS & web work'
date: '2021-03-29'
tags: ['flutter', 'Android']
draft: false
summary: 'Platform specific solution for Android connectivity issues while developing with Flutter.'
bibliography: references-data.bib
canonicalUrl:
---

## Fix Android connection refused issue on Flutter / Android

Check if you can Google inside of the device browser. If you can then you've
got an issue with your app and not the device. Proceed.

If you can't connect to any website on the browser, [try changing your network DNS](https://news.trendmicro.com/2023/03/21/how-to-turn-on-private-dns-mode/).

### Make sure you've got the following inside of defined

Inside of this file:

`./android/app/src/main/AndroidManifest.xml`

Make sure you've got these tags & values.

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

It should look like this.

```xml
<manifest>
    <application
        android:label="@string/app_name"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher">
    </application>
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>
```

### Try using an IP instead of localhost. Specifically `10.0.2.2`

Go from using localhost to a hardcoded IP address. Read more [here](https://stackoverflow.com/questions/4905315/error-connection-refused).

```dart
const api = "http://10.0.2.2:7254";
```
