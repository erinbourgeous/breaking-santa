FROM golang:1.13-stretch
ADD . /go/src/breaking-santa
RUN go install breaking-santa
ENTRYPOINT /go/bin/breaking-santa
ENV HOST="0.0.0.0"
ENV PORT="8080"
EXPOSE 8080
