firebaseapp.factory('Authentication', 
	['$rootScope', 
	'$firebaseAuth', 
	'$firebaseObject', 
	'$location', 
	'AuthenticationListener', 
	function($rootScope, $firebaseAuth, $firebaseObject, $location, AuthenticationListener){


	return {
		login: function(user) {
			firebase.auth().signInWithEmailAndPassword(user.email, user.password)
		  	.then(function(firebaseUser){

		  	// firebase.database().ref('/users/' + firebaseUser.uid).once('value').then(function(snapshot) {
    	// 		  var verified = snapshot.val().verified;
    			  if (firebaseUser.emailVerified) {
    			  	$location.path('/success');
    			  	$rootScope.$apply(function () {
				  		$rootScope.message = "Welcome back, " + user.email + "!";
				  	});
				  	AuthenticationListener.getUser(firebaseUser);
    			  } else {
    			  	$location.path('/login');
    			  	$rootScope.$apply(function () {
				  		$rootScope.message = "Your Email address have not been verified yet.";
				  	});
    			  }
    		// });

		  	// Get user information from the firebase db using the AuthenticationListener service
		  	
		  	//console.log(firebaseUser.email);	
			//return firebaseUser;	
		  	}).catch(function(error) {
			  $rootScope.$apply(function () {
			  	$rootScope.message = error.message;
			  });
			  // ...
			}); // signIn method
		}, // login method

		reset: function(email) {
			// firebase.auth().verifyPasswordResetCode(code)
			// firebase.auth().confirmPasswordReset(code, newPassword).then(function(){
			// })
			firebase.auth().sendPasswordResetEmail(email).then(function(){
				$rootScope.$apply(function () {
			  		$rootScope.message = "Check your e-mail to reset your password.";
			  	});	
			}).catch(function(error) {
				$rootScope.$apply(function () {
			  		$rootScope.message = error.message;
			  	});	
			});
		},

		regist: function(user) {
			firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
		  	.then(function(firebaseUser){
			  	$rootScope.$apply(function () {
			  		$rootScope.message = "Hi " + user.firstname + ", thanks for registering with this e-mail, " + user.email;
			  	});	
			  	var userId = firebaseUser.uid;
			  	var first = user.firstname;
			  	var last = user.lastname;
			  	var email = user.email;
			  	console.log(userId);
			  	
				firebase.database().ref('users/' + userId).set({
				    date: firebase.database.ServerValue.TIMESTAMP,
				    userId: userId,
				    firstname: first,
				    lastname: last,
				    email: email,
				    verified: false
				  });

				firebase.auth().currentUser.sendEmailVerification().then(function() {
		        	$rootScope.$apply(function () {
			  			$rootScope.message = "Please, follow the link sent to your e-mail to complete your registration.";
			  		});	

		     	 });
				
			  	
			  	console.log(firebaseUser.email);
			  	console.log(user);	
			  	
			  	//return firebaseUser;
			  	
			  	
			  	$rootScope.$apply(function () {
			  		$location.path('/login'); 
			  	});
			  	

		  	}).catch(function(error) {

			  $rootScope.$apply(function () {
			  $rootScope.message = error.code + ": " + error.message;
			  });
			  // ...
			}); // createUser method
		}, // register method

		signout: function (user) {
			firebase.auth().signOut().then(function() {
			  $rootScope.$apply(function () {
			  	$rootScope.message =  "User " + user.email + " signed out successfully!";
			  	$rootScope.user = {};
			  });
			  console.log(firebaseUser.email);
			  return firebaseUser;
			}, function(error) {
			  $rootScope.$apply(function () {
			  	$rootScope.message =  "Something went wrong";
			  });
			});			
		} // signout method

	}; // return
}]); // factory