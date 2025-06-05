pipeline {
    agent any
    tools {
        nodejs 'NodeJS' // Si vous utilisez Node.js
    }
    environment {
        SONAR_SCANNER_HOME = tool 'SonarScanner' // Configurez le scanner dans Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Beehnood/front-poker.git'
            }
        }

        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Tests & Coverage') {
            steps {
                sh 'npm run test -- --coverage' // Génère un rapport lcov
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube-Local') { // Nom de votre serveur SonarQube dans Jenkins
                    sh """
                    ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                      -Dsonar.projectKey=front-poker \
                      -Dsonar.sources=src \
                      -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                      -Dsonar.test.inclusions=**/*.test.js \
                      -Dsonar.exclusions=node_modules/**
                    """
                }
            }
        }

        stage('Check Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true // Bloque le build si qualité insuffisante
                }
            }
        }
    }
    post {
        always {
            recordIssues(
                tools: [esLint(pattern: '**/eslint-report.json')], // Si vous utilisez ESLint
                name: 'Code Analysis'
            )
            junit '**/test-results.xml' // Rapports de tests
        }
    }
}