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
<img class="card-img-top" src="https://i.imgur.com/n4uuMj3.jpg" alt="Hadoop System">

We need a running Spark Cluster. I have used Spark without hadoop. You can pick any other spark too. \
<img class="card-img-top" src="https://imgur.com/NYpPo5v.jpg" alt="Hadoop System">\
\
We need a DataSet. AWS provides a Customer Review Dataset. <https://s3.amazonaws.com/amazon-reviews-pds/tsv/index.txt>\
Decompress it using `gunzip`command\
Put it into HDFS. I have created a new Directory and kept it inside\
`$ hdfs dfs -mkdir /DataSet`\
`$ hdfs dfs -copyFromLocal amazon_reviews_us_Electronics_v1_00.tsv /DataSet/`

Download AWS Deequ Jar file. Just hit the command below:\
`wget http://repo1.maven.org/maven2/com/amazon/deequ/deequ/1.0.1/deequ-1.0.1.jar`\
Start Spark Shell by including JAR with it.\
`$ spark-shell --conf spark.jars=deequ-1.0.1.jar`

##### Implementation:

> Load and see schema of Data

```
scala> val dataset=spark.read.option("sep","\t").option("header","true").csv("/DataSet/amazon_reviews_us_Electronics_v1_00.tsv")
dataset: org.apache.spark.sql.DataFrame = [marketplace: string, customer_id: string ... 13 more fields]


scala> dataset.printSchema()
root
 |-- marketplace: string (nullable = true)
 |-- customer_id: string (nullable = true)
 |-- review_id: string (nullable = true)
 |-- product_id: string (nullable = true)
 |-- product_parent: string (nullable = true)
 |-- product_title: string (nullable = true)
 |-- product_category: string (nullable = true)
 |-- star_rating: string (nullable = true)
 |-- helpful_votes: string (nullable = true)
 |-- total_votes: string (nullable = true)
 |-- vine: string (nullable = true)
 |-- verified_purchase: string (nullable = true)
 |-- review_headline: string (nullable = true)
 |-- review_body: string (nullable = true)
 |-- review_date: string (nullable = true)


```

> Load Deequ Classes and Functions

```

scala> import com.amazon.deequ.analyzers.runners.{AnalysisRunner, AnalyzerContext}
import com.amazon.deequ.analyzers.runners.{AnalysisRunner, AnalyzerContext}

scala> import com.amazon.deequ.analyzers.runners.AnalyzerContext.successMetricsAsDataFrame
import com.amazon.deequ.analyzers.runners.AnalyzerContext.successMetricsAsDataFrame

scala> import com.amazon.deequ.analyzers.{Compliance, Correlation, Size, Completeness, Mean, ApproxCountDistinct}
import com.amazon.deequ.analyzers.{Compliance, Correlation, Size, Completeness, Mean, ApproxCountDistinct}


```

> Call functions

```
scala> val res: AnalyzerContext={ AnalysisRunner 
     | //data to run the analysis on
     | .onData(dataset)
     | .addAnalyzer(Size())
     | .addAnalyzer(Completeness("review_id"))
     | .addAnalyzer(ApproxCountDistinct("review_id"))
     | .run()
     | }
20/10/06 10:08:42 WARN util.Utils: Truncated the string representation of a plan since it was too large. This behavior can be adjusted by setting 'spark.debug.maxToStringFields' in SparkEnv.conf.
res: com.amazon.deequ.analyzers.runners.AnalyzerContext = AnalyzerContext(Map(Size(None) -> DoubleMetric(Dataset,Size,*,Success(3093869.0)), Completeness(review_id,None) -> DoubleMetric(Column,Completeness,review_id,Success(1.0)), ApproxCountDistinct(review_id,None) -> DoubleMetric(Column,ApproxCountDistinct,review_id,Success(2991306.0))))
```

> convert metrics into dataframe

```

scala> val metrics=successMetricsAsDataFrame(spark,res)
metrics: org.apache.spark.sql.DataFrame = [entity: string, instance: string ... 2 more fields]

```

see output

```

scala> metrics.show()
+-------+---------+-------------------+---------+
| entity| instance|               name|    value|
+-------+---------+-------------------+---------+
|Dataset|        *|               Size|3093869.0|
| Column|review_id|       Completeness|      1.0|
| Column|review_id|ApproxCountDistinct|2991306.0|
+-------+---------+-------------------+---------+



```

##### Summary:

The dataset has 2991306.0 distinct **review_id**s and completeness 1 and size as shown above.\
\
Since we are not using parquet datatype. The dataype by default is String so we need to cast it to Integer and Date in order to put more data quality checks.\
So to cast 

```
scala> val dataset2=dataset.withColumn("marketplace",col("marketplace")).withColumn("customer_id",col("customer_id")).withColumn("review_id",col("review_id")).withColumn("product_id",col("product_id")).withColumn("product_parent",col("product_parent")).withColumn("product_title",col("product_title")).withColumn("product_category",col("product_category")).withColumn("star_rating",col("star_rating").cast(IntegerType)).withColumn("helpful_votes",col("helpful_votes").cast(IntegerType)).withColumn("total_votes",col("total_votes").cast(IntegerType)).withColumn("vine",col("vine")).withColumn("verified_purchase",col("verified_purchase")).withColumn("review_headline",col("review_headline")).withColumn("review_body",col("review_body")).withColumn("review_date",col("review_date").cast(DateType))
dataset2: org.apache.spark.sql.DataFrame = [marketplace: string, customer_id: string ... 13 more fields]

scala> dataset2.printSchema()
root
 |-- marketplace: string (nullable = true)
 |-- customer_id: string (nullable = true)
 |-- review_id: string (nullable = true)
 |-- product_id: string (nullable = true)
 |-- product_parent: string (nullable = true)
 |-- product_title: string (nullable = true)
 |-- product_category: string (nullable = true)
 |-- star_rating: integer (nullable = true)
 |-- helpful_votes: integer (nullable = true)
 |-- total_votes: integer (nullable = true)
 |-- vine: string (nullable = true)
 |-- verified_purchase: string (nullable = true)
 |-- review_headline: string (nullable = true)
 |-- review_body: string (nullable = true)
 |-- review_date: date (nullable = true)



```

Now lets do more quality checks 

```
scala> val res: AnalyzerContext={ AnalysisRunner.onData(dataset2).addAnalyzer(Size()).addAnalyzer(ApproxCountDistinct("review_id")).addAnalyzer(Compliance("top star_rating","star_rating >= 4.0")).addAnalyzer(Correlation("total_votes","star_rating")).addAnalyzer(Correlation("total_votes", "helpful_votes")).addAnalyzer(Mean("star_rating")).run() }
scala>  val metrics=successMetricsAsDataFrame(spark,res)
metrics: org.apache.spark.sql.DataFrame = [entity: string, instance: string ... 2 more fields]

scala>  metrics.show()
+-----------+--------------------+-------------------+--------------------+
|     entity|            instance|               name|               value|
+-----------+--------------------+-------------------+--------------------+
|     Column|           review_id|ApproxCountDistinct|           2991306.0|
|Mutlicolumn|total_votes,star_...|        Correlation|-0.03434035854194713|
|    Dataset|                   *|               Size|           3093869.0|
|     Column|         star_rating|               Mean|   4.035506443243571|
|     Column|     top star_rating|         Compliance|  0.7492156261302596|
|Mutlicolumn|total_votes,helpf...|        Correlation|  0.9936803480440556|
+-----------+--------------------+-------------------+--------------------+

```