CREATE TABLE employees
(
    id SERIAL,
    name text,
    title text,
    avatar text,
    active boolean NOT NULL,
    CONSTRAINT employees_pkey PRIMARY KEY (id)
);

ALTER TABLE employees ALTER COLUMN active SET DEFAULT TRUE;

INSERT INTO employees(name, title, avatar) VALUES
 ('Meadow Crystalfreak ', 'Head of Operations','https://api.dicebear.com/6.x/bottts/svg?seed=Meadow%20Crystalfreak'),
 ('Buddy-Ray Perceptor', 'DevRel','https://api.dicebear.com/6.x/bottts/svg?seed=Buddy-Ray%20Perceptor'),
 ('Prince Flitterbell', 'Marketing Guru','https://api.dicebear.com/6.x/bottts/svg?seed=Prince%20Flitterbell');