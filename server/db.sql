CREATE TABLE forms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  address VARCHAR(255),
  phoneNumber VARCHAR(15),
  age INT,
  gender VARCHAR(10),
  institute VARCHAR(100),
  occupation VARCHAR(100)
);
