pipeline {

    agent any

    environment {
        IMAGE_NAME = "tawa123/blog-platform"
        TAG = "latest"
    }

    stages {

        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$TAG .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push $IMAGE_NAME:$TAG'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker rm -f blog-platform || true

                docker run -d \
                --name blog-platform \
                -p 80:3000 \
                $IMAGE_NAME:$TAG
                '''
            }
        }

    }
}
