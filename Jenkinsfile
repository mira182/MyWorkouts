pipeline {
    agent any
    stages {
        stage('Clone repo') {
            steps {
                script {
                    dir("${WORKSPACE}") {
                        git branch: "master",
                        url: "https://github.com/mira182/MyWorkout.git"
                    }
                }
            }
        }
        stage('Build') {
            steps {
                sh 'mvn -P generate-querydsl,prod -DskipTests clean install'
                sh 'docker compose up'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker compose up'
            }
        }
    }
}