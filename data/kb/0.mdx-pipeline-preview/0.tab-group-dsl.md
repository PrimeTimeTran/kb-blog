---
draft: false
---
```tabgroup
!!!!!!!py
def hello_world():
    print("Hello world")
py!!!!!!!

!!!!!js
function helloWorld() {
  console.log('Hi world')
}
js!!!!!

!!!!!go
func climbStairs(n int) int {
  if n == 1 {
    return n
  }

  one := 1
  two := 2

  for i := 3; i < n + 1; i++ {
    tmp := one + two
    one = two
    two = tmp
  }
  return two
}
go!!!!!
```
