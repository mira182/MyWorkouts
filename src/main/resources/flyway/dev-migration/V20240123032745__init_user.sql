INSERT INTO "user"(username, password, email, first_name, last_name)
VALUES ('mira', '$2a$12$Fi7nwSJPWkUkGNK5110z3.7wjC54PwmvgTc5jVf/KI2obpXPFWlz6', 'miroslav.hynst@gmail.com', 'Miroslav', 'Hynst')
ON CONFLICT DO NOTHING;
