angular.module("ionicOAuthService.firebase", ['ionicOAuthService.config', 'firebase'])

.service('FirebaseService', ['$firebaseAuth', 'FIREBASE_URL', function($firebaseAuth, FIREBASE_URL) {

	var firebaseAuth = $firebaseAuth;
	var self = this;

	this.getFirebase = function() {
		return new Firebase(FIREBASE_URL);
	};

	this.getAuth = function() {
		var fb = self.getFirebase();
		return firebaseAuth(fb);
	};

	this.generateToken = function(fbSecret, socialToken) {
		var tokenGenerator = new FirebaseTokenGenerator(fbSecret);
		return tokenGenerator.createToken({
			uid: socialToken
		});
	};
}]);