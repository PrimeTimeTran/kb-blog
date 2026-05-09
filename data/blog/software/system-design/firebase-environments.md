---
draft: true
date: '2023-05-16'
title: 'React Native configuring Firebase dev and prod environments'
summary: 'How to configure React Native to choose the correct Firebase configuration file based on the build environment.'
tags: ['Firebase', 'react native', 'iOS', 'Android']
bibliography: references-data.bib
canonicalUrl:
---

## Multi environment Firebase

We need dev environments(env) separate from prod to ensure our Google Analytics
are accurate.

With Firebase we create two projects and download
four `GoogleService-Info.plist` and `google-services.json`
files to accomplish this. Two of both files.

One `GoogleService-Info.plist` for dev and one for prod.

One `google-services.json` for dev and one for prod.

4 files in total.

But how can we configure XCode and Android to load the appropriate file
based on the env(dev/debug vs prod/release)?

### iOS

For iOS we can write a script to this file.

`MyApp > Target/MyApp > Build Phases > Start Packager > /bin/sh`.

```bash
if [ "${CONFIGURATION}" == "Release" ]; then
cp -r "${PROJECT_DIR}/PROD/GoogleService-Info.plist" "${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/GoogleService-Info.plist"

echo "Firebase: Release"
echo "${PROJECT_DIR}/PROD/GoogleService-Info.plist"

elif [ "${CONFIGURATION}" == "Debug" ]; then
cp -r "${PROJECT_DIR}/DEBUG/GoogleService-Info-debug.plist" "${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/GoogleService-Info.plist"

echo "Firebase: Debug"
echo "${PROJECT_DIR}/DEBUG/GoogleService-Info-debug.plist"

fi
```

This bash script runs early during the build process and depending on the `CONFIGURATION`
environment variable will load the appropriate `GoogleService-Info.plist` file.

We echo in the script as well for easier debugging.

![iOS](https://i.imgur.com/vqvIzZH.png)

### Android

For android it's a lot simpler, just create the Firebase projects for both dev
and prod and then drag and drop it to it's corresponding environment directory.

![Android](https://i.imgur.com/i5j9gtz.png)

For dev
`android/app/src/debug/google-services.json`

For prod
`android/app/src/release/google-services.json`

https://stackoverflow.com/questions/37472090/in-new-firebase-how-to-use-multiple-config-file-in-xcode
