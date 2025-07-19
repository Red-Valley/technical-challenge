## Technical Challenge

### Background

At VIP Medical Group, we are building a new internal module for our Medwork platform—a system that allows our staff to register patients, assign them to doctors (providers), and track their clinical status throughout their care journey.

In this challenge, you’ll simulate part of this module by creating a full-stack application that allows managing patients, providers, and clinical statuses with a parent-child hierarchy.

We are **not evaluating specific tools or patterns**. We simply want to understand how you think, how you code, and how you approach real-world problems. Be yourself.



### What You Need to Build

A functional **full stack application** with the ability to:

1. Create patients and providers
2. Assign a provider to a patient
3. Change the patient’s clinical status (with hierarchy)
4. Display the status change history of a patient



### Database Schema

You must implement these 4 tables exactly as described below:

#### 1. `patients`

| Field        | Type      |
| ------------ | --------- |
| id           | UUID      |
| full\_name   | string    |
| email        | string    |
| phone        | string    |
| provider\_id | UUID (FK) |
| status\_id   | UUID (FK) |
| created\_at  | datetime  |

#### 2. `providers`

| Field       | Type     |
| ----------- | -------- |
| id          | UUID     |
| full\_name  | string   |
| specialty   | string   |
| created\_at | datetime |

#### 3. `statuses`

| Field      | Type                            |
| ---------- | ------------------------------- |
| id         | UUID                            |
| name       | string                          |
| parent\_id | UUID (nullable, FK to statuses) |
| order      | integer                         |

> This table allows parent-child status relationships.

#### 4. `status_history`

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| patient\_id | UUID (FK) |
| status\_id  | UUID (FK) |
| changed\_at | datetime  |



### Preloaded Statuses

These statuses must be preloaded in the database:

* `Scheduled`

  * `Checked-In`

    * `In Consultation`
    * `Cancelled`
  * `No-Show`

You can use a seed script or migrations to insert them.



### Tech Stack

#### Backend

* Language: TypeScript
* Framework: **NestJS** or **Express**
* Database: **PostgreSQL**, **MySQL**, or **MongoDB**
* If you prefer, you may separate logic into small services (e.g., `patients-service`, `statuses-service`)

  * Use **HTTP**, **events**, or **gRPC** for inter-service communication
  * If using multiple services, you must include an **API Gateway**

#### Frontend

* Framework: **React** (Vite or Next.js)
* Styling: **TailwindCSS**
* State management: **Redux Toolkit** or **Zustand**
* Data fetching: **Tanstack Query**



### Required Screens

You should include the following screens:

1. Patient creation form
2. Provider creation form
3. Patient list (showing status and assigned provider)
4. Patient status update control (e.g., dropdown)
5. Patient status history (as timeline or list)

> **Optional screen:** Provider list view.



### Submission Instructions

* You will receive a Git repository link for the base project.
* **Fork the repository**, complete your work in a new branch, and **submit a pull request** to share your solution.
* Include a `README.md` with:

  * Clear instructions to run the project locally
  * A short explanation of your architecture or design decisions
  * A seed script to preload providers and statuses



### Time Expectation

You should spend no more than **8 hours** on this task.

Don’t worry if you can’t finish everything. What matters most is **how far you get** and **how you approach the problem**.

# To start the project

### Run the server

- First install all the dependencies with npm install.
- You need to have a postgres server named 'postgres' with user 'postgres' and password 'postgres' to use the express app correctly.
- Use npm run dev for development with ts-node or npm run build followed by npm start for production environments after compilation.
- To reload the server and modify code you will need to commend lines 18 and 19 in file backend/src/database/migrations/index.js.
- The first time you run the server some information needed to work is going to be saved in the postgres tables automatically (Statuses and one provider).

### Run the React App
- First install all dependencies with npm install command.
- The run the command npm start to start the local dev server.
- Make use of another port than 3000, or run the express backend first.

### DB Credentials
Host	localhost
Port	5432
User	postgres
Database	postgres
Password	postgres
Connection URL	localhost
