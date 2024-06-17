-- Create the database if it does not exist
SELECT 'CREATE DATABASE leonle_dev_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'leonle_dev_db')\gexec
