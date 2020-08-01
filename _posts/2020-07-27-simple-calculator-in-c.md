---
layout: post
author: manna
title: Simple Calculator in C
date: 2018-05-17T13:00:21.363Z
thumbnail: /assets/img/posts/calculator_c.png
category: c
summary: "Simple calculator in C with console based Menu. "
---
### A simple program to create a Simple Calculator
```
#include<stdio.h>
#include<conio.h>
int add(int a,int b);
int substract(int b,int a);
int multiply(int a,int b);
int divide(int b,int a);
void doWork(char o);
void menu();
void option();
int input(int s);
void main()
{
	clrscr();
	freopen("simpcalc.txt","w",stdout);
	menu();
	option();
}
void menu()
{
	printf("\n Press 1 to add");
	printf("\n Press 2 to Substract");
	printf("\n Press 3 to Multiply");
	printf("\n Press 4 to Divide");
	printf("\n Press 5 to Menu");
	printf("\n Press 6 to Exit");

}
void option(){
	char o;
	printf("\n Press any valid Key:: ");
	o=getche();
	doWork(o);

}
int input(int s)
{
	int a;
	printf("\n Enter Number %d: ",s);
	scanf("%d",&a);
	return a;
}
void doWork(char o)
{
	int r;
	r=0;
	switch(o)
	{
		case '1':
			r=add(input(2),input(1));
			printf("Result:: %d",r);
			break;
		case '2':
			r=substract(input(1),input(2));
			printf("Result:: %d",r);
			break;
		case '3':
			r=multiply(input(2),input(1));
			printf("Result:: %d",r);
			break;
		case '4':
			r=divide(input(1),input(2));
			printf("Result:: %d",r);
			break;
		case '5':
			menu();
			break;
		case '6':
			fclose(stdout);
			exit(0);
			break;
		default:
			option();
			break;
	}
	option();
}
int add(int a,int b)
{
	return a+b;
}
int substract(int b,int a)
{
	return b-a;
}
int multiply(int a,int b)
{
	return a*b;
}
int divide(int b,int a)
{
	return b/a;
}
````
Output:
```
 Press 1 to add
 Press 2 to Substract
 Press 3 to Multiply
 Press 4 to Divide
 Press 5 to Menu
 Press 6 to Exit
 Press any valid Key:: 1
 Enter Number 1: 12
 Enter Number 2: 12
 Result:: 24
 Press any valid Key:: 2
 Enter Number 2: 14
 Enter Number 1: 12
 Result:: 2
 Press any valid Key:: 3
 Enter Number 1: 870
 Enter Number 2: 2
 Result:: 1740
 Press any valid Key:: 4
 Enter Number 2: 16
 Enter Number 1: 14
 Result:: 1
 Press any valid Key:: 6
```
Limitation: The above program uses integer values only. No float or long values are used which will give erroneous results if the calculation goes to non-integral value.
