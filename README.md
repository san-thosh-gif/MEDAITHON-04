Smart Hospital Management System
 Description

A full-stack web application designed to manage hospital operations such as patient records, appointments, and administrative workflows.

 Features
Patient registration and management
Appointment scheduling
Digital record storage
Efficient hospital workflow handling
🛠 Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express
Database: SQL or MongoDB 

## MySQL Setup (Backend)

1. Create MySQL database/tables using `backend/sql/schema.sql`.
2. Go to backend folder and install dependencies.
3. Add environment values from `backend/.env.example`.
4. Start backend with `npm run dev`.

The backend supports two database modes through `DB_PROVIDER`:

- `DB_PROVIDER=mongo` uses MongoDB models.
- `DB_PROVIDER=mysql` uses MySQL tables and SQL queries.

SQL query examples used for DQL testing are in `backend/sql/dql_examples.sql`.

 Use Case

Reduces manual work and improves efficiency in hospital management.

 👥 Contributors

- **Chandresh G U** – Frontend, Database ( SQL )


## 💡 Future Improvements

- Add database for storing user history  
- Improve AI accuracy with better models  
- Enhance UI/UX for better user experience  

---

## 📌 Note

This project was developed during a **50-hour hackathon**, focusing on solving real-world healthcare problems using structured problem-solving and efficient system design.

---
