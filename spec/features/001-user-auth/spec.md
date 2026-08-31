# Feature 001: User Authentication

## Description
Authentication system with sign up, log in, and role management (Admin + User). Integration with better-auth. Seed script to create the first Admin user. Promotion of users to Admin (only by another Admin).

## Endpoints
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/me (protected)
- POST /api/auth/promote (Admin only)

## Constraints
- Passwords must not be exposed in any response
- Role-based access control: Admin endpoints accessible only by admin role
- Initial Admin must be seeded via database seed