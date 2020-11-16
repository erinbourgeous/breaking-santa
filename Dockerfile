FROM golang:1.13-stretch
ADD . /go/src/breaking-santa
RUN go get -u github.com/go-sql-driver/mysql
RUN go install breaking-santa
ENTRYPOINT /go/bin/breaking-santa
ENV HOST="0.0.0.0"
ENV MYSQL_USER='root'
ENV MYSQL_PASSWORD='password'
