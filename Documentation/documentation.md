# Portfolio Website Management System

This is a lightweight and dynamic portfolio web application built with MongoDB as the backend database. It showcases team information, projects, skills, and individual member profiles. This system also includes basic user authentication and role-based access control.

---

## 🗃️ Database Design

### 📌 MongoDB Collections

---

### 1. `About`
Stores a general introduction or overview of the team.

| Field      | Type      | Required | Description                              |
|------------|-----------|----------|------------------------------------------|
| `_id`      | ObjectId  | Yes      | Auto-generated unique identifier         |
| `title`    | String    | Yes      | Title of the section (e.g., "About J&R") |
| `description` | String | Yes      | Description of the team or org           |
| `cv`       | String    | No       | Path to shared CV/resume PDF             |
| `updatedAt`| Date      | Yes      | Last update timestamp                    |

---

### 2. `Member`
Contains team member profiles.

| Field       | Type      | Required | Description                            |
|-------------|-----------|----------|----------------------------------------|
| `_id`       | ObjectId  | Yes      | Primary key                            |
| `name`      | String    | Yes      | Full name                              |
| `info`      | String    | Yes      | Short bio or description               |
| `avatar`    | String    | No       | Path to profile image (e.g., JPG)      |
| `createdAt` | Date      | Yes      | Record creation timestamp              |
| `updatedAt` | Date      | Yes      | Last update timestamp                  |

---

### 3. `Project`
Contains a list of projects the team has worked on.

| Field       | Type      | Required | Description                          |
|-------------|-----------|----------|--------------------------------------|
| `_id`       | ObjectId  | Yes      | Primary key                          |
| `title`     | String    | Yes      | Project name                         |
| `description`| String   | Yes      | Technical or overview description    |
| `image`     | String    | No       | Path to image or thumbnail           |
| `skills`    | Array     | No       | List of skills used in the project   |
| `createdAt` | Date      | Yes      | Record creation timestamp            |
| `updatedAt` | Date      | Yes      | Last update timestamp                |

---

### 4. `Skill`
Stores the skills/technologies the team is proficient in.

| Field       | Type      | Required | Description                        |
|-------------|-----------|----------|------------------------------------|
| `_id`       | ObjectId  | Yes      | Primary key                        |
| `title`     | String    | Yes      | Skill name (e.g., Web Development) |
| `description`| String   | Yes      | Description or level of proficiency|
| `icon`      | String    | No       | Path to vector icon (SVG)          |
| `createdAt` | Date      | Yes      | Record creation timestamp          |
| `updatedAt` | Date      | Yes      | Last update timestamp              |

---

### 5. `User`
Handles authentication and user roles.

| Field       | Type      | Required | Description                          |
|-------------|-----------|----------|--------------------------------------|
| `_id`       | ObjectId  | Yes      | Primary key                          |
| `username`  | String    | Yes      | Unique login ID                      |
| `password`  | String    | Yes      | Hashed password                      |
| `type`      | String    | Yes      | User role (e.g., Admin, Guest)       |
| `email`     | String    | Yes      | Unique email address                 |
| `name`      | String    | Yes      | Display name                         |
| `createdAt` | Date      | Yes      | Record creation timestamp            |

---

## 🔐 Access Control

All data access must be preceded by **user authentication**:

- The system checks for a valid `username` and `password` in the `users` collection.
- Based on the `type` (e.g., `"Admin"`), the system grants read/write access to `about`, `members`, `projects`, and `skills`.
- Users with limited roles (e.g., `"Guest"`) may only have read access.

---

## 📦 Features

- Personal/team overview (`About`)
- Member profiles with avatars and bios
- Showcase of past projects with images and descriptions
- Skillset gallery with icons
- User authentication and role-based access

---

## 🔧 Technologies

- Backend Database: **MongoDB**
- Backend Framework: *(optional)* Node.js, Express.js
- Frontend: *(optional)* React / Vue / Flutter Web
- Authentication: Basic username/password auth or JWT

---

## 📂 File Uploads

All uploaded assets (avatars, project images, CVs, icons) are stored in the `/uploads/` directory and referenced by file path in the database.

---

## 📍 Notes

- This system follows a **NoSQL design** with **manual references** only.
- There is no enforced schema relationship; logic-based access is controlled via application layer.
- You can extend the `projects` collection to reference `members` or `skills` by storing their ObjectIds or names.

---

## ✅ Future Enhancements

- JWT-based authentication
- Search and filter functionality for projects/skills
- Admin dashboard for CRUD operations
- Role-based UI rendering

---

## 🧠 Authors

- Reyven Oruga
- John Mhark Platon

La Consolacion College Tanauan  
Department of Information Technology

---

## 📎 License

This project is open-source and free to use for educational purposes.
