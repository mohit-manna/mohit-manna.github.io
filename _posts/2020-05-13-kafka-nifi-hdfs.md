---
layout: post
author: John Doe
title: Kafka Nifi HDFS
date: 2020-05-13T09:52:20.613Z
thumbnail: /assets/img/posts/fp-graph-dataeng.jpg
category: hadoop
summary: A small setup which showcases integration of Nifi, Kafka and HDFS
---

### Requirement
Setup a distributed kafka cluster with 3 nodes (brokers) and (preferably) external zookeepers.Create topics in kafka (with 2 partitions at least each and replication as 3) that will contain data from a processed log file. Setup Nifi distributed cluster using the same zookeeper quorum as that used by Kafka.

> Zookeper status to show initial state of machine

starting zookeeper
![Start Zookeeper](https://i.imgur.com/L0apX36.png){:.card-img-top}

status of zookeeper
![Status of  Zookeeper](https://i.imgur.com/FZD422u.png){:.card-img-top}


See running java processes
![jps](https://i.imgur.com/ACxcmA1.png){:.card-img-top}


So, how to configure a zookeeper? and why do we needed it?
![zookeeper config](https://i.imgur.com/oAE0wIl.png){:.card-img-top}

Whenever we need to manage cluster. Zookeeper comes handy.

Start Kafka Server
![start Kafka](https://i.imgur.com/1OwhNDt.png){:.card-img-top}

Now lets check if its running
![jps](https://i.imgur.com/1OwhNDt.png){:.card-img-top}


As the requirement demands we need some topics. So to create them
![kafka create topic](https://i.imgur.com/cBsjkAI.png){:.card-img-top}

Another topic
![kafka create topic](https://i.imgur.com/cBsjkAI.png){:.card-img-top}

Nifi initial status
![Nifi empty](https://i.imgur.com/WWtowgp.png{:.card-img-top}){:.card-img-top}

Nifi Cluster which is configured using zookeeper
![Nifi Cluster](https://i.imgur.com/HU6Zdzm.png){:.card-img-top}

Nifi Dataflow overflow
![Nifi Cluster](https://i.imgur.com/a2vaaZs.png){:.card-img-top}

Nifi Split Text to show the dataflow ina better way
![Nifi Split Text](https://i.imgur.com/KHTpBpf.png){:.card-img-top}

Topics Created By Nifi according to the Logs 
![Topics Created By Nifi](https://i.imgur.com/IWA1r4n.png){:.card-img-top}

Flow files 
![Flow files](https://i.imgur.com/78G1Nop.png){:.card-img-top}

HDFS ls
![HDFS ls](https://i.imgur.com/9riibp7.png){:.card-img-top}

Nifi Consume Kafka
![Nifi Consume Kafka](https://i.imgur.com/UX7ubS2.png){:.card-img-top}

HDFS Data ingestion
![HDFS Data ingestion](https://i.imgur.com/3lUTxsT.png){:.card-img-top}

sample json
![sample json](https://i.imgur.com/buCGjG6.png){:.card-img-top}

replace text nifi
![replace text nifi](https://i.imgur.com/uY5HXeF.png){:.card-img-top}

nifi process group
![nifi process group](https://i.imgur.com/OiOp0MD.png){:.card-img-top}

setting file name using variable
![setting file name using variable](https://i.imgur.com/iyVi8fc.png){:.card-img-top}

setting fnm using variable
![setting fnm using variable](https://i.imgur.com/2xrTw2v.png){:.card-img-top}

working
![working](https://i.imgur.com/OHQUm4s.png){:.card-img-top}

full flow
![full flow](https://i.imgur.com/8s1Uv50.png){:.card-img-top}

output
![output](https://i.imgur.com/maCHsht.png){:.card-img-top}