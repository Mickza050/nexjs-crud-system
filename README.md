# nexjs-crud-system
npm install mysql2
npm install express
npm install cors
npm install uuid
npm install axios (Global Install)
npm install sweetalert2
npm install jsonwebtoken

***********************************
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uuid VARCHAR(36) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(64) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);
