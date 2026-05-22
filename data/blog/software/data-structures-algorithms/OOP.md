---
draft: false
date: '2021-10-07'
title: 'Object Oriented Programming'
summary: 'The principles which guide object oriented programming'
tags: ['data structures', 'object oriented programming']
---

# Introduction

Object-Oriented Programming (OOP) is a programming paradigm that focuses on organizing code into objects that represent real-world entities and the actions that can be performed on them. The objects can contain data (attributes) and behavior (methods) and interact with one another through method calls. OOP also uses concepts like inheritance and polymorphism, which allows objects of related classes to share attributes and behavior, and be treated as objects of their parent class. This helps to reduce code duplication and make code more modular, organized, and easier to maintain. OOP is a widely-used programming paradigm and is supported by many popular programming languages such as Java, Python, C++, and Ruby.

<TOCInline toc={props.toc} exclude="Overview" toHeading={2} />

## Abstraction

The abstraction principle in Object-Oriented Programming (OOP) is a fundamental concept that allows for hiding the implementation details of an object and exposing only the relevant information to the outside world. The idea behind abstraction is to simplify the complex system by hiding its internal workings and presenting only the necessary details to the user. This is achieved through the creation of abstract classes and interfaces that define the general behavior of a group of related objects and provide a blueprint for creating concrete implementations.

Abstraction is a key aspect of OOP that helps to achieve modularity and maintainability of code. By encapsulating the internal details of an object and exposing only its public interface, it becomes easier to change the implementation of the object without affecting other parts of the system. This allows for greater flexibility and control over the code, and reduces the risk of introducing bugs or breaking existing functionality.

In summary, the abstraction principle in OOP allows developers to separate the implementation details of an object from its behavior and provides a way to interact with objects through a well-defined interface, making the code more maintainable, scalable, and easier to understand.

### Negatives

- Software/requirements will change. Thus we cannot anticipate where we'll need to "cut". Do not draw boundaries too early.
  - Wrong abstraction is worse than no abstraction.
  - Programs evolve and tech debt builds up. Wrong decisions get magnified over time.
  - Waiting and seeing, learning more has a lot of value.

- Decomposing requires naming of all steps. It's really hard when we don't know the entire list of requirements.
  - If we name it incorrectly, people might begin to use it incorrectly.

## Encapsulation

Encapsulation is one of the fundamental concepts of Object-Oriented Programming (OOP) that refers to the practice of grouping together data and functions (known as methods) into a single unit or object. The goal of encapsulation is to protect the internal state of an object from accidental modification by external code, while providing a public interface for accessing and manipulating the data.

Encapsulation can be achieved by declaring the data fields of an object as private and providing public methods for accessing and manipulating the data. This allows for better control over the internal state of the object and prevents external code from modifying the data in unintended ways. By encapsulating the data and behavior within a single object, OOP makes it easier to reason about the code and reduces the risk of introducing bugs.

In encapsulation, the internal representation of an object is hidden from the outside world, and the object can only be manipulated through its public interface. This provides a level of abstraction that makes it easier to understand the code and reduces coupling between different parts of the system.

Encapsulation is a powerful mechanism for enforcing modularity and information hiding, making it easier to maintain and extend the code over time. It also supports the principle of encapsulation, as objects can be changed internally without affecting other parts of the system, as long as the public interface remains the same.

In summary, encapsulation is an important aspect of OOP that provides a mechanism for grouping together data and behavior within an object, hiding the internal representation of the object, and exposing a public interface for accessing and manipulating the data. This helps to promote modularity, maintainability, and reliability in code.

> Why is this bad?

```js
const bike = {
  wheels: [
    { psi: 200, diameter: 22 },
    { psi: 200, diameter: 22 },
    { psi: 200, diameter: 22 },
    { psi: 200, diameter: 22 },
  ],
};

bike.inflateWheels = function () {
  this.forEach((wheel) => (wheel.psi += 50));
};
```

Data inconsistency when something outside of class can change a property of an object

What if other team is in control of wheels and they switch from imperial to metric?
What if we need to have side effects when wheels are inflated?

```js
const bike = {
  wheels: [
    { psi: 200, diameter: 22 },
    { psi: 200, diameter: 22 },
    { psi: 200, diameter: 22 },
    { psi: 200, diameter: 22 },
  ],
};

bike.inflateWheels = function () {
  this.forEach((wheel) => wheel.inflate());
};
```

- Send message
- Allows wheel to define anything that will ever happen when it's inflated(callbacks, validatations, rescues.)

- Refers to bundling data with methods that can operate on that data within a class.
- It’s the idea of hiding data within a class, preventing anything outside that class directly interacting with it.
- Keeps the programmer in control of access to data.
- Prevents the programmer from ending up in any strange or unwanted states.

## Inheritance

Inheritance is a fundamental concept in Object-Oriented Programming (OOP) that allows for creating a new class based on an existing class. The new class, known as the subclass or derived class, inherits all the attributes and behaviors of the existing class, known as the superclass or base class. This allows for code reuse and reduces duplication, making the code more maintainable and easier to understand.

Inheritance provides a way to model a hierarchy of classes that reflect real-world relationships. For example, if you have a base class "Animal" that defines common attributes and behaviors for all animals, you can create subclasses such as "Cat" and "Dog" that inherit the attributes and behaviors of "Animal" and add their own unique attributes and behaviors.

By using inheritance, you can create a relationship between classes that reflects the real-world relationships between objects. This makes the code more modular and scalable, as you can create new classes based on existing ones without having to write the same code multiple times.

Inheritance also provides a way to reuse and override the behavior of the base class. The subclass can inherit the attributes and behaviors of the base class and provide its own implementation for specific methods. This allows the subclass to have a different behavior compared to the base class while still retaining the common behavior inherited from the base class.

In summary, inheritance is a fundamental aspect of OOP that allows for creating new classes based on existing ones, inheriting the attributes and behaviors of the base class, and providing a way to reuse and override the behavior of the base class. This makes the code more modular, scalable, and maintainable, and provides a way to model real-world relationships between objects.

## Polymorphism

- Describes methods that are able to take on many forms.
- Allows methods to take on many different forms.
- Be sure that you are calling the correct form of the method.
- There are two types of polymorphism:
  ** Dynamic polymorphism: - Occurs during the runtime of the program. - Describes when a method signature is in both subclass and a superclass. - The methods share the same name but have different implementation. - The implementation of the subclass that the object is an instance of
  overrides that of the superclass.
  ** Static polymorphism: - Occurs during compile-time rather than during runtime. - Refers to when multiply methods with the same name but different arguments
  are defined in the same class. - The parameters are different type or taken in different order. - This is known as method overloading.
