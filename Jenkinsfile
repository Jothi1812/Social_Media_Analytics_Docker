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
                    if [ -d "SocialInsight" ]; then
                        cd SocialInsight
                        if [ -f package.json ]; then
                            echo "package.json found. Running npm install..."
                            npm install
                            npm run build
                        else
                            echo "ERROR: package.json is missing in SocialInsight. Skipping npm install."
                            exit 1
                        fi
                    else
                        echo "ERROR: SocialInsight directory is missing."
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
                        docker build -t ${imageName}:${tag} -f SocialInsight/Dockerfile .
                        docker push ${imageName}:${tag}
                        """
                    }
                }
            }
        }

        stage('Deploy Docker Container') {
    steps {
        script {
            def containerName = "jothi-container"
            def imageName = "jothi1811/devops:social"

            // Stop and remove the existing container if running
            sh """
            docker stop ${containerName} || true
            docker rm ${containerName} || true
            """

            // Run the new container on the correct port
            sh """
            docker run -d --name ${containerName} -p 5173:80 ${imageName}
            """
        }
    }
}


    }
}
