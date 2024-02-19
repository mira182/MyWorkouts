pipeline {
    agent any
    
    environment {
        MAVEN_HOME = tool 'Maven' // Make sure you have configured Maven tool in Jenkins
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'github', url: 'https://github.com/mira182/MyWorkouts'
            }
        }
    
        
        stage('Run with Docker Compose') {
            steps {
                script {
                    dockerComposeBuild()
                    dockerComposeStop()
                    dockerComposeDown()
                    dockerComposeRemove()
                    dockerComposeUp()
                }
            }
        }
    }
}

// Function to run docker-compose build
def dockerComposeBuild() {
    sh "docker-compose build"
}

def dockerComposeStop() {
    sh "docker stop myworkouts_backend || true"
    sh "docker stop myworkouts_frontend || true"
}

def dockerComposeDown() {
    sh "docker network disconnect myworkouts_myworkouts-backend postgres_for_my_apps || true"
    sh "docker-compose down"
}


def dockerComposeRemove() {
    sh "docker-compose rm -sf"
}

// Function to run docker-compose up
def dockerComposeUp() {
    sh "docker-compose up -d"
    sh "docker network connect myworkouts_myworkouts-backend postgres_for_my_apps"
}