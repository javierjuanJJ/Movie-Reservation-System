# Feature 004: Reservation Management

## Description
Users can: view movies and schedules by date, view available seats, select and reserve, view own reservations, and cancel reservations (only future ones).

## System
Hard transactional logic to prevent overbooking.

## Endpoints
- GET /api/reservations (user's own)
- POST /api/reservations (create reservation - select seats)
- GET /api/reservations/:id (user's own, protected)
- POST /api/reservations/:id/cancel (cancel future reservation)