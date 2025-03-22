pipeline {
    agent any

    environment {
        IMAGE_NAME = "jothi1811/devops"
        CONTAINER_NAME = "social_media_analytics_container"
        PORT = "3003"
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github_seccred', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                        sh 'git clone https://${GIT_USER}:${GIT_PASS}@github.com/Jothi1812/Social_Media_Analytics_Docker.git'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $IMAGE_NAME .'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    }
                }
            }
        }

        stage('Push Docker Image to Hub') {
            steps {
                script {
                    sh 'docker push $IMAGE_NAME'
                }
            }
        }

        stage('Stop Existing Container') {
            steps {
                script {
                    sh 'docker stop $CONTAINER_NAME || true'
                    sh 'docker rm $CONTAINER_NAME || true'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker run -d -p $PORT:80 --name $CONTAINER_NAME $IMAGE_NAME'
                }
            }
        }

        stage('Post-Deployment Check') {
            steps {
                script {
                    sh 'docker ps | grep $CONTAINER_NAME'
                }
            }
        }
    }
}
