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
Returns the image cropped to the desired size.

## Running
Filepush requires Docker.

```bash
docker run -v <PATH TO STORE FILES>:/files -p 5000:5000 joostvdriel/filepush:latest
```

## Configuration
Filepush uses dotenv for configuration. 
Create the following `.env.local` to keep your secrets out of Git.

```dotenv
APP_FILESYSTEM="local" # "local" / "s3" / "in-memory"

APP_PORT=5000
APP_FILE_DIR="/files"

# In case you want to store your files on S3:
APP_S3_REGION=
APP_S3_BUCKET=
APP_S3_KEY=
APP_S3_SECRET=
```
