---
draft: false
date: '2025-04-20'
title: 'System Design: Build a auditing solution for collecting metadata on users of your system.'
summary: "Create an auditing system for enterprise applications which tracks user requests, resources touched & action taken. Reuse logic by leveraging hooks so that code is clean & concise. By utilizing middlewares, events & closures we're able to capture the details of requests on all our resources without duplicating code."
tags: ['system design', 'Nuxt.JS']
---

# Introduction

The design specs in this demo are common in enterprise applications.

- Implement auditing that saves meta data to the DB on requests to a resource `AuditLog`.
- `AuditLog` stores:
  - Resource acted on.
  - User who made the request.
  - Method called
  - Timestamps

The requirements sound simple enough but require a few advanced techniques to arrive at an elegant solution.

[Github Repo](https://github.com/PrimeTimeTran/system_design_auditing)

### 1. Initialize Project

We'll use [Nuxt.JS](https://nuxt.com/) for this project as it's convention over configuration approach makes
it a breeze to work with. Remember good old [Rails](https://rubyonrails.org/) anyone?!

```sh
npm create nuxt nuxt_auditing_system
cd nuxt_auditing_system
npm run dev
```

### 2. Install dependencies

We use token based authentication as this is industry standard & allows us to
audit users from any platform whether it be web, desktop, mobile or system much more easily.

```sh
npm i jsonwebtoken @types/jsonwebtoken
```

### 3. Define JWT Token for security

Nothing fancy, just defining the logic for signing and verifying tokens which'll helps us
identify the users of our resources.

```ts:./server/utils/token.ts
import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

export function jwtSign(payload: any, expiresIn?: string | number | null) {
  let expiresInOrNull: string | number | null =
    expiresIn || process.env.AUTH_TOKEN_EXPIRES_IN || '3650 days'

  if (expiresInOrNull === Infinity) {
    expiresInOrNull = null
  }

  return jwt.sign(
    payload,
    String(process.env.AUTH_TOKEN_SECRET),
    expiresInOrNull
      ? {
          expiresIn: expiresInOrNull,
        }
      : undefined
  )
}

export interface Payload {
  email?: string
  token?: string
}

export type PayloadObj = string | JwtPayload | Payload | null

export function jwtVerify(token: string): PayloadObj | null {
  try {
    const payload: PayloadObj = jwt.verify(token, String(process.env.AUTH_TOKEN_SECRET))
    return payload
  } catch (error) {
    return null
  }
}
```

### 4. Add .env file

Dont hardcode values in your code. Define a var `AUTH_TOKEN_SECRET` inside of a root `.env` file.

```ts:./.env
AUTH_TOKEN_SECRET="MySecret"
```

### 5. Test Sign & Verify using script

Ensure that the token creation and verification work via script before adding another layer of abstraction(MVC/API).

```ts:./server/script.ts
import { jwtSign, jwtVerify } from './utils/token'

async function main() {
  const token = await jwtSign({
    email: 'dev@ltran.net',
  })

  console.log({ token })

  const user = await jwtVerify(token)

  console.log({ user })
}

main()
```

```sh
npx tsx server/script.ts
```

We should now see that we're able to encode our `user` object with `jwtSign`.
After doing that we're returned a `token` which we can pass to `jwtVerify` to get back
our initial `user` object.

```sh
$ npx tsx server/script.ts
{
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvaUBsdHJhbi5uZXQiLCJpYXQiOjE3NDUxMDk2MTcsImV4cCI6MjA2MDQ2OTYxN30.V6tHkhphtu7BsWsGVxTBrb8kMfGQuFVv_8BgcsW85tg'
}
{ user: { email: 'loi@ltran.net', iat: 1745109617, exp: 2060469617 } }
```

### 6. Define API for resources

Create an entrypoint API which'll be accessed by users of the system. In this case [REST](https://developer.mozilla.org/en-US/docs/Glossary/REST).

```ts:./server/api/index.get.ts
export default defineEventHandler(async () => {
  return {
    wizards: ['Harry', 'Hermione', 'Ron'],
  }
})
```

We can now request JSON at our APIs index route.

```sh
curl -i -H "Accept: application/json" http://localhost:3001/api

HTTP/1.1 200 OK
content-type: application/json
date: Sun, 20 Apr 2025 01:00:20 GMT
connection: close
content-length: 61

{
  "wizards": [
    "Harry",
    "Hermione",
    "Ron"
  ]
}
```

So we now have an API which serves resources to clients.

### 7. Add Middlewares(2) to grab token from request headers & decode the user object out of the payload

Run reuseable logic for each inbound request.

The file naming is meaningful Nuxt executes the middlewares in ascending order. Thus files beginning with `00` run before `01`.
So we'll extract the token first then use it to query our DB for our user.

`00.headers.global.js` reads a token from the header and injects it into the event context.

```ts:./server/middlewares/00.headers.global.js
export default defineEventHandler((e) => {
  const authHeader = getHeader(e, 'authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    e.context.token = authHeader.slice(7)
  }
})
```

`01.user.global.js` uses the collected token to find the `User` accessing our system.

```ts:./server/middlewares/01.user.global.js
import { User } from '../models/User.model'

export default defineEventHandler(async (e) => {
  const user = jwtVerify(e.context.token)

  console.log({ user })

  if (user) {
    const id = user.userId
    const me = await User.findById(id).exec()
    e.context.user = me
  }
})
```

Test with the token we created earlier(Step 5.) in the headers following best practices.

```sh
$ curl -i -H "Accept: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvaUBsdHJhbi5uZXQiLCJpYXQiOjE3NDUxMTI1MDAsImV4cCI6MjA2MDQ3MjUwMH0.m66vk-I0HJhJOU9vcz61zrQzI_Mbnr-50P8B-_DQqNo" http://localhost:3001/api
HTTP/1.1 200 OK
content-type: application/json
date: Sun, 20 Apr 2025 01:28:59 GMT
connection: close
content-length: 61

{
  "wizards": [
    "Harry",
    "Hermione",
    "Ron"
  ]
}
```

### 8. Install Nuxt Mongoose

Install Mongoose as our DB.

```sh
npm i nuxt-mongoose
```

Add required setup configuration to `./nuxt.config.js`.

```js:./nuxt.config.js
mongoose: {
  options: {},
  modelsDir: 'models',
  uri: process.env.MONGODB_URI,
},
```

Add the following variable to your `.env` file.

```ts:./.env
MONGODB_URI = 'mongodb://localhost:27017/user-audit'
```

### 9. Add Models for Auditing

The crux of this system design.
When resources are touched a hook will fire which ultimately records meta data to our `auditlogs` collection.

1. We define a resource(User) which triggers hooks by passing it's schema to our `Auditor`
2. We define a resource(Auditlog) which stores the data we want on API requests.
3. We define our workhorse audit middleware which triggers a closure that captures the API request event.
4. We define reuseable methods `createEntry`, `createHook`, `addHooks` which handle building the log which is eventually stored in our DB.

<div className="tab-group">
  <div className="tab">
    <button id="#1" className="tablinks">1. Create example `User` resource</button>
    <button id="#2" className="tablinks">2. Define DB `Audit` resource</button>
    <button id="#3" className="tablinks">3. Define `Audit` Middleware</button>
    <button id="#4" className="tablinks">4. Define reuseable hooks & helpers</button>
  </div>

  <div id="#1" className="tabcontent">
    ```js:./server/models/User.model.js {} showLineNumbers {20}
    import mongoose, { Schema } from 'mongoose'
    import { Auditor } from './Audit'

    const userSchema = new Schema({
      email: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
    })

    userSchema.virtual('fullName').get(function () {
      return `${this.firstName} ${this.lastName}`
    })

    Auditor.addHooks(userSchema)

    export { userSchema }
    export const User = mongoose.model('User', userSchema)

    // 1. We invoke `addHooks` of Auditor passing in the current resource's schema.
    // 2. Auditor defines the hooks of this resource during build/initialization time.
    // 3. Downstream, when a `save`, `update`, or `remove` event is detected helper methods defined within `Auditor` are triggered producing required behavior.
    ```

  </div>

  <div id="#2" className="tabcontent">
    ```js:./server/models/AuditLog.model.js {} showLineNumbers
    import mongoose, { Schema } from 'mongoose'

    export const auditLogSchema = new Schema({
      actorId: String,
      actorEmail: String,
      actorFirstName: String,
      action: String,
      model: String,
      documentId: String,
      data: Map,
      timestamp: { type: Date, default: Date.now },
    })

    export const AuditLog = mongoose.model('AuditLog', auditLogSchema)

    // 1. Nothing fancy here. `AuditLog` is schema definition which'll store metadata
    //    related to each event for auditing.
    ```

  </div>

  <div id="#3" className="tabcontent">
    ```js:./server/middleware/02.audit.global.js {} showLineNumbers {5-12, 20}
    let closure = () => {}

    export function captureEvent(val) {
      let event = val
      closure = function () {
        const user = {
          id: event?.user?._id || '1',
          email: event?.user?.email || 'dev@ltran.net',
          firstName: event?.user?.firstName || 'cleverprogrammer',
        }
        return user
      }
      return closure
    }

    export { closure }

    export default defineEventHandler(async (e) => {
      try {
        captureEvent(e)
      } catch (error) {
        logger.error({ err: error }, 'Error:')
      }
    })

    // 1. We define a closure, `captureEvent()`, which wraps `closure()`.
    // 2. When closure() is invoked by a hook it has access to the event object
    //    which was available when captureEvent() was invoked(by our middleware)
    // 3. Thus we now have access to the user making the request within every resource.
    ```

  </div>
  <div id="#4" className="tabcontent">
    ```js:./server/models/Auditor.js {} showLineNumbers {4, 20, 27}
    import { closure } from '../middleware/02.audit.global.js'

    export class Auditor {
      static async createEntry(modelName, action, user, doc) {
        try {
          const auditLogEntry = await new AuditLog({
            actorId: user.id,
            actorEmail: user.email,
            actorFirstName: user.firstName,
            action,
            model: modelName,
            documentId: doc._id,
          })
          await auditLogEntry.save()
        } catch (error) {
          console.log({ error })
        }
      }

      static createHook(hook) {
        return async function () {
          const user = closure()
          const modelName = this.constructor.modelName
          await Auditor.createEntry(modelName, hook, user, this)
        }
      }
      static addHooks(schema) {
        schema.post('save', this.createHook('create'))
        schema.post('update', this.createHook('update'))
        schema.post('remove', this.createHook('delete'))
      }
    }

    // The logic for auto creating `AuditLog` documents in our DB.
    // We add 3 hooks, save, update, remove which all invoke createHook when those events
    // are detected. The createHook method then invokes the closure which captured the request event.

    // From the event we're able to ascertain the user and then create a document
    // in the `AuditLog` collection with `createEntry`.
    ```

  </div>
</div>

### 10. Trigger Create/Save Hook

By creating an instance of `User` when this endpoint is hit we'll trigger our hooks behind the scenes.

```js:./server/api/index.get.ts showLineNumbers {2-6}
export default defineEventHandler(async () => {
  const user = await new User({
    firstName: 'Loi',
    lastName: 'Tran',
    email: 'dev@ltran.net',
  }).save()
  return {
    wizards: ['Harry', 'Hermione', 'Ron'],
  }
})
```

Test the endpoint with another `curl` request to create a `User` & trigger an `AuditLog` document to be created as `User` is observed.

```sh
curl -i -H "Accept: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvaUBsdHJhbi5uZXQiLCJpYXQiOjE3NDUxMTI1MDAsImV4cCI6MjA2MDQ3MjUwMH0.m66vk-I0HJhJOU9vcz61zrQzI_Mbnr-50P8B-_DQqNo" http://localhost:3001/api
HTTP/1.1 200 OK
```

Now you should see that each time you hit that endpoint a new document is created in our `AuditLog` collection because the creation of a `User` document triggered
the hooks we defined inside of `Auditor` of `./server/models/Audit.js`.

<img src="/static/gifs/auditing.gif" alt="Completed" />

# Conclusion

With knowledge of middlewares, events, & closures we're able to track the utilization of our system & history of changes
across all resources quickly & easily.

- With hooks we don't duplicate code
- With the `captureEvent` closure we're able to detect the `User` making the request.
  - We **must** define a placeholder function `closure` which is referenced inside of the hooks because it will be passed to Mongo's hook helpers.
  - When `captureEvent` is triggered it overwrites `closure` capturing the event object which contains the details about the user making the request(their token).
  - With this approach we're able to build our resources/schemas up and then eventually use a value which we don't have at build time(requesting user's token/email).

### Dive Deeper: Closure's Usecase Explanation

From examples online we know that a closure is a function which wraps an inner variable
& returns a function which can "see" the wrapped variable.

```js showLineNumbers
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add3 = makeAdder(3);

console.log(add5(2)); // 5 + 2 = 7
console.log(add3(2)); // 3 + 2 = 5
```

In this example when we initialize our closure by calling `makeAdder`. We pass it a value which is wrapped meaning we can access it later. We then invoke the returned anonymous function from the closure with a new value which sums with the wrapped variable, producing our result.

The general idea is a function that "remembers" a variable & returns a function which subsequently accesses the initial variable.

However this example is contrived. That's why I built this example auditing project/module because it demonstrates how closures can help to propagate values to places that we need them.

Specifically, when the app is started we create a placeholder function, `closure()` which is fed into each of our system's resources/models. We do so in order to enable lifecycle hooks to access run time values which aren't available when the models are initialized. When `captureEvent` is triggered in our middleware it captures the request `event` containing requester meta data. Then in the event that a save, update or remove to our resource is triggered then the hook invokes the closure which was reassigned to the placeholder `closure()` encapsulating user data in the scope of the function calls.
