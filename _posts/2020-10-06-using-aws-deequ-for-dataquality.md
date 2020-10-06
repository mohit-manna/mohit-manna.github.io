---
layout: post
author: mohit
title: Using AWS Deequ for DataQuality
date: 2020-10-06T02:32:12.459Z
thumbnail: /assets/img/posts/dataquality.jpg
category: Spark
summary: "Here we use AWS Deequ Open Source jar in Spark to read data from HDFS
  and show data quality. In similar way in AWS Spark EMR + S3 can be used "
---
This post is divided into 3 sections. 

##### Preparation:

We need a running Hadoop System . I have used a cluster of 3 machines. \
!\[Hadoop System](https://imgur.com/n4uuMj3)

We need a running Spark Cluster. I have used Spark without hadoop. You can pick any other spark too. \
!\[Spark System](https://imgur.com/NYpPo5v)

We need a DataSet. AWS provides a Customer Review Dataset. <https://s3.amazonaws.com/amazon-reviews-pds/tsv/index.txt>\
Decompress it using `gunzip `command\
Put it into HDFS. I have created a new Directory and kept it inside\
`$ hdfs dfs -mkdir /DataSet`\
`$ hdfs dfs -copyFromLocal amazon_reviews_us_Electronics_v1_00.tsv /DataSet/ `

Download AWS Deequ Jar file. Just hit the command below:\
`wget http://repo1.maven.org/maven2/com/amazon/deequ/deequ/1.0.1/deequ-1.0.1.jar`\
Start Spark Shell by including JAR with it.\
`$ spark-shell --conf spark.jars=deequ-1.0.1.jar`

``

##### Implementation: 

##### Summary: