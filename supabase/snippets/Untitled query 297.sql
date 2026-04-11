SELECT *
FROM articles
WHERE fts @@ websearch_to_tsquery('english', 'artemi');