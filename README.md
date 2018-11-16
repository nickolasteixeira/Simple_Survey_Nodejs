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
The application listens on port 1337, so if you are using a vagrant box or any other virtual machine, keep port 1337 open. Express will run on that port.

`$ git clone https://github.com/nickolasteixeira/Eaze_BackEnd_Challenge.git`
`$ cd Eaze_BackEnd_Challenge`
`$ npm install`
`$ npm run dev`

Open a new window to run operations. The data is persisting in a file called `posts.json`. It's located in the `./data/` folder at the root of the project. Anytime you run an operation in a new window, the data in `posts.json` is either read or updated.

To show all the current surveys, run:
`$ ./operations/showall.js`

To show an individual survey, run:
`$ ./operations/showById.js`

To create a survey, run:
`$ ./operations/createsurvey.js` or to get a command that you can manually post use the bash script -> `$ ./operations/create.sh`

To take a survey, run:
`$ ./operations/takesurvey.js`

## Data Persistence in Production:

* But think about how you would want to do it in production and write up (one paragraph) how you would do it. 

TBD

## Final Thoughts
TBD
