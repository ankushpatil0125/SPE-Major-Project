FROM openjdk:17
WORKDIR /app
#COPY target/BookReview-0.0.1-SNAPSHOT.jar /app/BookReview.jar
COPY target/BookReview-0.0.1-SNAPSHOT.jar /app/BookReview-0.0.1-SNAPSHOT.jar
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "/app/BookReview-0.0.1-SNAPSHOT.jar.jar"]
