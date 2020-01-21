#! groovy
import jenkins.model.*

node {
  def project = "navikt"
  def application = "melosys-schema"

  /* metadata */
  def buildVersion // major.minor.BUILD_NUMBER
  def semver
  def commitHash, commitHashShort, commitUrl, committer
  def scmVars, prNummer, jarFile

  /* tools: http://a34apvl00025.devillo.no:8080/configureTools/ */
  def NODEJS_HOME = tool "node-11.12.0" // => "installation directory" = "/opt/node"
  echo "${NODEJS_HOME}"
  def node = "${NODEJS_HOME}/bin/node"
  def npm = "${NODEJS_HOME}/bin/npm"

  // delete whole workspace before starting the build,
  // so that the 'git clone' command below doesn't fail due to
  // directory not being empty
  cleanWs()

  stage('Checkout') {
    echo('Checkout from Github ...')
    scmVars = checkout scm
    scmVars.each { print it }
  }

  stage('Initialize scm') {
    commitHash = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
    commitHashShort = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
    commitUrl = "https://github.com/${project}/${application}/commit/${commitHash}"
    // gets the person who committed last as "Surname, First name"
    committer = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()
    def lsRemote = sh(script: "git ls-remote origin pull/*/head", returnStdout: true)
    lsRemote.toString().split('\n').each {
      if (it.startsWith(commitHash)) {
        // Finn pr-nummer fra strengen: refs/pull/85/head
        prNummer = it.split('/')[2]
      }
    }
    echo("prNummer: ${prNummer}")
  }

  stage('npm install ') {
    echo('Step: npm install package depenencies')
    sh "${node} -v"
    sh "${npm} -v"
    sh "${npm} config ls"
    sh "${npm} install"
    sh "${npm} run zip"

    semver = sh(returnStdout: true, script: "node -pe \"require('./package.json').version\"").trim()
    echo("semver=*${semver}*")
  }

  stage('Create jar file') {
    def schemaLibPath = "lib/@navikt"
    def schemaZipFile = sh(
      script: "find ${schemaLibPath} -type f -name 'melosys-schema*.zip'",
      returnStdout: true).trim()
    echo schemaZipFile

    if (scmVars.GIT_BRANCH.equalsIgnoreCase("master")) {
      buildVersion = "${semver}-${BUILD_NUMBER}"
    }
    else if (prNummer != null) {
      // Hvis det eksisterer et token så betyr det at dette er en pull-request
      buildVersion = "${semver}-PR-${prNummer}-SNAPSHOT"
    }
    else {
      buildVersion = "${semver}-SNAPSHOT"
    }
    echo("buildVersion=${buildVersion}")
    jarFile = schemaZipFile.replace(".zip", "-${BUILD_NUMBER}.jar")
    sh "cp ${schemaZipFile} ${jarFile}"
  }

  stage('Deploy to Nexus') {
    def repositoryId
    if (scmVars.GIT_BRANCH.equalsIgnoreCase("master")) {
      repositoryId = "maven-releases"
    }
    else {
      repositoryId = "maven-snapshots"
    }

    echo("repositoryId:${repositoryId}")

    configFileProvider(
      [configFile(fileId: 'navRepoAdeoMavenSettings', variable: 'MAVEN_SETTINGS')]) {
      sh """
     	  	mvn --settings ${MAVEN_SETTINGS} deploy:deploy-file -Dfile=${jarFile} -DartifactId=${application} \
	            -DgroupId=no.nav.melosys -Dversion=${buildVersion} \
	 	        -Ddescription='Melosys-web application' \
		        -DrepositoryId=${repositoryId} -Durl=https://repo.adeo.no/repository/${repositoryId}
        """
    }
  }
}
