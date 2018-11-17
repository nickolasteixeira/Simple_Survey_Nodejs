# Eaze Services Homework Assignment - Simple Survey
Create a simple anonymous survey. <br/>

Build an API in Node.js or .NET Core to allow for the anonymous creation/taking of surveys (i.e. you don't have to create a user account to create a survey).

## Specifications:
API Should Support:
* Creating a survey
* Taking a Survey
* Getting Results of a Survey
* A survey should consist of survey questions and each question should have yes/no (true/false) answers

## Instructions to run application

### Environment
* Ubuntu 16.06 - Linux
* nodejs -version v8.12.0
* npm -version 6.4.1

### Installation
[Install nodejs and npm on Ubuntu 16.04](https://websiteforstudents.com/install-the-latest-node-js-and-nmp-packages-on-ubuntu-16-04-18-04-lts/)

### Run Application
The application listens on port 1337, so if you are using a vagrant box or any other virtual machine, keep port 1337 open. Express will run on that port. </ br>

`$ git clone https://github.com/nickolasteixeira/Eaze_BackEnd_Challenge.git` </br >
`$ cd Eaze_BackEnd_Challenge` </br >
`$ npm install` </br >
`$ npm run dev` </br >

Open a new window to run operations. The data is persisting in a file called `posts.json`. It's located in the `./data/` folder at the root of the project. Anytime you run an operation in a new window, the data in `posts.json` is either read or updated.

To show all the current surveys, run: </br>
`$ ./operations/showall.js`

To show an individual survey, run: </br >
`$ ./operations/showById.js`

To create a survey, run: </br >
`$ ./operations/createsurvey.js` </br > 
or </br >
to get a command that you can manually post use the bash script -> `$ ./operations/create.sh` </br >

To take a survey, run: </br >
`$ ./operations/takesurvey.js`

## Data Persistence in Production:

If this was a simple application that needed to store information over an indefinite period of time, I would store the information in a database. You could use a SQL or muscle type database, but in my opinion, I think it would make more sense to use a muscle storage like MongoDB that stores objects which closely resemble our surveys. I've never used MongoDB before, but it doesn't seem too hard to [set up](https://www.mongodb.com/cloud/atlas) on servers.

## Bugs
* When running the `$ ./operations/create.sh` file, if you type in an apostrophe in the title name, when you post the command on the command line, it will not work.
* When running the `$ ./operations/create.sh` file, you can add more than 5 tags and questions.
