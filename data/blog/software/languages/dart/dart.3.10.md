---
draft: true
date: '2025-11-12'
title: 'x'
summary: 'x'
tags: ['']
---

# Introduction

Flutter 3.38 & Dart 3.10

1. Dot Shorthands

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: ...
)

Column(
  crossAxisAlignment: .start,
  children: ...
)
```

```dart
class MyClass {
  MyClass();
  factory MyClass.build() => MyClass();
}

void fn(MyClass obj) {}

fn(.new())
fn(.build())
```

2. Analyzer Plugins

```sh
flutter run -d web-server
flutter run -d chrome
```

# Web Improvements

web_dev_config.yaml

```yaml
server:
  host: '0.0.0.0'
  port: 8080
  https:
    cert-path: '/path/to/cert.pem'
    cert-key-path: '/path/to/key.pem'
  headers:
    - name: 'X-Custom-Header'
      value: 'MyValue'
    - name: 'Cache-Control'
      value: 'no-cache, no-store, must-revalidate'
  proxy:
    - target: 'http://localhost:3000/'
    - prefix: '/data/'
    - replace: '/report/'
```

Hot Reload on Web

```sh
flutter run --no-web-experimental-hot-reload
```

```sh
flutter config --enable-uiscene-migration
```

Improved app launching

```sh
flutter run
```

Dev Tool Updates

Framework Updates

Design Language Decoupling

- Remove Material/Cupertino out of framework

# Conclusion
