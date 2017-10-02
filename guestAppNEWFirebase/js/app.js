//firebase docs:
//https://firebase.google.com/support/guides/firebase-web
//https://firebase.google.com/docs/database/admin/retrieve-data

// Initialize Firebase
var config = {
   apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
};
firebase.initializeApp(config);
// end initialize

//create firebase reference
var dbRef = firebase.database();
//console.log(dbRef);

//set reference for persons array (it's a child of the db tree)
var personsRef = dbRef.ref("persons");
console.log(personsRef);


//load existing data as well as any newly added ones
//triggered once for each existing child and then again every time a new child is added
personsRef.on("child_added", function(childdata){
	var child = childdata.val();
	console.log(child, child.name);
	
	//append each child data one after the other
	$('#content').append(loadEachPerson(child));
	
});

//prepare each person's content to be added to page
function loadEachPerson(person){
		var content = '';
		content += 	'<li>';
		
		//load profile image, if exists		
		if( person.image ){
			content += '<img src="' + person.image + '"/>';
		}
		else {
			//else, dummy image
			content += '<img src="img/profile.png" />';
		}
		
		content += person.title + '. ';
    content += person.name + ' | ';
    content += 'guests: ' + person.guests;
		content += '</li>';
	
		return content;
}

$(function(){
	//add new person to db
	$('.add-person').on("click", function(event) {  
	    //prevents submit button from sending form
	    event.preventDefault();
	    
	    //check if input field for name is empty
	    if( $('#name').val() != ''){
	      
	      //pushes input field values to db, using key/value
	      personsRef.push({
	          title: $('#title').val(),
	          name: $('#name').val(),
	          guests: $('#guests').val(),
	        });
	        
	        //clears form
	        addForm.reset();
	    } else {
	      alert('Please fill in name!');
	    } 
	       
	  });
});