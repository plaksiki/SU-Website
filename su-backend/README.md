# SU Portal Backend
The backend is expected to be a Spring Boot application packaged as a JAR file.

## For backend
 1.  *Build your Spring Boot project* and **generate a JAR file in gitbash/powershell**
  	cd /path/to/your/project
	./gradlew.bat clean build (or check what satisfies your OS) 
 2. After build, the JAR file will be in
    build/libs/your-project-*.jar
   **Rename the JAR file to app.jar:** "ren build\libs\*.jar app.jar"
 3. *Copy JAR to the VM*
	scp build\libs\app.jar root@10.93.26.192:/root/su-backend/backend/app.jar (in PowerShell)
 4. *Start the services using Docker Compose:*
	ssh root@10.93.26.192
	cd /root/su-backend
	docker-compose restart backend
 5. *Verify it works*
	docker logs su-backend
	curl http://localhost:8080/actuator/health

	# Or try to open in browser:
	http://10.93.26.192:8080/swagger-ui.html

## File structure
backend/
├── app.jar          <- Spring Boot JAR file (you need to create)
├── Dockerfile       <- For custom builds
└── README.md       

