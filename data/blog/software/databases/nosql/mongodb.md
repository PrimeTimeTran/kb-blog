---
draft: false
date: '2018-08-06'
title: 'Top 10 MongoDB CLI Commands Every Developer Should Know'
summary: 'Master MongoDB’s CLI with these essential commands for exploring databases, managing collections, and running queries like a pro.'
tags: ['databases', 'mongodb']
---

# Introduction

MongoDB is a powerful NoSQL database designed for flexibility and scalability. Whether you're a backend developer, a full-stack engineer, or just diving into databases, the MongoDB CLI (`mongosh`) is a crucial tool to have in your toolkit.

In this post, we’ll go over 10 essential MongoDB CLI commands that will help you interact with databases, query data, and manage your collections efficiently.

---

# 1. Connect to the Database

```sh
mongosh
```

Launch the MongoDB Shell (or connect to a remote server using `mongosh "mongodb+srv://your-uri"`).

---

# 2. Show All Databases

```js
show dbs
```

Lists all available databases on the connected server.

---

# 3. Switch or Create a Database

```js
use myDatabase
```

Switch to `myDatabase`. If it doesn’t exist yet, MongoDB will create it when you insert the first document.

---

# 4. Show All Collections in a Database

```js
show collections
```

Displays all collections (similar to tables) in the current database.

---

# 5. Insert a Document

```js
db.users.insertOne({ name: 'Alice', age: 30, email: 'alice@example.com' });
```

Inserts a single document into the `users` collection.

---

# 6. Find Documents

```js
db.users.find();
```

Returns all documents in the `users` collection. You can also add a filter:

```js
db.users.find({ age: { $gt: 25 } });
```

Finds users older than 25.

---

# 7. Update a Document

```js
db.users.updateOne({ name: 'Alice' }, { $set: { age: 31 } });
```

Updates the age of the user named Alice.

---

# 8. Delete a Document

```js
db.users.deleteOne({ name: 'Alice' });
```

Deletes the first document that matches the query.

---

# 9. Count Documents

```js
db.users.countDocuments();
```

Returns the total number of documents in the collection.

You can also filter:

```js
db.users.countDocuments({ age: { $gt: 25 } });
```

---

# 10. Create an Index

```js
db.users.createIndex({ email: 1 });
```

Creates an ascending index on the `email` field to improve query performance.

---

# Conclusion

These MongoDB CLI commands form the foundation of your daily database interactions. Whether you're setting up collections, querying data, or optimizing performance, having these commands at your fingertips makes working with MongoDB smooth and productive.

Stay tuned for more posts diving deeper into MongoDB — including aggregation pipelines, schema design tips, and performance tuning.

---

```

Let me know if you’d like to export this as a `.md` file or convert it to HTML/PDF.
```
