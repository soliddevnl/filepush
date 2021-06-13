## Description

Minimalist Self-hosted Image Service for user submitted images in your app (e.g. avatars).

## Usage
Uploading an image:

```bash
> curl -F 'file=@dog.jpg' http://localhost:5003
```

Fetching a file in a specific size(e.g. 320x240):
```
http://some.host/somename.png?w=320&h=240
```
Returns the image cropped to the desired size.
