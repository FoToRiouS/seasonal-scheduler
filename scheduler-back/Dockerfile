# Deve ser executado na pasta raiz onde estão os projetos, pois a arquitetura precisa ser importada
FROM maven:3.8.6-eclipse-temurin-24-alpine as build
ENV APP=/usr/app/
RUN mkdir -p $APP
WORKDIR $APP

ADD pom.xml $APP
ADD . $APP

RUN --mount=type=cache,target=/root/.m2 mvn clean package

FROM eclipse-temurin:24-jre-alpine
COPY --from=build /usr/app/target/scheduler.jar /app/runner.jar
EXPOSE 8443
ENTRYPOINT ["java", "-jar", "/app/runner.jar"]