---
draft: false
date: 2016-11-31
title: 'Design Patterns: Factory'
summary: 'Provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created, promoting flexibility and reusability in object creation.'
tags: ['design patterns']
---

# Introduction

The Factory pattern is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. It abstracts the instantiation process, letting the client code rely on a common interface rather than concrete implementations, which promotes flexibility and maintainability.

## Purpose

Creates objects without specifying the exact class of the object that will be created.

## Use Cases

Object creation where subclasses decide which class to instantiate.

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

      # Abstract Product
      class Shape(ABC):
          @abstractmethod
          def draw(self):
              pass

      # Concrete Products
      class Circle(Shape):
          def draw(self):
              return "Drawing a Circle"

      class Square(Shape):
          def draw(self):
              return "Drawing a Square"

      # Factory
      class ShapeFactory:
          @staticmethod
          def get_shape(shape_type):
              if shape_type == "circle":
                  return Circle()
              elif shape_type == "square":
                  return Square()
              else:
                  raise ValueError("Unknown shape type")

      # Usage
      factory = ShapeFactory()
      shape1 = factory.get_shape("circle")
      shape2 = factory.get_shape("square")
      print(shape1.draw())  # Drawing a Circle
      print(shape2.draw())  # Drawing a Square
      ```

  </div>

  <div id="js" className="tabcontent">
      ```js {} showLineNumbers
      // Abstract Product is not enforced in JS, but we define concrete products
      class Circle {
          draw() {
              return "Drawing a Circle";
          }
      }

      class Square {
          draw() {
              return "Drawing a Square";
          }
      }

      // Factory
      class ShapeFactory {
          static getShape(shapeType) {
              if (shapeType === "circle") {
                  return new Circle();
              } else if (shapeType === "square") {
                  return new Square();
              } else {
                  throw new Error("Unknown shape type");
              }
          }
      }

      // Usage
      const shape1 = ShapeFactory.getShape("circle");
      const shape2 = ShapeFactory.getShape("square");
      console.log(shape1.draw()); // Drawing a Circle
      console.log(shape2.draw()); // Drawing a Square
      ```

  </div>

  <div id="dart" className="tabcontent">
      ```dart {} showLineNumbers
      // Abstract Product
      abstract class Shape {
        String draw();
      }

      // Concrete Products
      class Circle implements Shape {
        @override
        String draw() => "Drawing a Circle";
      }

      class Square implements Shape {
        @override
        String draw() => "Drawing a Square";
      }

      // Factory
      class ShapeFactory {
        static Shape getShape(String shapeType) {
          if (shapeType == "circle") {
            return Circle();
          } else if (shapeType == "square") {
            return Square();
          } else {
            throw ArgumentError("Unknown shape type");
          }
        }
      }

      // Usage
      void main() {
        var shape1 = ShapeFactory.getShape("circle");
        var shape2 = ShapeFactory.getShape("square");
        print(shape1.draw()); // Drawing a Circle
        print(shape2.draw()); // Drawing a Square
      }
      ```

  </div>

  <div id="ruby" className="tabcontent">
      ```ruby showLineNumbers
      # Abstract Product is not enforced in Ruby, but we define concrete products
      class Circle
          def draw
              "Drawing a Circle"
          end
      end

      class Square
          def draw
              "Drawing a Square"
          end
      end

      # Factory
      class ShapeFactory
          def self.get_shape(shape_type)
              case shape_type
              when "circle"
                  Circle.new
              when "square"
                  Square.new
              else
                  raise "Unknown shape type"
              end
          end
      end

      # Usage
      shape1 = ShapeFactory.get_shape("circle")
      shape2 = ShapeFactory.get_shape("square")
      puts shape1.draw # Drawing a Circle
      puts shape2.draw # Drawing a Square
      ```

  </div>
</div>
<br/>

# Conclusion

The Factory pattern is useful when your code needs to create objects dynamically without hard-coding their concrete classes. It simplifies object creation, encourages loose coupling, and makes it easier to introduce new types of objects or modify creation logic without affecting the client code. Common use cases include creating different shapes, database connections, or user interface components based on configuration or runtime conditions.
