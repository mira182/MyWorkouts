pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'git credentialsId: \'github\', url: \'https://github.com/mira182/MyWorkout\'',
                sh 'mvn -P generate-querydsl,prod -DskipTests clean install'
                sh 'docker compose up'
            }
        }
    }
}