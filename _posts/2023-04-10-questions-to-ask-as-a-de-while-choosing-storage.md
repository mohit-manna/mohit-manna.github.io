---
layout: post
author: Mohit Manna
title: "Questions to ask as a DE while choosing storage "
date: 2023-03-08T03:12:51.355Z
thumbnail: /assets/img/posts/fp-graph-dataeng.jpg
category: data_engineering
summary: There are many storage solutions like S3 which is object storage and
  gives us query capabilities, Kafka has the ability to simultaneously ingest
  and store ..
---
S﻿ource: Fundamentals of Data Engineering Reis J\
Storage stage touches many other stages of data engineering lifecycle like ingestion, transformation and serving etc. There are many storage solutions like S3 which is object storage and gives us query capabilities, Kafka has the ability to simultaneously ingest and store and query systems for message with object storage being a standard layer. \
\
**K﻿ey considerations while evaluating a storage systems:**

1. Is this storage solution compatible with the architecture’s required
   write and read speeds?
2. Will storage create a bottleneck for downstream processes?
3. Do you understand how this storage technology works? Are you
   utilizing the storage system optimally or committing unnatural acts?
   For instance, are you applying a high rate of random access updates in
   an object storage system? (This is an antipattern with significant
   performance overhead.)
4. Will this storage system handle anticipated future scale? You should
   consider all capacity limits on the storage system: total available
   storage, read operation rate, write volume, etc.
5. Will downstream users and processes be able to retrieve data in the
   required service-level agreement (SLA)
6. Are you capturing metadata about schema evolution, data flows, data
   lineage, and so forth? Metadata has a significant impact on the utility
   of data. Metadata represents an investment in the future, dramatically
   enhancing discoverability and institutional knowledge to streamline
   future projects and architecture changes.
7. Is this a pure storage solution (object storage), or does it support
   complex query patterns (i.e., a cloud data warehouse)?
8. Is the storage system schema-agnostic (object storage)? Flexible
   schema (Cassandra)? Enforced schema (a cloud data warehouse)?
9. How are you tracking master data, golden records data quality, and
   data lineage for data governance? (We have more to say on these in
   “Data Management”.)
10. How are you handling regulatory compliance and data sovereignty?
    For example, can you store your data in certain geographical locations
    but not others?



**We should also keep in mind the data access frequency :**

D﻿ata access frequency decides the "temperature" of data. It can fall into either of these two categories:

1. *H﻿ot data:* retrieved many times a day . There can be a sub category *lukewarm data*. which can be accessed every month or week. 
2. *C﻿old data*: seldom queried. It is appropriate for archiving systems. This is cheaper than hot layer but when you need the data you will have to request in advance. The data is first moved in hot layer then it becomes available for you to access.