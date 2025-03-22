pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Jothi1812/Social_Media_Analytics_Docker.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t social_media_analytics .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker run -d -p 3003:80 --name social_media_analytics_container social_media_analytics'
                }
            }
        }
    }
}
