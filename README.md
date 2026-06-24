# CodeVector Backend Assignment

## Tech Stack

* Node.js
* Express.js
* PostgreSQL (Neon)

## Features

* Browse 200,000 products
* Category filtering
* Cursor-based pagination
* Newest-first ordering

## Why Cursor Pagination?

Offset pagination can cause duplicates or missing records when new products are inserted while a user is browsing.

I used keyset (cursor-based) pagination using `(created_at, id)` ordering. This provides:

* Stable pagination
* Better performance on large datasets
* No duplicate records across pages
* No missing records due to shifting offsets

## Database

PostgreSQL with indexes:

* `(created_at DESC, id DESC)`
* `(category, created_at DESC, id DESC)`

## Future Improvements

* Snapshot-based browsing session consistency
* Redis caching
* Search support
* API rate limiting

## AI Usage

ChatGPT was used to accelerate implementation and review pagination strategies. All code was reviewed, tested, and understood before submission.

## API Endpoints

GET /products

Query Parameters:
- limit (default 20)
- category
- cursor

Examples:

/products
/products?category=Books
/products?limit=20
/products?category=Books&cursor=<cursor>