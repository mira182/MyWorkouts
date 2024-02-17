pipeline {
    agent any

    environment {
        MAVEN_HOME = tool 'Maven' // Make sure you have configured Maven tool in Jenkins
    }

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'github', url: 'https://github.com/mira182/MyWorkouts.git'
            }
        }

        stage('Build with Maven') {
            steps {
                sh "${env.MAVEN_HOME}/bin/mvn -P generate-querydsl,prod -DskipTests clean install" // Adjust the Maven command as per your project needs
            }
        }

        stage('Run with Docker Compose') {
            steps {
                script {
                    dockerComposeBuild()
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

// Function to run docker-compose up
def dockerComposeUp() {
    sh "docker-compose up -d"
}