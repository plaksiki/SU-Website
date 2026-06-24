FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY backend/demo/pom.xml .
RUN mvn dependency:go-offline
COPY backend/demo/src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:21-jre-alpine
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]