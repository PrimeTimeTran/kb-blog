---
draft: false
date: 2016-11-31
title: 'Design Patterns: Repository'
summary: 'Encapsulates the logic for accessing and managing data sources, providing a centralized interface for data operations while promoting separation of concerns and improving testability.'
tags: ['design patterns']
---

# Introduction

The repository pattern is a design pattern used to abstract the data access layer from the business logic of an application. By using repositories, you can interact with data without needing to know the details of how the data is stored or retrieved. This promotes separation of concerns, testability, and flexibility in choosing or changing data storage strategies without impacting the rest of the codebase.

## Purpose

Provides a consistent interface to manage data access, abstracting away the details of how data is stored or retrieved. Promotes separation of concerns, testability, and flexibility in changing storage mechanisms.

## Use Cases

- Abstracting database operations to allow swapping between SQL, NoSQL, or in-memory storage.
- Testing business logic without relying on real databases.
- Centralizing data access logic for complex applications.
- Managing collections of objects in memory with a consistent interface.

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

      # Abstract Repository
      class Repository(ABC):
          @abstractmethod
          def add(self, item):
              pass

          @abstractmethod
          def get(self, item_id):
              pass

      # Concrete Repository
      class InMemoryRepository(Repository):
          def __init__(self):
              self._data = {}

          def add(self, item):
              self._data[item["id"]] = item

          def get(self, item_id):
              return self._data.get(item_id)

      # Usage
      repo = InMemoryRepository()
      repo.add({"id": 1, "name": "Item 1"})
      print(repo.get(1))  # Output: {'id': 1, 'name': 'Item 1'}
      ```

  </div>

  <div id="js" className="tabcontent">
      ```js {} showLineNumbers
      // Abstract Repository is not enforced in JS, but we define a concrete repository
      class InMemoryRepository {
          constructor() {
              this.data = new Map();
          }

          add(item) {
              this.data.set(item.id, item);
          }

          get(itemId) {
              return this.data.get(itemId);
          }
      }

      // Usage
      const repo = new InMemoryRepository();
      repo.add({ id: 1, name: "Item 1" });
      console.log(repo.get(1)); // Output: { id: 1, name: "Item 1" }
      ```

  </div>

  <div id="dart" className="tabcontent">
      ```dart {} showLineNumbers
      // Abstract Repository
      abstract class Repository<T> {
        void add(T item);
        T? get(int id);
      }

      // Concrete Repository
      class InMemoryRepository<T> implements Repository<T> {
        final Map<int, T> _data = {};

        @override
        void add(T item) {
          if (item is Map && item.containsKey("id")) {
            _data[item["id"]] = item;
          }
        }

        @override
        T? get(int id) {
          return _data[id];
        }
      }

      // Usage
      void main() {
        final repo = InMemoryRepository<Map<String, dynamic>>();
        repo.add({"id": 1, "name": "Item 1"});
        print(repo.get(1)); // Output: {id: 1, name: Item 1}
      }
      ```

  </div>

  <div id="ruby" className="tabcontent">
      ```ruby showLineNumbers
      # Abstract Repository is not enforced in Ruby, but we define a concrete repository
      class InMemoryRepository
          def initialize
              @data = {}
          end

          def add(item)
              @data[item[:id]] = item
          end

          def get(item_id)
              @data[item_id]
          end
      end

      # Usage
      repo = InMemoryRepository.new
      repo.add({ id: 1, name: "Item 1" })
      puts repo.get(1) # Output: {:id=>1, :name=>"Item 1"}
      ```

  </div>
</div>

<br />

# Conclusion

In this example, the Repository abstract class defines a consistent interface for data access, while InMemoryRepository provides a concrete implementation using an in-memory dictionary. The repository pattern allows you to swap out the storage mechanism later—such as using a database or an external API—without changing the parts of your application that rely on the repository. This makes your code more modular, maintainable, and easier to test.
