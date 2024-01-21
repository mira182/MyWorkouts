FROM openjdk:17-oracle

COPY target/MyWorkouts-1.jar /usr/app/
WORKDIR /usr/app
RUN mkdir -p logs/ export/ img/ img/exercises
WORKDIR /usr/app
EXPOSE 8081

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "/usr/app/MyWorkouts-1.jar"]