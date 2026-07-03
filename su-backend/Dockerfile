FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY backend/demo/pom.xml .
COPY backend/demo/src ./src

RUN mvn package -DskipTests

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]
