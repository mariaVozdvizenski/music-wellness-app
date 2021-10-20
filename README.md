# Music Wellness App

The purpose of this app is to provide a way of mood enchantment by using music.

Specially designated admins with experience in music and musical therapy are going to add various musical pieces that will help the listeners to achieve various, positive emotional states.

## Default admin account credentials

* username - admin
* password - 1234

---

## Technical stack
### Backend
* .NET 5
* Entity Framework Core
* MySQL

### Frontend
* ReactJS
* npm
* Node

---
## Repository structure

Both frontend (*music-wellness-frontend*) and backend (*music-wellness-backend*) parts of the application can be found in this repository.

---
## Running the app

The process of running the application is described in this section. This tutorial assumes that a command line is used.

**It is important that the backend is running before trying to start the frontend, otherwise the frontend will not be able to display correct data.**

### Backend

#### Requirements
* .NET 5.0 SDK installed

#### Process
1. Move to the *music-wellness-backend* folder
2. Run the following command `dotnet run --project WebApp`

### Frontend

Frontend should be ran while backend is already running.

#### Requirements
* Node installed
* npm installed

#### Process
1. Move to the *music-wellness-frontend* folder
2. To install the needed packages and libraries run `npm install`
3. Run the following command `npm start`
