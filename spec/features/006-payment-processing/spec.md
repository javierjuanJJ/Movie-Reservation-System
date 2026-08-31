# Feature 006: Payment Processing

## Description
Stripe integration endpoint to simulate charging seats when making a reservation.

## Endpoints
- POST /api/payments/create-intent (create Stripe PaymentIntent)
- POST /api/payments/confirm (confirm payment for reservation)