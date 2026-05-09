---
draft: false
date: 2020-06-1
title: 'Project: Royal Stock Exchange(RSE) - Seeding Stock Market data in SQL - Part 2'
summary: 'Seeding database records for our clients, understanding our records data types, and validating/designing relationships between resources.'
tags: ['project', 'sql', 'sql server']
---

# Introduction

It's always a good idea to have some reasonable dummy data for testing.

I always find it useful to create a script to run on my machine in order
to not only generate data which I can query, but to help in the process
of actually building/understanding my db schema.

An app at scale will need custom SQL queries without an ORM eventually.
It's not a waste of time to write a few to populate our DB before diving
into an ORM, defining classes, or adding migration headaches to our list of problems.

## Steps

- Start off by wiping my db clean/dropping tables.

  ```sql
  DROP TABLE IF EXISTS Users;
  DROP TABLE IF EXISTS Stocks;
  DROP TABLE IF EXISTS Orders;
  DROP TABLE IF EXISTS Prices;
  ```

- Next I define the `Users` table and add a few users.

  ```sh
  CREATE TABLE Users (
      Id INT PRIMARY KEY IDENTITY(1, 1),
      FName VARCHAR(255) NOT NULL,
      LName VARCHAR(255) NOT NULL,
  );

  INSERT INTO Users (FName, LName)
  VALUES
      ('Loi', 'Tran'),
      ('Tai', 'Tran'),
      ('Thao', 'Tran'),
      ('Hieu', 'Tran'),
      ('Doug', 'Tran');
  ```

- Now `Stocks` & `Orders` since we're building a stock exchange.

  ```sql
  CREATE TABLE Orders (
      Expires DATETIME,
      UserId INT NOT NULL,
      Shares INT NOT NULL,
      OrderableId INT NOT NULL,
      StopPrice DECIMAL(10, 2),
      Type VARCHAR(20) NOT NULL,
      LimitPrice DECIMAL(10, 2),
      Status VARCHAR(20) NOT NULL,
      Id INT PRIMARY KEY IDENTITY(1, 1),
      OrderType VARCHAR(10) NOT NULL CHECK (OrderType IN ('Buy', 'Sell')),
      OrderableType VARCHAR(10) NOT NULL CHECK (OrderableType IN ('Stock', 'Option', 'Bond'))
  );

  CREATE TABLE Stocks (
      Id INT PRIMARY KEY IDENTITY(1, 1),
      Name NVARCHAR(30),
      Price DECIMAL(18, 2),
      Quantity INT,
      Symbol NVARCHAR(20)
  );

  INSERT INTO Stocks (Name, Price, Quantity, Symbol)
  VALUES
      ('AT&T', 15.81, 75, 'T'),
      ('Coinbase', 64.21, 100, 'COIN'),
      ('Bank of America', 28.5, 100, 'BAC');

  INSERT INTO Orders (UserId, OrderableId, OrderableType, Status, Type, StopPrice, LimitPrice, Shares, Expires, OrderType)
  VALUES
      (1, 1, 'Stock', 'Filled', 'Buy', NULL, 100.00, 10, '2023-05-31 12:00:00', 'Buy'),
      (2, 2, 'Option', 'Non-filled', 'Limit', NULL, 50.00, 5, '2023-06-01 15:30:00', 'Buy'),
      (1, 3, 'Bond', 'Cancelled', 'Stop Loss', 70.00, NULL, 8, '2023-06-02 10:45:00', 'Buy');
  ```

- Most importantly, `Prices` for tracking prices over time which'll be displayed as candlesticks in a chart.
  - Define `Prices`.
  - Define variables which we'll update for each time series item.
  - Run a loop which creates a `Price` item and inserts it into the db.

  ```sql
  CREATE TABLE Prices (
      Id INT PRIMARY KEY IDENTITY(1, 1),
      StockId INT NOT NULL,
      TransactionCount INT NOT NULL,
      DateOfAggregation DATETIME NOT NULL,
      o DECIMAL(18, 2) NOT NULL,              -- open
      l DECIMAL(18, 2) NOT NULL,              -- lo
      h DECIMAL(18, 2) NOT NULL,              -- hi
      c DECIMAL(18, 2) NOT NULL,              -- close
      v DECIMAL(18, 2) NOT NULL,              -- volume
      vwa DECIMAL(18, 2) NOT NULL             -- volume weighted average
  );

  DECLARE @count INT = 0;
  DECLARE @weekAgo DATETIME = GETDATE() - 7;

  DECLARE @price DECIMAL(10, 2) = 27.00;
  DECLARE @open DECIMAL(10, 2) = @price;
  DECLARE @lo DECIMAL(10, 2) = 0.0;
  DECLARE @hi DECIMAL(10, 2) = 0.0;
  DECLARE @close DECIMAL(10, 2) = 0.0;

  WHILE @count < 30
  BEGIN
      SET @price = @price -0.10 + (RAND() * (.10 - (-0.10)));
      SET @close = @price;

      SET @lo = @price -0.05 + (RAND() * (-0.1));
      SET @hi = @price -0.05 + (RAND() * (.1));

      INSERT INTO Prices (
          StockId,
          TransactionCount,
          DateOfAggregation,
          o,
          l,
          v,
          h,
          c,
          vwa
      )
      VALUES (
          1,
          100,
          @weekAgo,
          @open,
          CASE WHEN @open < @lo THEN @open ELSE @lo END,
          1000,
          CASE WHEN @close > @hi THEN @close ELSE @hi END,
          @close,
          140
      );

      SET @open = @close;

      SET @count = @count + 1;
      SET @weekAgo = DATEADD(HOUR, 1, @weekAgo);
  END;
  ```

Now we've got some data. Yay
![preview](https://i.imgur.com/XEW82M2.png)
