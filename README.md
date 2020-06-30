## Accessing the kafka broker outside of the cluster

In order to access the kafka topics from outside of the cluster one need to do the following things:

1. Port-Forward the POD from within the cluster to a local port in the dev machine:

```shell
$ kubectl port-forward <kafka pod name> 9092
```

2. Add a new entry in `/etc/hosts` to forward the service name to localhost as follows:

```shell
127.0.0.1 kafka-service
```

After that done you can use kafkacat from you machine to consume or produce messages to the broker as simple as:

**Producer**

```shell
$ kafkacat -P -b localhost:9092 -t sample.topic
```

**Consumer**

```shell
$ kafkacat -C -b localhost:9092 -t sample.topic
```
