---
layout: post
author: manna
title: Chef and String
date: 2020-08-03T04:07:42.267Z
thumbnail: /assets/img/posts/chefstr1.png
category: python
summary: Chef wants you to write a program that will tell him the total number
  of strings he has to skip while playing his favourite song.
---
### Problem Statement

Having already mastered cooking, Chef has now decided to learn how to play the guitar. Often while trying to play a song, Chef has to skip several strings to reach the string he has to pluck. Eg. he may have to pluck the 1st string and then the 6th string. This is easy in guitars with only 6 strings; However, Chef is playing a guitar with 106 strings. In order to simplify his task, Chef wants you to write a program that will tell him the total number of strings he has to skip while playing his favourite song.

> Input
>
> 2 *t-No of Test Cases*
> 6 *First Test Case: N- No of times chef has to pluck string*
> 1 6 11 6 10 11 *sequence of strings plucked*
> 4 *Second Test Case: N- No of times chef has to pluck string*
> 1 3 5 7 *sequence of strings plucked*
>
> Output: 15
>
> Test Case 1
> *Chef skips 4 strings (2,3,4,5) to move from 1 to 6
> Chef skips 4 strings (7,8,9,10) to move from 6 to 11
> Chef skips 4 strings (10,9,8,7) to move from 11 to 6
> Chef skips 3 strings (7,8,9) to move from 6 to 10
> Chef skips 0 strings to move from 10 to 11
> Therefore, the answer is 4+4+4+3+0*=**15**

[Chef and Strings](https://www.codechef.com/problems/CHEFSTR1)

### Solution

```
def sum(arr):
    sum=0
    for i,item in enumerate(arr):
        if i < len(arr)-1:
            #to find abs difference
            t=abs(abs(arr[i]-arr[i+1])-1) 
            #print(" "+str(t))
            sum=sum+t
    return sum
#basic input block
t=int(input())
#inp = list(map(int,input().split())) 
for i in range(t):
    n=int(input())
    arr=list(map(int,input().split()))
    print(sum(arr))
```