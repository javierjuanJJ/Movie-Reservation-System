# Feature 004: Plan

1. Create Reservation Prisma model: userId, showtimeId, seats (JSON), status, createdAt
2. Create Zod schemas for seat selection and reservation creation
3. Implement reservation controller with transactional logic (Prisma tx)
4. Create routes with auth middleware (User protected)
5. Implement seat availability check and overbooking prevention
6. Implement cancellation logic (future only)
7. Write integration tests