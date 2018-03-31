'use strict';

fetch('https://nameless-falls-24533.herokuapp.com/api/passwords/', {
	credentials: 'include',
}).then(function(response) {
	return response.json();
}).then(function(myJson) {
	console.log(myJson);
	var parent = document.getElementById("parent"); //parent div already in the extension
	for (var i = 0; i < myJson.length; i++) { //does all this for each website in the MySQL
	    var show = document.createElement("div"); //makes a div
	    var content = document.createTextNode(myJson[i].website); //adds the text of the website name
	    show.appendChild(content); //adds the content to the div
	    show.classList.add("site"); //adds a class called websites for the on click
	    show.dataset.password = myJson[i].password; //adds data attribute titled password with the value of the password
	    parent.appendChild(show); //appends created div into parent div in the extension
	}
}).then(function(res){
	var site = document.getElementsByClassName("site");
	for (var i = 0; i < site.length; i++) {
		site[i].addEventListener('click', function show(e) {
			e.currentTarget.style.color = "green";
			var pass = e.currentTarget.getAttribute("data-password");
			console.log(e.currentTarget);
			e.currentTarget.innerHTML = pass;

		})
	}

}).catch(function(err) {
	console.log('Fetch Error :-S', err);
});