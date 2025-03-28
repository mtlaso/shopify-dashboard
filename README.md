<<<<<<< HEAD
# AI-Enhanced E-commerce Analytics Platform

## Overview
Build a full-stack application that allows e-commerce merchants to gain AI-powered insights from their store data. The application will connect to Shopify via GraphQL, process and analyze the data using AI services, and present actionable insights through an interactive dashboard.

## Time Expectations
- Please document any shortcuts taken due to time constraints
- You have 1 week to complete this challenge

## Technical Requirements

### Frontend (Next.js (React))
- Create a responsive dashboard with the corrsponding views for the choosen AI intergration
- Implement proper state management
- Create at least one data visualization component (chart, graph, etc.)
- Build a component that displays AI-generated insights

### Backend (Next.js backend or Node.js or Python)
- Create an API using either Next.js backend or Node.js or Python
- Implement endpoints for:
  - Fetching data from Shopify via GraphQL
  - Processing and storing data in databases
  - Generating insights using AI services
- Include proper error handling and logging

### Data Storage
- You can use either PostgreSQL (with Prisma) or MongoDB

### AI Integration
- Implement at least 1 of the following features using AWS services and corresponding dashboard views:
  - Product description generation/enhancement
  - Customer review sentiment analysis
  - Sales forecasting based on historical data
  - Personalized recommendation engine
  - Product categorization using AI

### Infrastructure
- Create AWS services with proper IAM roles
- You can use S3 for storing any static assets or temporary data
- Your final solution should be deployed and accessible via a public URL

## Required Deliverables
1. **Source Code**:
   - Frontend codebase (Next.js/React)
   - Backend codebase (Next.js backend or Node.js or Python)
     - Make sure to include database schema definitions/migrations

2. **Documentation**:
   - Setup instructions
   - Architecture diagram
   - API documentation
   - Explanation of AI integration approaches
   - Any assumptions made during development

3. **Demo**:
   - Deployed application URL
   - Sample test data (if needed for demonstration)

## Evaluation Criteria
We will assess your submission based on:

- **Code Quality**: Clean, maintainable, and well-documented code
- **Technical Implementation**: Proper use of specified technologies
- **AI Integration**: Effective use of AI services to provide valuable insights
- **Database Design**: Appropriate schema design and query optimization
- **UI/UX**: Intuitive and responsive user interface
- **Problem-Solving**: Creative solutions to business requirements
- **Communication**: Clear documentation and explanation of your approach

## Bonus Points (Optional)
- Add unit and integration tests
- Implement authentication and role-based access
- Optimize for performance and scalability
- Add a feature that uses Amazon Q Business for answering natural language questions about store data

## Getting Started
1. Clone the starter repository
2. Follow the setup instructions in the README
3. Implement the required features
4. Submit your solution by the deadline

Good luck! We're excited to see your approach to this challenge.
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 3658a3c (Initial commit from Create Next App)
