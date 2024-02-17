FROM openjdk:21-jdk-oracle

COPY target/MyWorkouts-1.jar /usr/app/
WORKDIR /usr/app
RUN mkdir -p logs/ img/ img/exercises
WORKDIR /usr/app
EXPOSE 8082

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "/usr/app/MyWorkouts-1.jar"]