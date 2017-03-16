//this function to check if device ready and camera exists
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log(navigator.camera);
    //alert("we're ready!");
}

/* jQuery functions */
$(function(){
	
	//take photo when #takephoto button is clicked 
	$("#takephoto").click(function(){
			navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
			destinationType: Camera.DestinationType.FILE_URI });
	});
	
	//if camera successfully takes photo, pass the image path and replace the dummy image
	function onSuccess(imageURI){
		$("#your-image").attr("src", imageURI);
		
	}
	
	// if camera fails, display error message 
	function onFail(message){
		alert("failed because: " + message);	
		
	}
	
	$(".draggable").draggable();
	
	
});

/*
$(function(){
	
	function onSuccess(imageURI) {
	    $("#your-image").attr("src",imageURI);
	}

	function onFail(message) {
	    alert('Failed because: ' + message);
	}
	
	$("#takephoto").click(function(){
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
		destinationType: Camera.DestinationType.FILE_URI });
		
	});
	
	$(".draggable").draggable();

});

*/