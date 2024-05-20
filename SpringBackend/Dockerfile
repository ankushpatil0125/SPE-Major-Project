FROM openjdk:17
WORKDIR /app
#COPY target/BookReview-0.0.1-SNAPSHOT.jar /app/BookReview.jar
COPY SpringBackend/target/BookReview-0.0.1-SNAPSHOT.jar BookReview-0.0.1-SNAPSHOT.jar
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "BookReview-0.0.1-SNAPSHOT.jar.jar"]
