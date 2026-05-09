---
draft: false
date: '2023-05-26'
title: 'System Design: SQL Server setup using Azure SQL Edge Docker image'
summary: 'How to setup SQL Server using Azure SQL Edge docker image and check its working correctly. Snippets of TSQL'
tags: ['system design', 'sql server']
---

# Introduction

A SQL Server setup guide.

Shout out this [blog post](https://www.mssqltips.com/sqlservertip/7432/sql-cheat-sheet-sql-server-tsql-commands/).

## Tools

- Docker
- [SQL Server(using Azure SQL Edge image)](https://hub.docker.com/_/microsoft-azure-sql-edge)

## Steps

- Run SQL Sever container using Docker image. Specifically for M1
  architecture with the `--platform linux/arm64/v8` flag.

  ```sh
  docker run -d --name mssql-server --platform linux/arm64/v8 -e ACCEPT_EULA=Y -e SA_PASSWORD=reallyStrongPwd123 -p 1433:1433 mcr.microsoft.com/azure-sql-edge
  ```

- SSH into db.

  ```sh
  sqlcmd -U sa -P reallyStrongPwd123 -S 127.0.0.1,1433 -C
  ```

- Create database. SQL Server uses TSQL, a SQL variant. Run `GO` after each query
  for it to execute.

  ```sql
  create database RSE;
  GO
  ```

- Switch to database context, RSE, the database we just created.

  ```sql
  use RSE;
  GO
  ```

- View tables.

  ```sql
  SELECT name FROM sys.tables;
  GO
  ```

- Create database table `Employees`.

  ```sql
  CREATE TABLE [dbo].[Employees](
    [EmpNum] [int] PRIMARY KEY,
    [FirstName] [nvarchar](30) NOT NULL,
    [LastName] [nvarchar](30) NOT NULL,
    [MiddleInitial] [nchar](1) NULL,
    [Job] [int] NOT NULL
  );
  GO
  ```

- Seed employee data.

  ```sql
  INSERT [dbo].[Employees]([EmpNum], [FirstName], [LastName], [MiddleInitial], [Job])
  VALUES(1001, 'Robert', 'Smith', '', 1);
  INSERT [dbo].[Employees]([EmpNum], [FirstName], [LastName], [MiddleInitial], [Job])
  VALUES(1002, 'Sue', 'Jones', '', 5);
  INSERT [dbo].[Employees]([EmpNum], [FirstName], [LastName], [MiddleInitial], [Job])
  VALUES(1003, 'Alan', 'Doe', 'A', 3);
  INSERT [dbo].[Employees]([EmpNum], [FirstName], [LastName], [MiddleInitial], [Job])
  VALUES(1004, 'Tim', 'Kelly', '', 2);
  INSERT [dbo].[Employees]([EmpNum], [FirstName], [LastName], [MiddleInitial], [Job])
  VALUES(1005, 'Louis', 'Sullivan', '', 2);
  GO
  ```

- View all employee rows.

  ```sql
  SELECT * From Employees;
  GO
  ```

- Voila!

![previews](https://i.imgur.com/QGasihe.png)
