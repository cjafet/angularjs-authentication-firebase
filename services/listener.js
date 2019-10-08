firebaseapp.factory('AuthenticationListener', ['$rootScope', '$firebaseAuth', '$firebaseObject', function($rootScope, $firebaseAuth, $firebaseObject){

return {
    getUser: function(firebaseUser) {
        firebase.auth().onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {

                //console.log("AuthenticationListener: " + firebaseUser.uid);
    			firebase.database().ref('/users/' + firebaseUser.uid).once('value').then(function(snapshot) {
    			  var userfirst = snapshot.val().firstname;
    			  var userlast = snapshot.val().lastname;
                  var useremail = snapshot.val().email;
                  var timestamp = snapshot.val().date;
    			  console.log(userfirst + " " + userlast);
    			         $rootScope.$apply(function () {
                            $rootScope.user = {
                            date: new Date(timestamp).getDate() + "/" + (new Date(timestamp).getMonth()+1) + "/" + new Date(timestamp).getFullYear(), 
                            first: userfirst,
                            last: userlast,
                            email: useremail 
                            };
    		  	         });
    			  // ...
    			});

            } else {
                // No user is signed in.
                // $rootScope.$apply(function () {
                // 	$scope.message = "";
                // });
            }
        });
    } // evento
}; // return


}]); // factory