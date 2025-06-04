pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS' // Correspond au nom de votre installation Node.js dans Jenkins
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'URL_DE_VOTRE_DEPOT_GIT'
            }
        }
        
        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                dir('client') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Tests') {
            steps {
                sh 'npm run test'
                dir('client') {
                    sh 'npm run test'
                }
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'npx sonarqube-scanner'
                }
            }
        }
    }
    
    post {
        always {
            junit '**/test-results.xml' // Si vous générez des rapports JUnit
            archiveArtifacts '**/dist/**' // Archive les artefacts de build
        }
    }
}