FROM eclipse-temurin:21-jre

WORKDIR /app
COPY backend/demo/pom.xml .
RUN mvn dependency:go-offline
COPY backend/demo/src ./src
RUN mvn package -DskipTests

COPY backend/demo/target/demo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
