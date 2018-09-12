To build the docker image execute

``` docker build -t webcam-face-capture .```

To run as a webservice execute
```docker run --name face-capture -p 8080:8080 -d webcam-face-capture```


To use a shared volume

```docker volume create face-store```

```docker run --name face-capture -v face-store:/data -e STORAGE=/data -p 8080:8080 -d webcam-face-capture```

