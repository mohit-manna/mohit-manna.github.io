---
layout: post
author: Mohit
title: Some Oozie Examples
date: 2021-04-14T10:08:33.075Z
thumbnail: /assets/img/posts/oozie_282x1178.jpg
category: hadoop
summary: We have used Hortonworks Sandbox Platform to execute the examples.
  Oozie Web UI is disabled by default. We need to enable it manually. Steps to
  Enable the Oozie Web UI.Executing Few examples in Oozie.
---

# Setup
We have used Hortonworks Sandbox Platform to execute the examples.
Oozie Web UI is disabled by default. We need to enable it manually. 
Steps to Enable the Oozie Web UI.
1. Download [ext-2.2.zip](http://archive.cloudera.com/gplextras/misc/ext-2.2.zip)
2. sudo cp ext-2.2.zip /usr/hdp/current/oozie-client/libext/
2. sudo cp ext-2.2.zip /usr/hdp/current/oozie-server/libext/
3. sudo chown oozie:hadoop /usr/hdp/current/oozie-client/libext/ext-2.2.zip
3. sudo chown oozie:hadoop /usr/hdp/current/oozie-server/libext/ext-2.2.zip
4. sudo -u oozie /usr/hdp/current/oozie-server/bin/oozie-setup.sh prepare-war
5. Restart Oozie Service from Ambari UI

Step 4 may not work for you. Most of the time restarting oozie service does the work. 
For more info see [Link1](https://stackoverflow.com/questions/49276756/ext-js-library-not-installed-correctly-in-oozie) [Link2](http://bdlabs.edureka.co/static/help/topics/admin_oozie_console.html&sa=D&source=hangouts&ust=1618460678489000&usg=AFQjCNHKq-HRyr8PpeHJuf7GzLPm-uEiKQ)

Always remember that two files are used to execute any Oozie Workflow.
1. workflow.xml (This file must be there in HDFS before Execution. Its URI is there in job.properties file. Use hdfs dfs -put)
2. job.properties (It should be there in local fs.Modify this according to the ports.)

# PIG Example
Task: 

```
A = load '$INPUT' using PigStorage(':');
B = foreach A generate $0 as id;
store B into '$OUTPUT' USING PigStorage();
```
Input:
```
To be or not to be, that is the question;
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles,
And by opposing, end them. To die, to sleep;
No more; and by a sleep to say we end
The heart-ache and the thousand natural shocks
That flesh is heir to ? 'tis a consummation
Devoutly to be wish'd. To die, to sleep;
To sleep, perchance to dream. Ay, there's the rub,
For in that sleep of death what dreams may come,
When we have shuffled off this mortal coil,
Must give us pause. There's the respect
That makes calamity of so long life,
For who would bear the whips and scorns of time,
Th'oppressor's wrong, the proud man's contumely,
The pangs of despised love, the law's delay,
The insolence of office, and the spurns
That patient merit of th'unworthy takes,
When he himself might his quietus make
With a bare bodkin? who would fardels bear,
To grunt and sweat under a weary life,
But that the dread of something after death,
The undiscovered country from whose bourn
No traveller returns, puzzles the will,
And makes us rather bear those ills we have
Than fly to others that we know not of?
Thus conscience does make cowards of us all,
And thus the native hue of resolution
Is sicklied o'er with the pale cast of thought,
And enterprises of great pitch and moment
With this regard their currents turn awry,
And lose the name of action.
```
To trigger the job change job.properties file :
From:
```
nameNode=hdfs://localhost:8020
jobTracker=localhost:8021
queueName=default
examplesRoot=examples
oozie.use.system.libpath=true
oozie.wf.application.path=${nameNode}/user/${user.name}/${examplesRoot}/apps/pig
```
To:
```
nameNode=hdfs://sandbox-hdp.hortonworks.com:8020
jobTracker=sandbox-hdp.hortonworks.com:8050
queueName=default
examplesRoot=examples
oozie.use.system.libpath=true
oozie.wf.application.path=${nameNode}/user/${user.name}/${examplesRoot}/apps/pig
```
Submit the job using:
```
oozie job -config examples/apps/pig/job.properties -submit 
```
Watch the job in Workflow Manager
http://localhost:8088/cluster
http://localhost:11000/oozie/?user.name=maria_dev

Output:
check http://localhost:50070/explorer.html#/user/maria_dev/examples/output-data/pig

Explanation: 
':' is not present in the input data. So it will be copied as it is.

# Shell Example
```
jobTracker: sandbox-hdp.hortonworks.com:8050
nameNode: hdfs://sandbox-hdp.hortonworks.com:8020
```
# MapReduce Example
```
oozie job -config examples/apps/map-reduce/job.properties -submit 
oozie job  -start 0000000-210406181056876-oozie-oozi-W 
oozie job  -log 0000000-210406181056876-oozie-oozi-W   
oozie job  -info 0000000-210406181056876-oozie-oozi-W
```
# Hive Example
Go to [hive](https://github.com/mohit-manna/oozie-examples/tree/main/examples/apps/hive2)
**Don't** read README file. No need to change workflow.xml file
Use workflow.xml
Copy jdbc uri from Ambari > Hive 
Append Database Name into it.

job.properties file looks like
```
nameNode=hdfs://sandbox-hdp.hortonworks.com:8020
jobTracker=sandbox-hdp.hortonworks.com:8050
queueName=default
jdbcURL=jdbc:hive2://localhost:2181/default                              
examplesRoot=examples 
oozie.use.system.libpath=true   
oozie.wf.application.path=${nameNode}/user/${user.name}/${examplesRoot}/apps/hive2  
```

# Sqoop Example
Script files:
1. [db.hsqldb.properties](https://github.com/manna018/oozie-examples/blob/main/examples/apps/sqoop/db.hsqldb.properties)
2. [db.hsqldb.script](https://github.com/manna018/oozie-examples/blob/main/examples/apps/sqoop/db.hsqldb.script)
3. [workflow.xml](https://github.com/manna018/oozie-examples/blob/main/examples/apps/sqoop/workflow.xml)

job.properties files(changed):
```
nameNode=hdfs://sandbox-hdp.hortonworks.com:8020
jobTracker=sandbox-hdp.hortonworks.com:8050
queueName=default
examplesRoot=examples
oozie.use.system.libpath=true
oozie.wf.application.path=${nameNode}/user/${user.name}/${examplesRoot}/apps/sqoop
```

