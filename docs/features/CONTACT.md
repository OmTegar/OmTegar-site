# Contact System Feature

## Overview
**Location**: `src/features/contact`

Provides a channel for visitors to reach out to the developer. It abstracts the complexity of email sending services behind a clean interface.

## Capabilities
- **Email Dispatch**: Sends emails directly from the client side without a backend server.
- **Abstraction**: Uses `EmailService` class to wrap the 3rd party provider (EmailJS). This ensures we can switch providers later (e.g., to SendGrid) without changing the UI code.
- **Environment Aware**: Configured via `.env` variables for security.

## Configuration
Requires the following `.env.local` variables:
- `NEXT_PUBLIC_EMAIL_SERVICE`
- `NEXT_PUBLIC_EMAIL_TEMPLATE`
- `NEXT_PUBLIC_EMAIL_JS_USER_ID`
