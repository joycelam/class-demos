
//create firebase reference
var dbRef = new Firebase("https://yourfirebaseurl");

//set reference for persons array (it's a child of the db tree)
var personsRef = dbRef.child('persons');


//load existing data as well as any newly added ones
//triggered once for each existing child and then again every time a new child is added
personsRef.on("child_added", function(childdata) {
  //append each child data one after the other
  $('#content').append(loadEachPerson(childdata.val()));
});


//ADD person to database
$(function(){
	
	//when you click the submit button 
	$('.add-person').on("click", function(event){
			
			//prevent the submit button from sending 
			event.preventDefault();

			//check if input field for name is empty
			if( $('#name').val() != ''){
				
				var imageURL;
				//if there is no image URL, assign a default
				if( $('#image').val() == '' ){
					imageURL = 'img/profile.png';
				} else{
					imageURL = $('#image').val();
				}
				
				//pushes input field values to db, using key/value 
				personsRef.push({
					//key: value
					title: $('#title').val(),
					name: $('#name').val(),
					guests: $('#guests').val(),
					image: imageURL
				});
				
				//reset the form
				$('#add-form').reset();
				
			}else{
				 alert("fill in your name!");
			}		
	});
		
});



//prepare each person's content to be added to page
function loadEachPerson(person){
  	
  	//console.log( person );
  	
  	var content = '';
  	  
  	  content += '<li>';
			content += '<img src="' + person.image + '" ' + 'alt="' + person.name + '" />'
      content += person.title + '. ';
      content += person.name + ' | ';
      content += 'guests: ' + person.guests;
			content += '</li>';
  
		return content;
}


