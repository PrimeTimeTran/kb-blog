---
title: 'How to change Android app icon name programmatically based on the build type?'
date: '2021-03-21'
tags: ['flutter', 'Android']
draft: false
summary: 'Change icon name based on build helping to identify which app is installed on our device quick & easy.'
bibliography: references-data.bib
canonicalUrl:
---

## How to change icon name on Android based on build type? Debug vs Release?

The following is shown for debug mode. Change `debug` to `release` in the paths
to make the changes for release build variant.

### Define `strings.xml` at the following path

`./android/app/src/debug/res/values/strings.xml`

### Add the following to that file. Dev being the name of the icon we want

```xml
<!-- ./android/app/src/debug/res/values/strings.xml -->
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">DEV</string>
</resources>
```

### Update to `android:label="@string/app_name"` inside of `./android/app/src/main/AndroidManifest.xml`.

Inside the opening `<activity>` tag.

```xml
<!-- ./android/app/src/main/AndroidManifest.xml -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.example.rse">
  <application
    android:label="@string/app_name"
    android:name="${applicationName}"
    android:icon="@mipmap/ic_launcher"
  >
</manifest>
```

### Sync Project files with Gradle files to pick up new changes

![preview](https://i.imgur.com/TDP3Kwm.png)
