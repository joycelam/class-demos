
//create firebase reference
var dbRef = new Firebase("https://nounrandomizer.firebaseio.com/");

//set reference for nouns array (it's a child of the db tree)
var nounsRef = dbRef.child('nouns');

var randNum;
var haiku = '';


//main function to generate noun/word from db
function getNoun(branchRef){
	
	var nouns = [];
	
	//used .once() here since no new data is going to be updated
	branchRef.once("value", function(childdata){				
				
		randNum = Math.floor(Math.random() * childdata.numChildren());
		console.log( "total noun objs: " + childdata.numChildren(), "// randNum: " + randNum);
		
		//generate randNoun object
		var randNoun = childdata.child(randNum).val();
		console.log(randNoun);	
		
		//convert randNoun object into an array using the each() function we used before in our json class				
		$.each(randNoun, function(key,value) {
		    //pushing the values into the array
		    nouns.push(value);
		});
		
		choseNoun = chooseNoun(nouns);
		console.log('choseNoun:' + choseNoun);
		
		addtoHaiku(choseNoun);
		printHaiku();
	});
}

//choose random noun from the nouns list
//separated this out to it's own function
function chooseNoun(nounsArray){
	//in our case, it's either singular/plural, but you can add more because we use .length
	var r = Math.floor(Math.random() * nounsArray.length); 
	noun = nounsArray[r];
	
	console.log( 'random noun array: ' + nounsArray , '// random noun chosen from array: ' + noun);
	return noun;
}

//add randomized word to the haiku string
function addtoHaiku(word){
	haiku += word + ' ';
}

//print haiku on page
function printHaiku(){
	$('#content').html( haiku );
}

//construct haiku 
function makeHaiku(){
	getNoun(nounsRef);
	getNoun(nounsRef);
	getNoun(nounsRef);
}

makeHaiku();