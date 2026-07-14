FROM node:20-slim

WORKDIR /app

# openssl is required by the Prisma engines.
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .

# Generates the Prisma client into src/generated/prisma, which app code
# imports directly and next build requires to exist beforehand.
RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

# Applies pending migrations and upserts course content (safe to re-run —
# seed.ts only upserts Worlds/Courses/Modules/Lessons/Quizzes, it never
# touches real user accounts, enrollments, or progress) before starting.
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && npm run start"]
