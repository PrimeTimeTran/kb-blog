---
draft: true
isDev: true
date: '2030-01-01'
title: 'TEST: Code Tab Groups'
summary: 'TESTING of Code Tab Groups rendering'
tags: ['test']
---

# Code Tab Groups Examples

## Dart

```tabgroup

!!!!!dart foo
int add(int a, int b) {
  return a + b;
}
dart!!!!!

!!!!!dart bar
class User {
  final String name;

  User(this.name);

  String greet() => "Hello $name";
}
dart!!!!!

!!!!!dart spam
enum Status { loading, success, error }
dart!!!!!

!!!!!dart ham
Future<String> fetchData() async {
  return "done";
}
dart!!!!!

!!!!!dart go/to/jam
List<int> squares = List.generate(10, (i) => i * i);
dart!!!!!
```

## Go

```tabgroup

!!!!!go 1
func add(a int, b int) int {
  return a + b
}
go!!!!!

!!!!!go 2
type User struct {
  Name string
}

func (u User) Greet() string {
  return "Hello " + u.Name
}
go!!!!!

!!!!!go 3
// slice
nums := []int{1, 2, 3}
go!!!!!

!!!!!go 4
// switch
switch x := 2; x {
case 1:
  fmt.Println("one")
case 2:
  fmt.Println("two")
}
go!!!!!

!!!!!go 5
// goroutine
go func() {
  fmt.Println("async")
}()
go!!!!!
```

## Javascript

```tabgroup

!!!!!js 1
function greet(name) {
  return `Hello, ${name}`
}
js!!!!!

!!!!!js 2
function sum(a, b) {
  return a + b
}
js!!!!!

!!!!!js 3
function isEven(n) {
  return n % 2 === 0
}
js!!!!!

!!!!!js 4
function factorial(n) {
  if (n <= 1) return 1
  return n * factorial(n - 1)
}
js!!!!!

!!!!!js 5
function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
js!!!!!
```

## Typescript

```tabgroup

!!!!!ts 1
// function
function add(a: number, b: number): number {
  return a + b
}
ts!!!!!

!!!!!ts 2
// class
class User {
  constructor(public name: string) {}

  greet() {
    return `Hello ${this.name}`
  }
}
ts!!!!!

!!!!!ts 3
// interface
interface Point {
  x: number
  y: number
}
ts!!!!!

!!!!!ts 4
// enum
enum Direction {
  Up,
  Down,
  Left,
  Right
}
ts!!!!!

!!!!!ts 5
// async
async function fetchData() {
  return await Promise.resolve("done")
}
ts!!!!!
```

## Python

```tabgroup

!!!!!py 1
# function
def add(a, b):
    return a + b
py!!!!!

!!!!!py 2
# class
class User:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello {self.name}"
py!!!!!

!!!!!py 3
# list comprehension
squares = [x * x for x in range(10)]
py!!!!!

!!!!!py 4
# dict
data = {"a": 1, "b": 2}
py!!!!!

!!!!!py 5
# async
async def fetch_data():
    return "done"
py!!!!!
```

## Rust

```tabgroup

!!!!!rs 1
fn add(a: i32, b: i32) -> i32 {
    a + b
}
rs!!!!!

!!!!!rs 2
struct User {
    name: String,
}

impl User {
    fn greet(&self) -> String {
        format!("Hello {}", self.name)
    }
}
rs!!!!!

!!!!!rs 3
enum Status {
    Loading,
    Success,
    Error,
}
rs!!!!!

!!!!!rs 4
match 2 {
    1 => println!("one"),
    2 => println!("two"),
    _ => println!("other"),
}
rs!!!!!

!!!!!rs 5
let v: Vec<i32> = vec![1, 2, 3];
rs!!!!!
```

## Ruby

```tabgroup

!!!!!rb 1
def add(a, b)
  a + b
end
rb!!!!!

!!!!!rb 2
class User
  def initialize(name)
    @name = name
  end

  def greet
    "Hello #{@name}"
  end
end
rb!!!!!

!!!!!rb 3
# array
nums = [1, 2, 3]
rb!!!!!

!!!!!rb 4
# hash
data = { a: 1, b: 2 }
rb!!!!!

!!!!!rb 5
# block
[1,2,3].each do |n|
  puts n
end
rb!!!!!
```
