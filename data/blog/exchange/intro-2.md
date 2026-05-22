---
draft: true
date: 2026-02-05
title: 'Open Exchanges: Lessons in Building, Sharing, and Growing Trust in Public — Part II'
summary: 'A walkthrough of our trading platform architecture, showing how the web client, services, and data layers interact with Protobuf, Redis, and Postgres — and why these choices matter for transparency and reliability.'
tags: ['architecture', 'trading platform', 'protobuf', 'redis', 'postgres', 'matching engine', 'marketplace']
series: 'Open Exchanges'
part: 2
---

# Open Exchanges: Understanding the Architecture

<img src="/static/images/exchange-architecture-1.png" alt="Exchange Architecture Overview" />

Our exchange is designed to be **observable, reliable, and understandable**. Every component, every data flow, and every interaction is structured so that:

- Users can trust what they see
- Collaborators can reason about the system
- Observers can learn from a real, functioning platform

This diagram captures the key services: **Web Client**, **Marketplace**, **Matching Engine**, **Ledger**, **Redis**, **Postgres**, and the **Protobuf contracts** connecting them.

---

# Core Components and Their Roles

### **Web Client**

- Manages **authentication** and displays **market listings**.
- Lets users **place or cancel orders** and view balances.
- Queries the Ledger for account state and trade history.
- Ensures **real-time updates** reflect actual market activity.

The Web Client is the **face of transparency** — everything shown comes from observable, auditable sources.

### **Marketplace Service**

- Provides **real-time and historical pricing** for all assets.
- Configurable intervals (1 min → 1 day) ensure precise reporting.
- Acts as the **authoritative source for catalog and pricing**.

By exposing accurate and consistent data, Marketplace allows everyone to **see the same truth** about the market.

### **Matching Service**

- Matches **buy and sell orders** following rules and priority.
- Publishes executed trades to the Ledger, updating accounts.
- References Marketplace prices for special order execution.

The Matching Service demonstrates **correctness in action**, ensuring the system behaves predictably and transparently.

### **Ledger Service**

- Records all trades and account updates, ensuring **accuracy and durability**.
- Provides a historical record for users and services.
- Guarantees **consistency and auditability**, which is critical for trust.

The Ledger is the **single source of truth for balances and transactions**.

### **Protobuf Contracts**

- Define **structured messages** used by all services.
- Ensure **compatibility and correctness** across Web Client, Marketplace, Matching, and Ledger.
- Serve as the **canonical reference for communication**, reducing ambiguity.

### **Redis**

- Low-latency access to hot/recent assets and session data.
- Speeds up frequently accessed queries, reducing load on Postgres.
- Supports **responsiveness without sacrificing truth**, because authoritative data remains in Postgres.

### **Postgres**

- The **authoritative store** for trades, orders, listings, and balances.
- Maintains **integrity, durability, and historical records**.
- Supports audits and system reasoning, enabling public observability.

---

# How the Pieces Interact

- **Web Client → Marketplace**: Retrieves live prices and catalog for display.
- **Web Client → Matching**: Places or cancels orders; monitors status.
- **Web Client → Ledger**: Queries balances and trade history for transparency.
- **Marketplace ↔ Matching**: Marketplace supplies live pricing; Matching validates against it.
- **Matching ↔ Ledger**: Executed trades update balances and preserve durability.
- **Protobuf → All Services**: Standardizes data and message formats across the platform.
- **Redis → All Services**: Caches recent/hot data for speed.
- **Postgres → All Services**: Stores authoritative, persistent records.

Every arrow in the diagram represents **a contract you can observe and verify** — making the system intelligible to anyone curious enough to look.

---

# Why This Architecture Matters

This design ensures:

- **Speed**: Low-latency caching with Redis keeps interactions responsive.
- **Reliability**: Matching, Ledger, and Marketplace work together consistently.
- **Transparency**: Publicly observable flows allow users and collaborators to **verify behavior**.
- **Scalability**: Clear separation of responsibilities enables efficient growth and multiple asset classes.

By thinking about architecture **as a public signal**, we show that the system is **not just functional, but trustworthy**, and decisions are intentional and measurable.

---

# Closing Thought

Open Exchanges aren’t just about trading; they’re about building systems **anyone can learn from, observe, and trust**.  
Every component, every flow, and every decision is a statement: **this is how real, transparent infrastructure works**.
