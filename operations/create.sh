#!/bin/bash

function getTitle {
	echo "-- What should the title of this survey be? --"
	read title
	echo
}

function getQuestions {
	QUESTIONS=()
	echo "-- How many questions would you like to add? --"
	read number
	for i in `seq 1 $number`;
	do
		echo "--'$i'. What question would you like to add? --"
		read question
		QUESTIONS+=("$question")
	done
}

function addTags {
	echo "-- Would you like to add tags to this survey? (y/n) --"
	read answertags
	echo "$answertags"
	if (("$answertags" == "y" )); then
		TAGS=()
		echo "- How many tags would you like to add? -"
		read ntags
		for i in `seq 1 $ntags`;
		do
			echo "--'$i'. What tag would you like to add? --"
			read tag
			TAGS+=("$tag")
		done
		
	else
		echo "No tags added"
	fi
}

function postSurvey {
	STRING="-d 'Content-Type: applicaton/json' -d {'title': '$title'}, 'survey':["
	qLen="${#QUESTIONS[@]}"
	for (( i=0; i < "${qLen}" - 1; i++));
	do
		STRING="$STRING {'question':'"${QUESTIONS[$i]}"', 'answer':''}, "
	done
	echo "${QUESTIONS[-1]}"
	STRING="$STRING {'question':'"${QUESTIONS[-1]}"', 'answer':''}] "

	tLen="${#TAGS[@]}"
	if (("${tLen}" > 0 )); then
		STRING="$STRING , 'tags': ["
		for (( j=0; j < "${tLen}" - 1; j++));
		do
			STRING="$STRING '${TAGS[$j]}', "
		done
		STRING="$STRING '"${TAGS[-1]}"']}"
	else
		STRING="$STRING }"
	fi
	curl -i -X POST "$STRING" http://localhost:1337/api/v1/posts
	echo "Survey Posted!"
}



echo "-------------------- ** --------------------"
echo "   Welcome to the anonymous survey creator  "
echo "-------------------- ** --------------------"
echo
echo "Would you like to create a survey? (y/n)"
read answer
if (( "$answer" == "y" )); then
	echo "Great! Surveys consist of a title, questions and answers."
	getTitle
	getQuestions
	addTags
	postSurvey
else
	echo "Goodbye."
fi

