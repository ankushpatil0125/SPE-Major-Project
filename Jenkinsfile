pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME_REACT = 'frontend_image:latest'
        DOCKER_IMAGE_NAME_SPRING = 'backend_image:latest'
        DOCKER_IMAGE_NAME_FLASK  = 'flask_image:latest'
        GITHUB_REPO_URL = 'https://github.com/ankushpatil0125/SPE-Major-Project.git'
        EMAIL_TO = 'ankushpatil488@gmail.com'
        DOCKERHUB_USER = 'ankushpatil0125'
    }
    stages {
        stage('Checkout'){
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
                    sh "docker build -t ${DOCKERHUB_USER}/${DOCKER_IMAGE_NAME_REACT} -f ReactFrontend/Dockerfile ."
                    sh "docker build -t ${DOCKERHUB_USER}/${DOCKER_IMAGE_NAME_SPRING} -f SpringBackend/Dockerfile ."	
                    sh "docker build -t ${DOCKERHUB_USER}/${DOCKER_IMAGE_NAME_FLASK} -f FlaskBackend/Dockerfile ."
                    //docker.build("${DOCKER_IMAGE_NAME_REACT}", 'Spring Backend/BookReview/Dockerfile')
                    //docker.build("${DOCKER_IMAGE_NAME_SPRING}", 'React Frontend/Dockerfile')
                    //docker.build("${DOCKER_IMAGE_NAME_FLASK}", 'Flask Backend/flaskApi/Dockerfile')
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script{
                    docker.withRegistry('', 'DockerHubCred') {
                    // sh 'docker tag frontend_image ankushpatil0125/frontend_image'
                    // sh 'docker tag backend_image ankushpatil0125/backend_image'
                    // sh 'docker tag flask_image ankushpatil0125/flask_image'
                    sh 'docker push ankushpatil0125/frontend_image'
                    sh 'docker push ankushpatil0125/backend_image'
                    sh 'docker push ankushpatil0125/flask_image'
                    }
                 }
            }
        }

   stage('Run Ansible Playbook') {
            steps {
                script {
                    ansiblePlaybook(
                        playbook: 'deploy.yml',
                        inventory: 'inventory.txt'
                     )
                }
            }
        }
    }
	
    post {
        success {
            emailext body: 'Build successful.Check console output at $BUILD_URL to view the results. \n\n ${CHANGES} \n\n -------------------------------------------------- \n${BUILD_LOG, maxLines=100, escapeHtml=false}', 
                    to: "${EMAIL_TO}", 
                    subject: 'Build successful in Jenkins: $PROJECT_NAME - #$BUILD_NUMBER'
        }
        failure {
            emailext body: 'Check console output at $BUILD_URL to view the results. \n\n ${CHANGES} \n\n -------------------------------------------------- \n${BUILD_LOG, maxLines=100, escapeHtml=false}', 
                    to: "${EMAIL_TO}", 
                    subject: 'Build failed in Jenkins: $PROJECT_NAME - #$BUILD_NUMBER'
        }
        unstable {
            emailext body: 'Check console output at $BUILD_URL to view the results. \n\n ${CHANGES} \n\n -------------------------------------------------- \n${BUILD_LOG, maxLines=100, escapeHtml=false}', 
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
