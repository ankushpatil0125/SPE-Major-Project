FROM openjdk:17
WORKDIR /app
COPY target/BookReview-0.0.1-SNAPSHOT.jar /app/BookReview.jar
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "/app/BookReview.jar"]