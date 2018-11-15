#!/bin/bash

function getTitle {
	echo "-- What should the title of this survey be? --"
	read title
	echo
}

function getQuestions {
	QUESTIONS=()
	echo "-- How many questions would you like to add? (5 questions max please)--"
	read number
	if [ "$number" -lt 1 ]; then
		 echo "Must be a positive number of questions"; exit 1;
	fi
	for i in `seq 1 $number`;
	do
		echo
		echo ""$i". What question would you like to add? (Yes/No questions and a 10 character minimum please)"
		read question
		QUESTIONS+=("$question")
	done
}

function addTags {
	echo
	TAGS=()
	echo "-- How many tags would you like to add? (5 tags max please)--"
	read ntags
	for i in `seq 1 $ntags`;
	do
		echo
		echo "$i. What tag would you like to add?"
		read tag
		TAGS+=("$tag")
	done
}

function postSurvey {
	STRING="-H \"Content-Type: application/json\" -d '{\"title\": \""$title"\", \"survey\":["
	qLen="${#QUESTIONS[@]}"
	for (( i=0; i < "${qLen}" - 1; i++));
	do
		STRING="$STRING {\"question\":"\"${QUESTIONS[$i]}"\", \"answer\":\"\"}, "
	done
	STRING="$STRING {\"question\":\""${QUESTIONS[-1]}\"",\"answer\":\"\"}]"

	tLen="${#TAGS[@]}"
	STRING="$STRING , \"tags\": ["
	for (( j=0; j < "${tLen}" - 1; j++));
	do
		STRING="$STRING \""${TAGS[$j]}"\", "
	done
	if [ "$tLen" -eq 0 ];then
		STRING="$STRING \"\"]}'"
	else
		STRING="$STRING \""${TAGS[-1]}"\"]}'"
	fi
	echo
	echo " ------------------------- ** ---------------------------------"
	echo "Copy and past code below into your terminal to create the survey"
	echo
	echo
	echo curl -i -X POST "$STRING" http://localhost:1337/api/v1/posts
	echo " ------------------------- ** ---------------------------------"
	echo
}



echo "-------------------- ** --------------------"
echo "   Welcome to the anonymous survey creator  "
echo "-------------------- ** --------------------"
echo
echo "Would you like to create a survey? (y/n)"
read answer
if [ "$answer" = "Y" ] || [ "$answer" = "y" ]; then
	echo
	echo "---------------------------- ** ----------------------------"
	echo "  Great! Surveys consist of a title, questions and answers. "
	echo "---------------------------- ** ----------------------------"
	getTitle
	getQuestions
	addTags
	postSurvey
elif [ "$answer" = "N" ] || [ "$answer" = "n" ]; then
	echo "Goodbye."
else
	echo "Goodbye."
fi
