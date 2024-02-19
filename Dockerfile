FROM maven:3.9.6-eclipse-temurin-21-jammy AS buildstage

WORKDIR /usr/app

COPY . .

RUN mvn -DskipTests -P generate-querydsl,prod clean install


FROM openjdk:21-jdk-oracle AS runstage

WORKDIR /usr/app

COPY --from=buildstage /usr/app/target/MyWorkouts-1.jar .

RUN mkdir -p logs/ img/ img/exercises

WORKDIR /usr/app

EXPOSE 8084

ENTRYPOINT ["java", "-jar", "/usr/app/MyWorkouts-1.jar"]