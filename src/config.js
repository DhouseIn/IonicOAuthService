angular.module('ionicOAuthService.config', [])

.constant('FIREBASE_URL', 'https://<your_firebase_domain>.firebaseio.com')

.constant('SOCIAL', {
	INVALID_PROVIDER: 'INVALID_PROVIDER',
	LINKEDIN: {
		PROVIDER: 'linkedin',
		ID: '<LINKEDIN_ID>',
		SECRET: '<LINKEDIN_SECRET>',
		FB_SECRET: '<FIREBASE_SECRET_CUSTOM>',
		SCOPE: ['r_basicprofile', 'r_emailaddress'], //Put here the others scopes that you want
		STATE: 'ionicOAuthService'
	},
	FACEBOOK: {
		PROVIDER: 'facebook',
		ID: '<FACEBOOK_ID>',
		SCOPE: ['public_profile', 'email', 'user_work_history', 'user_friends'] //Put here the others scopes that you want
	},
	GOOGLE: {
		PROVIDER: 'google',
		ID: '<GOOGLE_ID>',
		SCOPE: ['email'] //Put here the others scopes that you want
	},
	TWITTER: {
		PROVIDER: 'twitter',
		KEY: '<TWITTER_KEY>',
		SECRET: '<TWITTER_SECRET>'
	}
});