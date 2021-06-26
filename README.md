## Description

Minimalist Self-hosted Image Service for user submitted files in your app (e.g. avatars).

## Features

- Self-hosted
- One simple API endpoint for uploading files
- Save files on AWS S3, on your local filesystem or in-memory (for tests).

## Usage

Uploading a file:

```bash
> curl -F 'file=@dog.jpg' http://localhost:5000
{"filename":"b1e75049-d550-43e2-abc0-796fb809fb85","mimetype":"image/jpeg"}
```

Fetching a file:

```
http://localhost:5000/b1e75049-d550-43e2-abc0-796fb809fb85
```

## Running

Filepush requires Docker.

```bash
docker run -v <PATH TO STORE FILES>:/files -p 5000:5000 joostvdriel/filepush:latest
```

## Configuration

Configuration is done via environment variables.

## Configuration

### General

| Setting  | Default value | Description |
| ------------- | ------------- |------------- |
| APP_PORT  | 5000 | port to run the application on |
| APP_FILESYSTEM  | local | local, in-memory or S3 |

### Local filesystem

| Setting  | Value | Description |
| ------------- | ------------- |------------- |
| APP_FILESYSTEM  | local | local, in-memory or S3 |
| APP_FILE_DIR  | "/files" | The location to store the uploaded files, only for the `local` filesystem. |

### S3 filesystem

| Setting  | Example | Description |
| ------------- | ------------- |------------- |
| APP_S3_REGION  | eu-central-1 | AWS S3 Region |
| APP_S3_BUCKET  |  my-bucket | AWS S3 Bucket |
| APP_S3_KEY  | ABCDefGH  | AWS S3 auth key |
| APP_S3_SECRET  | very-secret | AWS S3 auth secret |

Setting configuration variables is all set through env variables that get passed to the docker container.

### Example:

```
docker run -e APP_FILESYSTEM="local" -e APP_FILE_DIR="/files" -s -v ./files:/files -p 5000:5000 joostvdriel/filepush:latest
