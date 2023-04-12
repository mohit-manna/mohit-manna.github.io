---
layout: post
author: Mohit Manna
title: How I reused my old smartphone to host a website
date: 2023-04-01T10:18:57.916Z
thumbnail: https://i.imgur.com/k4AbM1V.jpeg
category: python
summary: We all have old smartphones in our homes. There are many ways to reuse
  them but this is one of the most interesting use I have discovered
---
# Why did I do this ?

I have a personal website written in Flask and JavaScript which I wrote back in winter of 2020 when I was trying my hands on Flask, Mongo DB and JavaScript.
I wrote the website in order to learn Flask and Mongo. It is not quite polished one but I do have a regular user who uses it daily. My only motivations to keep it running. 
I have been hosting it in AWS EC2 Free Tier accounts since 2020 but was fed up of ignoring AWS Bill mails and redeploying everything in new account whenever account got seized by AWS.
As I write this blog AWS is asking for Rs 800/mnth for AWS Micro instance. As far as I can remember I've been paying Rs 140/mnth for same thing in 2021. So I can not rely much on AWS.
Also, the website that I wrote is not completely deployed in AWS! The Database is in MonogDB Cloud (Another Free Service). So even if my website goes down the data is safe, only the webserver stops. 
Once the webserver starts it automatically connects to MongoDB cloud and everything is as it is. 

##### What about pricing of MongoDB?

MongoDB cloud is free and since I am using storing only textual data. It is quite small. It would be max 5 MB. So it is not going to need paid subscription in near future.

#﻿### What about free hosting solutions?
T﻿here are many free hosting solutions on internet which will pop up there when you google. Some of them are: 
1﻿. [Vercel](https://www.qovery.com/)
2﻿. [qovery](https://www.qovery.com/)
3﻿. [PythonAnywhere](https://www.pythonanywhere.com/)
4﻿. [Heroku](https://www.heroku.com/)
5﻿. [Zeet](https://zeet.co/)

a﻿nd many more which I tried before trying this. Some Youtube videos show hsoting in few clicks but when I tried the same steps I landed in Payment page or another AWS account creation page. So using altogether I new service in the place of git actions wasn't worth it for me. 

I﻿ have used PythonAnywhere
#﻿# Things we need 
1﻿. A flask website. Write your own or pick a dummy one.  This flask website I created using virtualenv and installed gunicorn in it. Gunicorn doesn't work in Windows but we just need it while hosting. Rest of the time we can normally run flask app.
2﻿. An old android phone. I have used Redmi 5 which runs on MIUI 11 which is based on Android Oreo. 
3﻿. A stable Wifi connection

#﻿ Steps to host Flask Website in Android Phone:
1﻿. [Userland](https://play.google.com/store/apps/details?id=tech.ula&hl=en&gl=US&pli=1) install this app in the android phone and choose ubuntu.
2﻿. Open the app and set password for root user.
3﻿. Lock the app in background so it can't be killed by mistake. 
3﻿. Now to run next steps you can either ssh into this Android Device from your PC or you can use the app directly. Doing ssh will be easy. I recommend it but the ssh service in Userland is not very stable for unknown reasons. Sometimes it stop responding in the port. 
T﻿he ssh service runs on port 2022.
f﻿irst in android device run command 

`﻿``
$﻿hostname -I
`﻿``

I﻿t will give a local ip address e.g. 

`﻿``
1﻿92.168.1.2
`﻿``
T﻿his will keep changing normally according to your router configuration. 

T﻿o ssh run in your PC:

`﻿``
$﻿ssh root@192.168.1.2 -p 2022
`﻿``

T﻿his will ask for password that we kept while setting UserLand App.

I﻿f the ssh is not working properly check service and if not working start it. 

4﻿. Now we will have to put our flask code in git. Configure Userland's ssh keys in your git hub account and clone it inside Userland at root user's home folder

`﻿``
$﻿git clone <repo link>
`﻿``
5﻿. Now Install Tmux inside it
6﻿. Now you will need one out of these two apps:
 ﻿       6.a. ngrok : benefits of using ngrok is that it is more stable and I feel better latency. It has paid plans and many exciting features. The only con is domain name keep changing everytime you run it. 
e﻿.g. ` xxyxzgdshf.yourdomain.ngrok.io ` 
S﻿o everytime you restart the service you will have to inform your users about new url.
 ﻿      6.b. [serveo](http://serveo.net/) It is free simple to use. Just one feature and the domain name doesn't change.
e﻿.g. `abc.serveo.net`

7﻿. Now create a virtualenv venv in home location of root user.
8﻿. Use command like below to start both your flask webserver and tunnel.

`﻿``
#!/bin/bash

#wget https://storage.googleapis.com/serveo/download/2018-05-08/serveo-linux-amd64
#crontab -e
#@reboot sleep 60;/root/start-server.sh

# start a new tmux session named 'my_session'
tmux new-session -d -s flask_session

# create window 1 and run flask web app in it
tmux send-keys -t flask_session:0.0 'cd ~;. venv/bin/activate;cd PMS;git pull;pip install -r requirements.txt;gunicorn --bind 0.0.0.0:5000 run:gunicorn_app -e FLASK_ENV=prod -e FLASK_APP=run.py --timeout 90 -w 4' C-m

# create window 2 and run command in it
tmux new-window -t flask_session:1 -n 'window 2'

#open ngrok in it
tmux send-keys -t flask_session:1.0 'cd ~;ssh -R <y﻿ourSiteName>:80:0.0.0.0:5000 serveo.net' C-m

# attach to the tmux sess
tmux detach -s flask_session
`﻿``

9﻿. We can run these commands independently to test. 
1﻿0. Tmux is easy to use. We can check its documents for commands and shortcuts.

N﻿ow, I need to figure out a way in UserLand so that whenever the phone restarts it should trigger on its own. One possible way is adding it into crontab.
