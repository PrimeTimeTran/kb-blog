---
draft: false
date: 2016-11-31
title: 'Design Patterns: Singleton'
summary: 'Ensures a class has only one instance, providing a single point of access for shared resources like logging, configuration, or database connections.'
tags: ['design patterns']
---

# Introduction

The Singleton pattern is a design pattern that restricts the instantiation of a class to a single object. This ensures that there is one and only one instance of the class throughout the application, providing a global point of access to that instance. It is commonly used when exactly one object is needed to coordinate actions across the system.

## Purpose

Ensures that a class has only one instance and provides a global point of access to it.

## Use cases

- Database connections
- Logging
- Cache management
- Global state & more

<div className="tab-group">
  <div className="tab">
    <button id="python" className="tablinks">python</button>
    <button id="js" className="tablinks">javascript</button>
    <button id="dart" className="tablinks">dart</button>
    <button id="ruby" className="tablinks">ruby</button>
  </div>

    <div id="python" className="tabcontent">
        ```python {} showLineNumbers
        class Singleton:
            _instance = None

            def __new__(cls, *args, **kwargs):
                if not cls._instance:
                    cls._instance = super(Singleton, cls).__new__(cls, *args, **kwargs)
                return cls._instance

        # Usage
        obj1 = Singleton()
        obj2 = Singleton()
        print(obj1 is obj2)  # True
        ```
    </div>

    <div id="js" className="tabcontent">
        ```js {} showLineNumbers
        class Singleton {
            constructor() {
                if (Singleton.instance) {
                return Singleton.instance
                }
                Singleton.instance = this
            }
        }

        const obj1 = new Singleton()
        const obj2 = new Singleton()
        console.log(obj1 === obj2)
        ```
    </div>

    <div id="dart" className="tabcontent">
        ```dart {} showLineNumbers
        class Singleton {
            static final Singleton _instance = Singleton._internal();

            Singleton._internal();

            factory Singleton() {
                return _instance;
            }
        }

        // Usage
        void main() {
            var obj1 = Singleton();
            var obj2 = Singleton();
            print(obj1 == obj2);  // true
        }
        ```
    </div>

  <div id="ruby" className="tabcontent">
    ```ruby showLineNumbers
    class Logger
        @instance = new

        private_class_method :new

        def self.instance
            @instance
        end
    end

    log1 = Logger.instance
    log2 = Logger.instance
    puts log1 == log2  # true
    ```

  </div>
</div>

# Conclusion

The Singleton pattern provides a controlled way to ensure a single instance of a class exists and is accessible globally. It is especially useful for managing shared resources like database connections, configuration settings, logging, or caching, while keeping the design clean and preventing multiple conflicting instances.
