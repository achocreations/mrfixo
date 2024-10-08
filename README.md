![image.png](Logo.png)

Creating a mobile app to bring all workers and home owners under one platform. Please check the below features.

## Define the Scope and Features
- User Profiles: Separate profiles for service providers (workers) and customers (homeowners).
- Service Listings: Categories for various services (plumbing, cleaning, electrical, etc.).
- Search & Filters: Users can search for services and filter results by location, price, ratings, etc.
- Booking System: Allow customers to book services at their convenience.
- Payment Gateway: Secure online payment integration (credit/debit cards, wallets, UPI, etc.).
- Ratings & Reviews: Customers can leave feedback and rate the service providers.
- Chat/Communication: In-app messaging or calling feature for customers and service providers.
- Notifications: Alerts for booking confirmations, reminders, promotions, etc.
- GPS & Location Services: Real-time location tracking of service providers.
- Admin Panel: For managing users, services, payments, and overall app monitoring.
- Service Provider Availability Scheduling: Allow service providers to set their availability hours or mark themselves as available/unavailable on certain days.

## Technology Stack Suggestions:
- Frontend: React Native, Flutter, or Swift (iOS), Kotlin/Java (Android)
- Backend: Node.js with Express, Django, or Ruby on Rails
- Database: MySQL, PostgreSQL, or MongoDB
- Payment Gateway: Stripe, PayPal, Razorpay
- Cloud Services: AWS, Google Cloud, or Azure

## [Business Requirement Document](https://github.com/achocreations/mrfixo/wiki/Business-Requirement-Document-(BRD))

## [Technical Design Document](https://github.com/achocreations/mrfixo/wiki/Technical-Design-Document-(TDD))

## [Backlog](https://github.com/achocreations/mrfixo/wiki/Backlog)

## Process flowcart
![image.png](mrfixo_process_flowchart.png)

## Process flow
![image.png](mrfixo_process_flow.png)
## Folder Structure

```bash
/mrfixo
│
├── /backend
│   ├── /controllers
│   │   └── translateController.js
│   ├── /models
│   │   └── (if needed, add your Mongoose models here)
│   ├── /routes
│   │   └── translateRoutes.js
│   ├── /utils
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   ├── translateService.js
│   │   └── validators.js
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── /frontend
│   ├── /assets
│   │   └── (images, fonts, etc.)
│   ├── /components
│   │   └── (reusable UI components)
│   ├── /navigation
│   │   └── (React Navigation setup)
│   ├── /screens
│   │   └── TranslateScreen.js
│   ├── /services
│   │   ├── api.js
│   │   └── translateService.js
│   ├── /utils
│   │   └── errorHandler.js
│   ├── /App.js
│   ├── package.json
│   ├── babel.config.js
│   └── README.md
│
├── .gitignore
├── README.md
└── LICENSE (if needed)
```

## Details of Each Directory

### Backend
- `/controllers`: Contains your controller files, which handle incoming HTTP requests and business logic.
- `/models`: Contains Mongoose models if you are using MongoDB or any other ORM models.
- `/routes`: Contains the route definitions that map URL paths to controller actions.
- `/utils`: Utility functions such as error handling, logging, and translation service.
- `.env`: Environment variables for your backend, such as API keys, database connection strings, etc.
- `server.js`: Entry point of your Node.js application.
- `package.json`: Lists backend dependencies and scripts.

### Frontend
- `/assets`: Contains static assets like images and fonts.
- `/components`: Reusable UI components that can be used across multiple screens.
- `/navigation`: Navigation configuration using React Navigation.
- `/screens`: Individual screen components, each representing a different part of the UI.
- `/services`: Contains services for making API calls and interacting with the backend.
- `/utils`: Utility functions, such as error handling and validation.
- `App.js`: Entry point of the React Native app.
- `babel.config.js`: Babel configuration for React Native.
- `package.json`: Lists frontend dependencies and scripts.

### Root Directory
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `README.md`: General information about the project, how to set it up, and how to contribute.
- `LICENSE`: (Optional) If you plan to open-source the project, specify the license type here.