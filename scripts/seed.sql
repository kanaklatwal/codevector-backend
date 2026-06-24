INSERT INTO products (
    name,
    category,
    price,
    created_at,
    updated_at
)
SELECT
    'Product ' || gs,
    (ARRAY['Electronics','Books','Clothing','Sports'])[floor(random()*4 + 1)],
    round((random()*10000)::numeric, 2),
    NOW() - (random() * interval '365 days'),
    NOW() - (random() * interval '365 days')
FROM generate_series(1, 200000) gs;