
# E-commerce Analytics Platform

https://github.com/user-attachments/assets/13649a9a-bb98-48b5-8475-9e4be0ff321f

[https://full-stack-ai-technical-test-hqed.vercel.app](https://full-stack-ai-technical-test-hqed.vercel.app)

## Installation

1. Cloner le dépôt
2. Installer les dépendances : `pnpm install`
3. Setup PostgreSQL

    * Créer une base de données PostgreSQL (avec Docker/docker-compose)
    ```yml
    # docker-compose.yml
    services:
      postgres-2:
       container_name: ai-ecommerce-dashboard-postgres
       image: postgres
       hostname: localhost
       ports:
         - "5433:5432"
       environment:
         POSTGRES_USER: admin
         POSTGRES_PASSWORD: root
         POSTGRES_DB: ecommerce
       volumes:
         - postgres-data-2:/var/lib/postgresql/data
       restart: unless-stopped

      pgadmin:
        container_name: container-pgadmin
        image: dpage/pgadmin4
        depends_on:
          - postgres
        ports:
          - "5050:80"
        environment:
          PGADMIN_DEFAULT_EMAIL: admin@admin.admin
          PGADMIN_DEFAULT_PASSWORD: admin
        restart: unless-stopped

    volumes:
      postgres-data-2:
    ```

    * Lancer la base de données: `docker-compose up -d # docker-compose down`

4. Remplir et renommer le ficher `.example.env` en `.env.local`
```bash
BETTER_AUTH_SECRET=xxx # openssl rand -hex 32
APP_URL=http://localhost:3000
BETTER_AUTH_URL=$APP_URL
# Ex: postgres://admin:root@macos.local:5433/ecommerce
DATABASE_URL=postgres://<usr-name>:<passwd>@<host>:<port>/<db> (voir docker-compose.yml)
COOKIE_SECRET=xxx # openssl rand -hex 32

# https://sdk.vercel.ai/providers/ai-sdk-providers/amazon-bedrock
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=/xxx/xxx
AWS_REGION=xxx
```
5. Lancer migrations

    * `pnpm run migrate:dev`
    * `pnpm run generate:dev`
6. Naviguer sur [http://localhost:3000](http://localhost:3000)

8. Vous pouvez aussi utiliser prisma studio pour intéragir avec la base de données : `pnpm run prisma:studio`

## Raccourcis
### Fonctionnalités non implémentées qui auraient été utiles et raccourcis
- Recharger les données d’une boutique périodiquement (et manuellement).
- Mettre à jour directement une donnée (ex : description produit, etc.) en se basant sur ce qu’un LLM recommande.
- Implémenter la pagination pour les produits, les variantes, les collections, les commandes.
- Mettre en place un rate limiting (requêtes vers le LLM et le reste de l’application).
- Afficher des informations détaillées sur les collections et les commandes.
- Afficher toutes les images d’un produit et de ses variantes.
- Gérer les métadonnées (SEO, sitemap, favicon, traduction en plusieurs langues — FR/EN, etc.).

## Données de test

- URL boutique : b01yvd-r5.myshopify.com
- Admin API access token : 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

Ils seront invalidés dans les prochaines semaines.


## Overview
Build a full-stack application that allows e-commerce merchants to gain insights from their store data. The application will connect to Shopify via GraphQL, process and and present data through an interactive dashboard.

## Time Expectations
- Please document any shortcuts taken due to time constraints
- You have 1 week to complete this challenge

## Technical Requirements

### Frontend (Next.js (React))
- Create a responsive dashboard that will display relevant store data (products with variants, collections and orders)

### Backend (Next.js backend or Node.js or Python)
- Create an API using either Next.js backend or Node.js or Python
- Implement endpoints for:
  - Fetching data from Shopify via GraphQL
  - Processing and storing data in databases
- Include proper error handling and logging

### Data Storage
- You can use either PostgreSQL (with Prisma) or MongoDB

### Infrastructure
- Your final solution should be deployed and accessible via a public URL

## Required Deliverables
1. **Source Code**:
   - Frontend codebase (Next.js/React)
   - Backend codebase (Next.js backend or Node.js or Python)
     - Make sure to include database schema definitions/migrations

2. **Documentation**:
   - Setup instructions
   - Any assumptions made during development

3. **Demo**:
   - Deployed application URL
   - Sample test data (if needed for demonstration)

## Evaluation Criteria
We will assess your submission based on:

- **Code Quality**: Clean, maintainable, and well-documented code
- **Technical Implementation**: Proper use of specified technologies
- **Database Design**: Appropriate schema design and query optimization
- **UI/UX**: Intuitive and responsive user interface
- **Problem-Solving**: Creative solutions to business requirements
- **Communication**: Clear documentation and explanation of your approach

## Bonus Points (Optional)
- Add unit and integration tests
- Add a view to either create a new product or edit an existing product
- Connect an AI service like OpenAI or Anthropic to manipulate or enhance data

## Getting Started
1. Clone the starter repository
2. Follow the setup instructions in the README
3. Implement the required features
4. Submit your solution by the deadline

Good luck! We're excited to see your approach to this challenge.
