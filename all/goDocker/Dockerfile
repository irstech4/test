FROM golang:1.21-alpine AS builder

WORKDIR /app  

COPY go.mod ./

COPY . . 

RUN go mod download  

RUN go build -o main

FROM gcr.io/distroless/base-debian12

WORKDIR /app  

COPY --from=builder /app/main main

EXPOSE 8081
CMD [ "main" ] 