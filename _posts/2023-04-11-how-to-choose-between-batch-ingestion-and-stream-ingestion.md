---
layout: post
author: Mohit Manna
title: How to choose between Batch ingestion and Stream Ingestion
date: 2023-03-09T04:25:20.893Z
thumbnail: /assets/img/posts/fp-graph-dataeng.jpg
category: data_engineering
summary: Every type of ingestion has its own trade-offs. In this blog we will
  try to find which one to choose when?
---
When we choose **streaming ingestion** over batch ingestion, we should consider below points:

1. If I ingest the data in real time, can downstream system handle the rate of data flow?
2. Do I need ms real-time data? Or micro batch approach work, e.g. every minute or so?
3. What benefits do I realize by implementing streaming? if I get data in real time, what actions can I take on that data that would be an improvement upon batch?
4. Will streaming be costlier?
5. A﻿re my streaming pipeline and system reliable and robust if infrastructure fails?
6. S﻿hould I use managed service (Kinesis, Google Pub/Sub, Dataflow) or stand up my own instances of Kafka,Flink, Spark, Pulsar etc? who will manage it? What are the costs and trade-offs?
7. If I’m deploying an ML model, what benefits do I have with online predictions and possibly continuous training?



As you can see, streaming-first might seem like a good idea, but it’s not always straightforward; extra costs and complexities inherently occur.