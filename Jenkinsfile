pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'github', url: 'https://github.com/mira182/MyWorkouts'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                // .env (secrets) lives on the build host next to the workspace and is
                // injected by docker compose automatically. It is NOT in git.
                sh 'docker compose build'
                sh 'docker compose up -d'
            }
        }
    }

    post {
        always {
            // Free up dangling images from previous builds
            sh 'docker image prune -f'
        }
    }
}
