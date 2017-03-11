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
    database.ref().on("value", function(snapshot) {

    debugger;
      	// storing the snapshot.val() in a variable for convenience
      	if (snapshot.val()) {
	      var sValue = snapshot.val();
	      
	      // Getting an array of each key In the snapshot object
	      var svArr = Object.keys(sValue);

	      // Finding the last user's key
	      var lastIndex = svArr.length - 1;

	      var lastKey = svArr[lastIndex];

	      // Using the last user's key to access the last added user object
	      var lastObj = sValue[lastKey]

	      // Console.loging the last user's data
	      console.log(lastObj.name);
	      console.log(lastObj.role);
	      console.log(lastObj.startDate);
	      console.log(lastObj.monthlyRate);

	      // Change the HTML to reflect
	      $("#name-display").append("<br>" + lastObj.name);
	      $("#role-display").append("<br>" + lastObj.role);
	      $("#startDate-display").append("<br>" + lastObj.startDate);
	      $("#monthlyRate-display").append("<br>" + lastObj.monthlyRate);
		}
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });