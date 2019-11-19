FROM golang:1.8
ADD . /go/src/breaking-santa
RUN go install breaking-santa
ENTRYPOINT /go/bin/basic_web_server
ENV HOST="0.0.0.0"
ENV PORT="8080"
EXPOSE 8080
