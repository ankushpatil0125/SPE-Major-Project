pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME_REACT = 'frontend_image:latest'
        DOCKER_IMAGE_NAME_SPRING = 'backend_image:latest'
        DOCKER_IMAGE_NAME_FLASK = 'flask_image:latest'
        GITHUB_REPO_URL = 'https://github.com/ankushpatil0125/SPE-Major-Project.git'
        EMAIL_TO = 'ankushpatil488@gmail.com'
        DOCKERHUB_USER = 'ankushpatil0125'
        EC2_DOCKER_IMAGE_NAME_REACT = 'EC2_frontend_image:latest'
        EC2_DOCKER_IMAGE_NAME_SPRING = 'EC2_backend_image:latest'
        EC2_DOCKER_IMAGE_NAME_FLASK = 'EC2_flask_image:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Checkout the code from the GitHub repository
                    git branch: 'main', url: "${GITHUB_REPO_URL}"
                }
            }
        }
        stage('Check TEST cases') {
            steps {
                script {
                    sh 'mvn -f SpringBackend/ test'
                }
            }
        }
        stage('Build Maven Project') {
            steps {
                script {
                    // Checkout the code from the GitHub repository
                    sh 'mvn -f SpringBackend/pom.xml clean install -DskipTests'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    sh "docker build -t ${DOCKERHUB_USER}/${EC2_DOCKER_IMAGE_NAME_REACT} -f ReactFrontend/Dockerfile ."
                    sh "docker build -t ${DOCKERHUB_USER}/${EC2_DOCKER_IMAGE_NAME_SPRING} -f SpringBackend/Dockerfile ."
                    sh "docker build -t ${DOCKERHUB_USER}/${EC2_DOCKER_IMAGE_NAME_FLASK} -f FlaskBackend/Dockerfile ."
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh 'docker push ankushpatil0125/EC2_frontend_image'
                        sh 'docker push ankushpatil0125/EC2_backend_image'
                        sh 'docker push ankushpatil0125/EC2_flask_image'
                    }
                }
            }
        }
        stage('Add EC2 Instance to Known Hosts') {
            steps {
                sh 'ssh-keyscan -H 18.234.46.183 >> ~/.ssh/known_hosts'
            }
        }
        stage('Run Ansible EC2 Playbook') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'deploy-ec2.yml',
                        inventory: 'ec2-inventory.txt',
                        extras: '-e ansible_user=ubuntu -e ansible_ssh_private_key_file=/home/ankushpatil488/Downloads/SPE_WebServer_Key.pem',
                        credentialsId: 'Jenkins_access_ec2' // Reference your credentials ID here
                    )
                }
            }
        }
    }
    post {
        success {
            emailext body: 'Build successful. Check console output at $BUILD_URL to view the results.\n\n ${CHANGES} \n\n -------------------------------------------------- \n${BUILD_LOG, maxLines=100, escapeHtml=false}', 
                    to: "${EMAIL_TO}", 
                    subject: 'Build successful in Jenkins: $PROJECT_NAME - #$BUILD_NUMBER'
        }
        failure {
            emailext body: 'Check console output at $BUILD_URL to view the results.\n\n ${CHANGES} \n\n -------------------------------------------------- \n${BUILD_LOG, maxLines=100, escapeHtml=false}', 
                    to: "${EMAIL_TO}", 
                    subject: 'Build failed in Jenkins: $PROJECT_NAME - #$BUILD_NUMBER'
        }
        unstable {
            emailext body: 'Check console output at $BUILD_URL to view the results.\n\n ${CHANGES} \n\n -------------------------------------------------- \n${BUILD_LOG, maxLines=100, escapeHtml=false}', 
                    to: "${EMAIL_TO}", 
                    subject: 'Unstable build in Jenkins: $PROJECT_NAME - #$BUILD_NUMBER'
        }
        changed {
            emailext body: 'Check console output at $BUILD_URL to view the results.', 
                    to: "${EMAIL_TO}", 
                    subject: 'Jenkins build is back to normal: $PROJECT_NAME - #$BUILD_NUMBER'
        }
    }
}
