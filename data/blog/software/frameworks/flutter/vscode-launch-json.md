---
draft: true
date: '2023-07-22'
title: 'How to configure VScode to launch Flutter simulator, emulator, chrome'
summary: ''
tags: ['VSCode']
bibliography: references-data.bib
canonicalUrl:
---

## VSCode - launch.json for Flutter

If you have multiple platforms, environments & flavors you're developing for this is a good starting point.

```json
{
  "configurations": [
    {
      "name": "Fl (Pixel 6 Pro API 33)",
      "type": "dart",
      "request": "launch",
      "args": ["--flavor", "development"]
    },
    {
      "name": "Fl (iPhone 14 Pro Max)",
      "type": "dart",
      "request": "launch",
      "program": "lib/main.dart",
      "flutterMode": "debug",
      "deviceId": "9BE5747F-3912-48BE-956A-F87340E62DB0"
    }
  ]
}
```
