# CodeVector Backend Assignment

## Overview

This project implements a scalable product browsing backend capable of handling 200,000+ products with efficient filtering and pagination.

The API supports:

* Browsing products ordered by newest first
* Category-based filtering
* Cursor-based pagination for large datasets
* PostgreSQL indexing for query performance

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL (Neon)

---

## Database Design

### Products Table

| Column     | Type                  |
| ---------- | --------------------- |
| id         | BIGSERIAL PRIMARY KEY |
| name       | VARCHAR(255)          |
| category   | VARCHAR(100)          |
| price      | NUMERIC(10,2)         |
| created_at | TIMESTAMP             |
| updated_at | TIMESTAMP             |

### Indexes

```sql
CREATE INDEX idx_products_created_id
ON products(created_at DESC, id DESC);

CREATE INDEX idx_products_category_created_id
ON products(category, created_at DESC, id DESC);
```

---

## Data Generation

200,000 products are generated using PostgreSQL's `generate_series()` function instead of row-by-row inserts for significantly faster data seeding.

---

## Why Cursor Pagination?

Traditional OFFSET pagination becomes inefficient on large datasets and can return duplicate or missing records when new products are inserted while users are browsing.

This project uses keyset (cursor-based) pagination with:

```sql
ORDER BY created_at DESC, id DESC
```

Benefits:

* Consistent ordering
* Better performance on large datasets
* No duplicate records across pages
* Reduced risk of missing records due to row shifting

---

## API Endpoints

### Get Products

```http
GET /products
```

### Query Parameters

| Parameter | Description                               |
| --------- | ----------------------------------------- |
| limit     | Number of products per page (default: 20) |
| category  | Filter by category                        |
| cursor    | Cursor for next page                      |

### Examples

```http
/products

/products?limit=20

/products?category=Books

/products?category=Electronics

/products?category=Books&cursor=<cursor>
```

---

## Future Improvements

* Snapshot-based pagination for stronger consistency during updates
* Full-text search
* Redis caching
* API rate limiting
* Product analytics

---

## AI Usage

AI tools (ChatGPT) were used to accelerate implementation, review pagination approaches, and validate database design decisions.

All code was reviewed, tested, and understood before submission.
