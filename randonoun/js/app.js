
//create firebase reference
var dbRef = new Firebase("https://nounrandomizer.firebaseio.com/");

//set reference for nouns array (it's a child of the db tree)
var nounsRef = dbRef.child('nouns');


var randNum;

// I used the "value" event here instead of child_added since content is static
// Doc: https://firebase.google.com/docs/database/admin/retrieve-data#value
nounsRef.on("value", function(childdata){
	//I could use .numChildren() to figure out how many noun objects I have in my entire DB
	// Doc: https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot#numChildren
	randNum = Math.floor(Math.random() * childdata.numChildren());
	console.log( "total noun objs: " + childdata.numChildren(), "// randNum: " + randNum);
	
	//generate randNoun object
	var randNoun = childdata.child(randNum).val();
	console.log(randNoun);	
	
	//convert randNoun object into an array using the each() function we used before in our json class
	var nouns = [];
	$.each(randNoun, function(key,value) {
	    //pushing the values into the array
	    nouns.push(value);
	});
	
	//choose random noun from the nouns list
	//in our case, it's either singular/plural, but you can add more because we use .length
	var r = Math.floor(Math.random() * nouns.length); 
	var noun = nouns[r];
	
	console.log( 'random noun array: ' + nouns , '// random noun chosen from array: ' + noun);
	
	//append our noun to page
	$('#content').append( noun );
});




