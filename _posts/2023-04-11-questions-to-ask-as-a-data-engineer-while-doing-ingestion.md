---
layout: post
author: Mohit Manna
title: Questions to ask as a Data Engineer while doing ingestion
date: 2023-03-09T04:10:24.606Z
thumbnail: /assets/img/posts/fp-graph-dataeng.jpg
category: data_engineering
summary: This post revolves around ingestion and things to keep in mind while
  ingesting data from one source to another
---
Ingestion is the most crucial part of data engineering life cycle. It stands at second step. First step is understanding characteristics of source system and source data. 
A good ingestion approach can avoid bottlenecks and maintain quality of data. Unreliable source and ingestion systems have a ripple effect across the data engineering lifecycle.

**Key engineering considerations for the ingestion phase:**

1. What are the use cases for the data I’m ingesting? Can I reuse this data rather than create multiple versions of the same dataset?
2. Are the systems generating and ingesting this data reliably, and is the data available when I need it?
3. What is the data destination after ingestion?
4. How frequently will I need to access the data?
5. In what volume will the data typically arrive?
6. What format is the data in? Can my downstream storage and transformation systems handle this format?
7. Is the source data in good shape for immediate downstream use? If so, for how long, and what may cause it to be unusable?
8. If the data is from a streaming source, does it need to be transformed before reaching its destination? Would an in-flight transformation be appropriate, where the data is transformed within the stream itself?

S﻿ource: Fundamentals of Data Engineering Reis J