---
draft: true
date: '2025-05-08'
title: 'System Design: TicketMaster'
tags: ['system design']
summary: 'x'
---

A good subtitle or caption on a blog's index page should:

- Capture Attention - It should be intriguing and invite curiosity.
- Convey Value - Communicate the benefit of reading the post.
- Be Specific - Avoid being vague; let the reader know exactly what they’ll learn.

## Functional Requirements:

"User should be able to..."

- User should be able to book tickets.
- User should be able to view an event.
- User should be able to search for events.

## Non Functional Requirements:

Quality of the system
Scalability, Availability, Reliability...

        Cap Theorem
        Consistency vs Availability

        Priority consistency vs availability.

        strong consistency for booking & high availability for search and viewing events.

        Read >> Write

        Query Access Patterns

        Scalability to handle surges from popular events.

## Out of Scope

- GDPR compliance
- Fault tolerance
- Adding events
- Etc

## Core Entities

Understand data which is persisted in the system & exchanged via API.

- Event
- Venue
- Performer
- Ticket

## API

Client facing APIs which exist to satisfy functional requirements. Should exchange properties of entities of the app.

- `GET /event/:eventId -> event, venue, performer, ticket[]`
- `GET /search?term={term}&location{location}&type={type}&date={date} -> Partial<Event>[]`
- `POST /event/:eventId -> ticket`

## Database

## Deep Dive
