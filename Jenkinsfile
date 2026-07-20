pipeline {

    agent any

    environment {

        DOCKER_USER = "naveengudala"

        FRONTEND_IMAGE = "${DOCKER_USER}/blog-frontend"

        BACKEND_IMAGE = "${DOCKER_USER}/blog-backend"

    }

    stages {

        stage('Clone Repository') {

            steps {

                git 'https://github.com/use/blog-platform.git'

            }

        }

        stage('Build Frontend Image') {

            steps {

                sh 'docker build -t $FRONTEND_IMAGE:latest ./frontend'

            }

        }

        stage('Build Backend Image') {

            steps {

                sh 'docker build -t $BACKEND_IMAGE:latest ./backend'

            }

        }

        stage('Login to DockerHub') {

            steps {

                withCredentials([usernamePassword(credentialsId: 'dockerhub',

                                usernameVariable: 'USERNAME',

                                passwordVariable: 'PASSWORD')]) {

                    sh '''

                    echo $PASSWORD | docker login -u $USERNAME --password-stdin

                    '''

                }

            }

        }

        stage('Push Images') {

            steps {

                sh '''

                docker push $FRONTEND_IMAGE:latest

                docker push $BACKEND_IMAGE:latest

                '''

            }

        }

        stage('Deploy') {

            steps {

                sh '''

                docker stop frontend || true
                docker rm frontend || true

                docker stop backend || true
                docker rm backend || true

                docker run -d --name frontend -p 80:80 $FRONTEND_IMAGE:latest

                docker run -d --name backend -p 8080:80 $BACKEND_IMAGE:latest

                '''
            }

        }

    }

}
