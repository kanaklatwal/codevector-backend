const express = require("express");
const router = express.Router();
const pool = require("./db");

router.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const category = req.query.category;
    const cursor = req.query.cursor;

    let query = `
      SELECT *
      FROM products
    `;

    const values = [];
    const conditions = [];

    if (category) {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }

    if (cursor) {
      const decoded = JSON.parse(
        Buffer.from(cursor, "base64").toString()
      );

      values.push(decoded.created_at);
      values.push(decoded.id);

      conditions.push(`
        (created_at, id) < ($${values.length - 1}, $${values.length})
      `);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    query += `
      ORDER BY created_at DESC, id DESC
      LIMIT ${limit}
    `;

    const result = await pool.query(query, values);

    let nextCursor = null;

    if (result.rows.length > 0) {
      const last = result.rows[result.rows.length - 1];

      nextCursor = Buffer.from(
        JSON.stringify({
          created_at: last.created_at,
          id: last.id,
        })
      ).toString("base64");
    }

    res.json({
      products: result.rows,
      nextCursor,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;