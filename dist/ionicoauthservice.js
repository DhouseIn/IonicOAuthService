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
angular.module("ionicOAuthService.ionicOAuth", ['ngCordovaOauth', 'ionicOAuthService.config', 'ionicOAuthService.firebase'])

.service('OAuthService', ['$cordovaOauth', 'FirebaseService', 'SOCIAL', function ($cordovaOauth, FirebaseService, SOCIAL) {

	var cordovaOauth = $cordovaOauth;
	var firebaseService = FirebaseService;

	this.login = function(provider, successCallback, errorCallback) {
		var auth = firebaseService.getAuth();

		switch(provider) {
			case SOCIAL.LINKEDIN.PROVIDER:
				cordovaOauth.linkedin(SOCIAL.LINKEDIN.ID, SOCIAL.LINKEDIN.SECRET, SOCIAL.LINKEDIN.SCOPE, SOCIAL.LINKEDIN.STATE).then(function(result) {
					var fbToken = firebaseService.generateToken(SOCIAL.LINKEDIN.FB_SECRET, result.access_token);
					auth.$authWithCustomToken(fbToken).then(function(authData) {
						successCallback(provider, authData);
					}, function(error) {
						errorCallback(provider, error);
					});
				}, function(error) {
					errorCallback(provider, error);
				});
				break;
			
			case SOCIAL.FACEBOOK.PROVIDER:
				cordovaOauth.facebook(SOCIAL.FACEBOOK.ID, SOCIAL.FACEBOOK.SCOPE).then(function(result) {
					auth.$authWithOAuthToken(provider, result.access_token).then(function(authData) {
						successCallback(provider, authData);
					}, function(error) {
						errorCallback(provider, error);
					});
				}, function(error) {
					errorCallback(provider, error);
				});
				break;
			
			case SOCIAL.GOOGLE.PROVIDER:
				cordovaOauth.google(SOCIAL.GOOGLE.ID, SOCIAL.GOOGLE.SCOPE).then(function(result) {
					auth.$authWithOAuthToken(provider, result.access_token).then(function(authData) {
						successCallback(provider, authData);
					}, function(error) {
						errorCallback(provider, error);
					});
				}, function(error) {
					errorCallback(provider, error);
				});
				break;

			case SOCIAL.TWITTER.PROVIDER:
				cordovaOauth.twitter(SOCIAL.TWITTER.KEY, SOCIAL.TWITTER.SECRET).then(function(fbToken) {
					auth.$authWithOAuthToken(provider, fbToken).then(function(authData) {
						successCallback(provider, authData);
					}, function(error) {
						errorCallback(provider, error);
					});
				}, function(error) {
					errorCallback(provider, error);
				});
				break;

			default:
				errorCallback(provider, SOCIAL.INVALID_PROVIDER);
				break;
		}
	};

	this.getCurrentUser = function() {
		var auth = firebaseService.getAuth();
		return auth.$getAuth();
	};
}]);
/*
 * Ionic Oauth Service
 *
 * Created by Marcel Silva
 * http://dhouse.in
 *
 *
 * DESCRIPTION:
 *
 * Use Ionic Oauth Service to login in social.
 *
 *
 * REQUIRES:
 *
 *    Apache Cordova 3.5+
 *    Apache InAppBrowser Plugin
 *    Apache Cordova Whitelist Plugin
 *    jsSHA 1.6.0
 *
 *
 * SUPPORTS:
 *
 *    Google
 *    Facebook
 *    LinkedIn
 *    Twitter
 */

angular.module("ionicOAuthService", [
    "ionicOAuthService.config",
    "ionicOAuthService.ionicOAuth",
    "ionicOAuthService.firebase"
]);