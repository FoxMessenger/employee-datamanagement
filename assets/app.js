	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyC6C0ubjZdzd6lEeLF-d3gmfgTlqa5utFs",
		authDomain: "emp-data.firebaseapp.com",
		databaseURL: "https://emp-data.firebaseio.com",
		storageBucket: "emp-data.appspot.com",	
		messagingSenderId: "628557508494"
	};

	firebase.initializeApp(config);

	var database = firebase.database();

	// Initial Values
	var name = "";
	var role = "";
	var startDate = 0;
	var monthlyRate = 0;

    // Capture Button Click
    $(".submit").on("click", function(event) {
    	event.preventDefault();

      // Grabbed values from text boxes
      name = $("#name").val().trim();
      role = $("#role").val().trim();
      startDate = $("#startDate").val().trim();
      monthlyRate = $("#monthlyRate").val().trim();

      // Code for handling the push
      database.ref().push({
      	name: name,
      	role: role,
      	startDate: startDate,
      	monthlyRate: monthlyRate
      });

 	});

    


    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(snapshot) {


      	// storing the snapshot.val() in a variable for convenience
      	if (snapshot.val()) {
      		var sValue = snapshot.val();
      		console.log(sValue);
	      // Getting an array of each key In the snapshot object
	      // var svArr = Object.keys(sValue);

	      // // Finding the last user's key
	      // var lastIndex = svArr.length - 1;

	      // var lastKey = svArr[lastIndex];

	      // Using the last user's key to access the last added user object
	      // var lastObj = sValue[lastKey];

	      // Console.loging the last user's data
	      console.log(sValue.name);
	      console.log(sValue.role);
	      console.log(sValue.startDate);
	      console.log(sValue.monthlyRate);

	      // Change the HTML to reflect
	      $("#name-display").append("<br>" + sValue.name);
	      $("#role-display").append("<br>" + sValue.role);
	      $("#startDate-display").append("<br>" + sValue.startDate);
	      $("#monthlyRate-display").append("<br>" + sValue.monthlyRate);

	          // Getting the Date Difference
	          var d = new Date();

	          var month = d.getMonth()+1;
	          var day = d.getDate();

	          var output = d.getFullYear() + '-' +
	          ((''+month).length<2 ? '0' : '') + month + '-' +
	          ((''+day).length<2 ? '0' : '') + day;

    // Difference of Date Math
    var startDate = sValue.startDate;
    var currentDate = output;
    console.log(currentDate);
    var diff =  Math.floor(( Date.parse(output) - Date.parse(sValue.startDate) ) / (86400000 * 30));
    

    $('#monthsWorked-display').append('<br>' +diff);

    var totalPay = (sValue.monthlyRate * diff);
    $('#totalBilled-display').append('<br> $' + totalPay);
}
      // Handle the errors
  }, function(errorObject) {
  	console.log("Errors handled: " + errorObject.code);
  });



    // but perhaps this is safer:

    // var diff =  Math.floor(
    // 	(
    // 		Date.parse(
    // 			end_date.replace(/-/g,'\/')
    // 			) - Date.parse(
    // 			start_date.replace(/-/g,'\/')
    // 			)               
    // 			) / 86400000);
    // alert(diff)