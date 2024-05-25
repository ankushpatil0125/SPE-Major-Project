# Book Rating Prediction System
## Overview
This project is an MLOps pipeline for a book review rating prediction system. It integrates a multi-service architecture featuring a React frontend, a Spring Boot backend, and a Flask-based machine learning service that predicts review ratings using a pre-trained model hosted on Hugging Face. The pipeline automates and streamlines the processes of code integration, containerization, deployment, and monitoring using Jenkins, Docker, Ansible, and the ELK stack.

## Features

- Frontend: A React application for users to browse books, submit reviews, and view predicted ratings.
- Spring Boot Backend: A Spring Boot application managing user authentication, book management, and review processing.
- Flask Backend: To handle the api call to predict the rating of book
- Machine Learning: A Flask API that loads a pre-trained NLP model from Hugging Face to predict review ratings.
- CI/CD Pipeline: Automated integration, testing, and deployment using Jenkins.
- Containerization: Dockerized services for consistent and portable deployment.

## Things Need to be already installed
Before setting up the project, ensure you have the following tools installed:

- Git
- Docker
- Jenkins
- Ansible
- Node.js and npm
- Java JDK
- Python


>Clone the Repo
- git clone https://github.com/ankushpatil0125/SPE-Major-Project.git
- cd book-review-rating-prediction
