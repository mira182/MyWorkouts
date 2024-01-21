-- CREATE USER IF NOT EXISTS
DO
$$
BEGIN
   IF EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'webappuser') THEN

      RAISE NOTICE 'Role "webappuser" already exists. Skipping.';
ELSE
CREATE ROLE webappuser LOGIN PASSWORD 'macos';
END IF;
END
$$;

-- CREATE DATABASE IF NOT EXISTS
CREATE DATABASE my_workouts WITH OWNER webappuser;

-- GRANT PRIVILEGES
GRANT ALL PRIVILEGES ON DATABASE my_workouts TO webappuser;