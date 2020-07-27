---
layout: post
author: manna
title: Reverse in C
date: 2018-05-16T12:24:20.452Z
thumbnail: /assets/img/posts/reverse_c.png
category: c
summary: Basic C program for Reverse of a number and a string.
---

### Write a program to do Reverse of a Number

```
#include<stdio.h>
#include<conio.h>
void main()
{
	int a,temp,c,mv;
	clrscr();
	printf("Enter value: ");
	scanf("%d",&a);
	freopen("revnum.txt","w",stdout);
	temp=a;
	c=0;
	while(temp>0)
	{
		mv=temp%10;
		c=c*10+mv;
		temp=temp/10;

	}
	printf("\n Original: %d",a);
	printf("\n Reversed: %d",c);
	if(a=c)
	{
		printf("\n %d is palindrome",a);
	}
	fclose(stdout);
	getch();

}
```

The above program writes the output in a file when executed

> Output

```
Enter Value: 1234
 Original: 1234
 Reversed: 4321
 4321 is palindrome
```

> Limitation:
> only numbers within the range can be reversed. Program doesn’t work correctly if out of range or negative number is given as input.

### Write a program to do Reverse of a String

```
#include<stdio.h>
#include<conio.h>
#include<string.h>
void main()
{
	char str[10],temp[10];
	int i,j,f;
	clrscr();
	freopen("revstr.txt","w",stdout);
	printf("Enter an array: ");
	scanf("%s",str);
	printf("STR: %s",str);
	i=0;
	j=strlen(str);
	temp[j]='\0';
	j=j-1;
	while(i<strlen(str))
	{
		temp[j]=str[i];
		//printf("\nstr[%d]= %c",i,str[i]);
		//printf(" :: temp[%d]= %c",j,temp[j]);
		i++;
		j--;
	}
	printf("\nREV: %s",temp);
	i=0;
	j=0;
	f=0;
	while(i<strlen(str))
	{
		if(str[i]!=temp[j]){
			f=1;
			break;
		}
		i++;
		j++;

	}
	if(f==0)
	printf("\nit's  Palindrome");
	fclose(stdout);
	getch();
}
```

Again the output goes into a file

> Output

```
Enter an array: STR: mohit
REV: tihom
```

> Limitation:
> Array of fixed size is used to store input value. The limit may exceed if range exceeds.