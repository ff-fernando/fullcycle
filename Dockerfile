FROM golang:alpine AS build
WORKDIR /go/src/github.com/ff-fernando/fullcycle
COPY full-cycle-rocks.go .
RUN go build -ldflags '-s -w' full-cycle-rocks.go

FROM scratch
WORKDIR /
COPY --from=build /go/src/github.com/ff-fernando/fullcycle /
CMD [ "./full-cycle-rocks" ]