
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
