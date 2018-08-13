
	var config = {
    apiKey: "AIzaSyAnT4-91ahOt-mB-OkHINqW7C_NSrxRlr0",
    authDomain: "traintime-36b8a.firebaseapp.com",
    databaseURL: "https://traintime-36b8a.firebaseio.com",
    projectId: "traintime-36b8a",
    storageBucket: "",
    messagingSenderId: "199717001621"
  };
  firebase.initializeApp(config);

	var database = firebase.database();   

	$(".time").html(moment().toString()); 

	$("#addTrain").on("click", function(){

		
		train = $('#nameinput').val().trim(); 
		dest= $('#destinput').val().trim(); 
		firstT = $('#firstTinput').val().trim(); 
		freq = $('#freqinput').val().trim(); 

		console.log(train);
		console.log(dest);
		console.log(firstT);
		console.log(freq);

		alert(train + " added to the fleet!");
		
		database.ref().push({   
			train: train,
			dest: dest,
			firstT: firstT,
			freq:freq
		});

		$("#nameinput").val("");  
		$("#destinput").val("");
		$("#firstTinput").val("");
		$("#freqinput").val("");

		return false;
	});

	var uhoh= database.ref().on("child_added", function(childSnapshot) {

		console.log(childSnapshot.val());

		var train = childSnapshot.val().train;
		var dest = childSnapshot.val().dest;
		var firstT= childSnapshot.val().firstT;
		var freq = childSnapshot.val().freq;


		var firstTConverted = moment(firstT, "hh:mm").subtract(1, "years");
			console.log(firstTConverted); 
		var currentTime = moment();
			console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
		var diffTime = moment().diff(moment(firstTConverted, "hh:mm"), "minutes");
			console.log("DIFFERENCE IN TIME: " + diffTime);
		var tRemainder = diffTime % freq;
			console.log(tRemainder);
		var minAway = freq - tRemainder;
			console.log("MINUTES TILL TRAIN: " + minAway);
		var next = moment().add(minAway, "minutes").format("hh:mm")
			console.log("ARRIVAL TIME: " + moment(next).format("hh:mm"))


		console.log(train);
		console.log(dest);
		console.log(firstT);
		console.log(freq);
		console.log(minAway);
		console.log(next);
		

$("#trainTable > tbody").append("<tr><td>"+ train + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + next + "</td><td>" + minAway + "</td></tr>");

},	function (errorObject){
		console.log("The read failed" + errorObject.code);
		setInterval (uhoh, 60000);
	
});


	


