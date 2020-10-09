---
layout: post
author: mohit
title: 6 Dimensions of Data Quality
date: 2020-10-09T05:20:41.565Z
thumbnail: /assets/img/posts/dataquality.jpg
category: Spark
summary: Accuracy,Completeness,Consistency,Timeliness,Validity & Uniqueness
---
We are living in a world full of Machine Learning and AI models all around. We are trying to automate most of the things. Same applies to IT sector. In order to analyse data we need some pipelines.  \
So we usually write code, test it and expect the result. If any error occurs we look into the code again, we analyse  logs and then mess up with code to know whats going wrong. Sometimes it works but is this the case everytime ? No Certainly NOT.

Today every decision that we take is heavily dependent on data used. So reliable data is very important. Thus we can say that: just testing the code is not enough. We need to check the qulaity of data also.For example:\
NULL values in data may lead to NullPointerException \
Incorrect or randomness in data may lead to misbehaviour in data\
Moreover aggregation of incorrect data may lead to wrong business decisions

Data Quality encompasses 6 dimensions :

1. **Accuracy**

   > How well does a piece of information reflect reality?

   If a customer's age is 32 but the system says its 34, then that information is inaccurate.\
   “accuracy” refers to the degree to which information accurately reflects an event or object described. 
2. **Completeness**

   > Does it fulfill your expectations of what’s comprehensive?

   \
   Lets say the Address field is of 3 lines but only one line along with pin code is mandatory . If Pin Code is able to fulfill the requirement then we can say that data is complete.\
   Data is considered “complete” when it fulfills expectations of comprehensiveness. We need to analyse requirements that which data will be able to complete it.
3. **Consistency**

   > Does information stored in one place match relevant data stored elsewhere?

   \
   Usually the information is contained in multiple places let say some information is with Sales Team some data is with CRM software. When we combine both the data the should be same for. eg. one person has name Robert Downey Junior at one place, Robert D. Junior at other and Robert Downey Jr. at another. Then, all the 3 should be matched. In softwares like Informatica it is called as Golden Copy.
4. **Timeliness**

   > Is your information available when you need it?

   Data should be available when needed. It depends on user expectation. If its needed every quarter lets say financial info then it should be ready by that time.  
5. **Validity**

   > Is information in a specific format, does it follow business rules, or is it in an unusable format?

   Data which don't conform to business rules are said to be invalid data. E.g. if not entered properly in prescribed format is almost invalid. So fprmat must adhere to business rules.
6. **Uniqueness**

   > Is this the only instance in which this information appears in the database?

   Unique means there should be only one instance of a data. There should not be any redundancy. As described above there should be a final Golden Copy for every instance .