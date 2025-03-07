## 🚚 Hama Nasi

A full-stack movers application built with Next.js, Tailwind CSS, Lucide-React, and PostgreSQL. Hama Nasi provides a Company Dashboard and a User Dashboard to efficiently manage moving services.

# 🚀 Tech Stack
- Frontend: Next.js, Tailwind CSS, Lucide-React
- Backend: Next.js API routes
- Database: PostgreSQL
- Authentication: OAuth

## ✨ Features
✅ User Dashboard – Manage personal moving requests
✅ Company Dashboard – View and manage customer orders
✅ Authentication System – Secure user login 
✅ Responsive UI – Optimized for mobile and desktop
✅ Database Storage – PostgreSQL for efficient data management

## Installation
1. Clone the repository:
```bash
   git clone <git@github.com:JasperMunene/hama-nasi.git>
```
2. navigate to the project directory.
``` bash
pipenv install
pipenv shell
```

### Backend
1. cd into server

2. Install the required packages:
```bash

pip install Flask

pip install Flask-SQLAlchemy

pip install Flask-JWT-Extended

# Install Flask-Migrate for database migrations
pip install Flask-Migrate

pip install -r requirements.txt
```
3. Set up the database
```bash
flask db init
flask db migrate -m " Initial migration
flask db upgrade
```
4. Run the backend server
```bash
flask run
```

### Frontend
1. Navigate to the frontend directory
```bash
cd client
```
2. Install dependancies
```bash
npm install
```

3. Run the frontend
```bash
npm run dev
```
The frontend will be available at http://localhost:3000.

## 🤝 Contributing
Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a feature branch: git checkout -b feature-name
3. Commit your changes: git commit -m "Add new feature"
4. Push to the branch: git push origin feature-name
5. Open a pull request! 

# 📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

# 📩 Contact
For inquiries or support, feel free to reach out:

📧 contact@hamanasi.com












