---
layout: post
author: manna
title: Kite Pattern Printing
date: 2017-10-15T11:52:08.004Z
thumbnail: /assets/img/posts/c-pattern.png
category: c
summary: The pattern is printed using two parts. In first part the upper half of
  the pattern is printed and in second half the lower half is printed. Both the
  halves are independent of each other. Even if the upper half is changed lower
  half remains correct.
---
### Print a Kite Pattern Using Two Loops

```
#include<stdio.h>
#include<conio.h>
//03 August 17 by Mohit
void main()
{
	int i,j,k,l,t,s;
	l=0;
	t=l;
	k=0;
	clrscr();
	freopen("pyra2lp.txt","w",stdout);
	printf("\n Enter the length: ");
	scanf("%d",&l);
	for(j=l;j>=1;j--)
	{
		printf("\t");
		for(i=j;i>1;i--)
		{
			printf(" ");
			//print " " in decrement format
		}
		k=k+2;
		for(s=1;s<k;s++)
		{
			printf("*");
			//printing * in odd count
		}printf("\n");

	}
	for(j=1;j<=l;j++)
	{
		printf("\t");
		for(i=1;i<=j;i++)
		{
			printf(" ");
			//printing " " in increment
		}
		k=k-2;
		for(s=1;s<k;s++)
		{
			printf("*");
			//printing * in decreasing odd
		}
		printf("\n");

	}
	fclose(stdout);
	getch();


}
```

> Output goes into a file
>
> Output looks like

```
Enter the length: 5

	    *
	   ***
	  *****
	 *******
	*********
	 *******
	  *****
	   ***
	    *
```

