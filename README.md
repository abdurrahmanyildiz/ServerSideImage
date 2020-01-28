# ServerSideImage

This is a Node.js API project for creating server side html or text images. We need this service during a private project to send some assets on email attachments.

Project developed with express and implements two important npm libraries to create images. 
Obviously this service is working thanks to "highcharts-export-server" and "text2png". This is only an example of how you can implement these libraries.

If you need to dockerize project do not forget to set environment variable for highchart license as following:
ENV ACCEPT_HIGHCHARTS_LICENSE="YES"

# How to test service?
Clone or download project to your local and provide dependencies. 
Project dependencies as following:

```
  "dependencies": {
    "express": "^4.17.1",
    "highcharts-export-server": "^2.0.24",
    "text2png": "^2.3.0",
    "tsc-watch": "^4.1.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.2",
    "nodemon": "^2.0.2",
    "ts-node": "^8.6.2",
    "typescript": "^3.7.5"
  }
```
(For VSCode) Then run project with

```
npm install
```
and
```
npm run dev
```

After project build and ready you will see "Server is running on 3000" log at console.

Then call APIs as following (I used Postman application to call APIs):

## Double Line Chart
For line chart with double line; you need to send below object in a "POST" request body to "/doublelinechart" 
![DoubleLineRequestBody](https://github.com/abdurrahmanyildiz/ServerSideImage/blob/master/images/doublePost.PNG)

Created image must be as:

![DoubleLineImage](https://github.com/abdurrahmanyildiz/ServerSideImage/blob/master/images/doubleLineImage.png)

## Single Line Chart
For line chart with single line; you need to send below object in a "POST" request body to "/singlelinechart"
![SingleLineRequestBody](https://github.com/abdurrahmanyildiz/ServerSideImage/blob/master/images/singlePost.PNG)

Created image must be as:

![SingleLineImage](https://github.com/abdurrahmanyildiz/ServerSideImage/blob/master/images/singleLineImage.png)

## Pie Chart
-For pie chart; you need to send below object in a "POST" request body to "/piechart"
![PieRequestBody](https://github.com/abdurrahmanyildiz/ServerSideImage/blob/master/images/piePost.PNG)

Created image must be as:

![PieImage](https://github.com/abdurrahmanyildiz/ServerSideImage/blob/master/images/pieImage.png)

## Text Image
-For the textimage; you need to send below object in a "POST" request body to "/textimage"
![TextImageRequestBody](https://github.com/abdurrahmanyildiz/ServerSideImage/blob/master/images/textPost.PNG)

Created image must be as:
![TextImage](https://github.com/abdurrahmanyildiz/ServerSideImage/blob/master/images/textImage.png)

