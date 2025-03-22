pipeline {
    agent any

    tools {
        jdk 'jdk17'
        nodejs 'node20'
    }

    stages {

        stage('Clean Workspace') {
            steps {
                script {
                    echo "Cleaning workspace..."
                    deleteDir() // Deletes everything in the Jenkins workspace before starting
                }
            }
        }

        stage('Git Checkout') {
            steps {
                script {
                    git branch: 'main', 
                        credentialsId: 'github_seccred',
                        url: 'https://github.com/Jothi1812/Social_Media_Analytics_Docker.git'
                }
            }
        }

        stage('Install Dependencies & Build') {
            steps {
                script {
                    sh '''
                    cd SocialInsight
                    
                    if [ -f package.json ]; then
                        echo "package.json found. Running npm install..."
                        npm install
                        npm run build
                    else
                        echo "ERROR: package.json is missing in task-manager. Skipping npm install."
                        exit 1
                    fi
                    '''
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'docker') {
                        def imageName = "jothi1811/devops"
                        def tag = "social"

                        sh """
                        cd SocialInsight
                        docker build -t ${imageName} .
                        docker tag ${imageName} ${imageName}:${tag}
                        docker push ${imageName}:${tag}
                        """
                    }
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    def containerName = "social_container"
                    def imageName = "jothi1811/devops:social"

                    // Stop and remove the existing container if running
                    sh """
                    docker stop ${containerName} || true
                    docker rm ${containerName} || true
                    """

                    // Run the new container on port 3002
                    sh """
                    docker run -d --name ${containerName} -p 3002:3000 ${imageName}
                    """
                }
            }
        }

    }
}
