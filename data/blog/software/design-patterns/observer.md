---
draft: false
date: 2016-11-31
title: 'Design Patterns: Observer'
summary: 'Defines a one-to-many dependency between objects, so when one object changes state, all its dependents are notified and updated automatically.'
tags: ['design patterns']
---

# Introduction

The Observer pattern is a behavioral design pattern that defines a one-to-many dependency between objects. When the state of one object (the subject) changes, all its dependent objects (observers) are automatically notified and updated. This pattern promotes loose coupling, allowing objects to interact without needing to know the details of each other’s implementation.

## Purpose

One-to-many relationship where one change is observed and triggers updates to its dependents.

## Use Cases

- Event handling
- Email notifications
- Live updates.

<div className="tab-group">
  <div className="tab">
    <button id="python" className="tablinks">python</button>
    <button id="js" className="tablinks">javascript</button>
    <button id="dart" className="tablinks">dart</button>
    <button id="ruby" className="tablinks">ruby</button>
  </div>

  <div id="python" className="tabcontent">
      ```python {} showLineNumbers
      from abc import ABC, abstractmethod

      # Subject
      class Subject:
          def __init__(self):
              self._observers = []

          def attach(self, observer):
              self._observers.append(observer)

          def detach(self, observer):
              self._observers.remove(observer)

          def notify(self):
              for observer in self._observers:
                  observer.update()

      # Observer
      class Observer(ABC):
          @abstractmethod
          def update(self):
              pass

      # Concrete Observers
      class ConcreteObserverA(Observer):
          def update(self):
              print("Observer A: Reacted to the event.")

      class ConcreteObserverB(Observer):
          def update(self):
              print("Observer B: Reacted to the event.")

      # Usage
      subject = Subject()
      observer_a = ConcreteObserverA()
      observer_b = ConcreteObserverB()

      subject.attach(observer_a)
      subject.attach(observer_b)

      subject.notify()  # Both observers react
      subject.detach(observer_a)
      subject.notify()  # Only observer B reacts
      ```

  </div>

  <div id="js" className="tabcontent">
      ```js {} showLineNumbers
      // Subject
      class Subject {
          constructor() {
              this.observers = [];
          }

          attach(observer) {
              this.observers.push(observer);
          }

          detach(observer) {
              this.observers = this.observers.filter(obs => obs !== observer);
          }

          notify() {
              this.observers.forEach(observer => observer.update());
          }
      }

      // Observer
      class Observer {
          update() {
              throw new Error("Method 'update()' must be implemented.");
          }
      }

      // Concrete Observers
      class ConcreteObserverA extends Observer {
          update() {
              console.log("Observer A: Reacted to the event.");
          }
      }

      class ConcreteObserverB extends Observer {
          update() {
              console.log("Observer B: Reacted to the event.");
          }
      }

      // Usage
      const subject = new Subject();
      const observerA = new ConcreteObserverA();
      const observerB = new ConcreteObserverB();

      subject.attach(observerA);
      subject.attach(observerB);

      subject.notify(); // Both observers react
      subject.detach(observerA);
      subject.notify(); // Only Observer B reacts
      ```

  </div>

  <div id="dart" className="tabcontent">
      ```dart {} showLineNumbers
      // Subject
      class Subject {
        final List<Observer> _observers = [];

        void attach(Observer observer) {
          _observers.add(observer);
        }

        void detach(Observer observer) {
          _observers.remove(observer);
        }

        void notify() {
          for (var observer in _observers) {
            observer.update();
          }
        }
      }

      // Observer
      abstract class Observer {
        void update();
      }

      // Concrete Observers
      class ConcreteObserverA implements Observer {
        @override
        void update() {
          print("Observer A: Reacted to the event.");
        }
      }

      class ConcreteObserverB implements Observer {
        @override
        void update() {
          print("Observer B: Reacted to the event.");
        }
      }

      // Usage
      void main() {
        final subject = Subject();
        final observerA = ConcreteObserverA();
        final observerB = ConcreteObserverB();

        subject.attach(observerA);
        subject.attach(observerB);

        subject.notify(); // Both observers react
        subject.detach(observerA);
        subject.notify(); // Only Observer B reacts
      }
      ```

  </div>

  <div id="ruby" className="tabcontent">
      ```ruby showLineNumbers
      # Subject
      class Subject
          def initialize
              @observers = []
          end

          def attach(observer)
              @observers << observer
          end

          def detach(observer)
              @observers.delete(observer)
          end

          def notify
              @observers.each(&:update)
          end
      end

      # Observer
      class Observer
          def update
              raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
          end
      end

      # Concrete Observers
      class ConcreteObserverA < Observer
          def update
              puts "Observer A: Reacted to the event."
          end
      end

      class ConcreteObserverB < Observer
          def update
              puts "Observer B: Reacted to the event."
          end
      end

      # Usage
      subject = Subject.new
      observer_a = ConcreteObserverA.new
      observer_b = ConcreteObserverB.new

      subject.attach(observer_a)
      subject.attach(observer_b)

      subject.notify # Both observers react
      subject.detach(observer_a)
      subject.notify # Only Observer B reacts
      ```

  </div>
</div>

<br/>
# Conclusion
The Observer pattern is ideal for scenarios where multiple components need to stay synchronized with a single source of truth. It is commonly used in event handling systems, GUI frameworks, messaging systems, and any situation where changes in one object should automatically propagate to others, improving maintainability and scalability.
