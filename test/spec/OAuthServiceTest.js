describe("OAuthServiceTest", function() {

	var scope;
	var socialDeferred;
	var firebaseAuthDeferred;
	var cordovaOauth;
	var firebaseService;
	var oAuthService;
	var auth;
	var socialToken;
	var authData;
	var providerResult;
	var successLoginResult;
	var errorLoginResult;
	var invalidUser;
	var buildSocialToken;
	var buildAuthData;
	var loginSuccessCallback;
	var loginErrorCallback;
	var provider;
	var invalidProvider;

	beforeEach(module('ionicOAuthService', function () {
	}));

	beforeEach(inject(function($rootScope, $q, $cordovaOauth, FirebaseService, OAuthService) {
		scope = $rootScope.$new();
		socialDeferred = $q.defer();
		firebaseAuthDeferred = $q.defer();
		cordovaOauth = $cordovaOauth;
		firebaseService = FirebaseService;
		oAuthService = OAuthService;
		auth = firebaseService.getAuth();
		provider = null;
		invalidProvider = null;
		socialToken = null;
		authData = null;
		providerResult = null;
		successLoginResult = null;
		errorLoginResult = null;
		invalidUser = null;
		invalidToken = null;

		buildSocialToken = function() {
			socialToken = {
				access_token: 'access_token'
			};
		};

		buildAuthData = function() {
			authData = {
				key: 'value'
			};
		};

		loginSuccessCallback = function(provider, authData) {
			providerResult = provider;
			successLoginResult = authData;
		};

		loginErrorCallback = function(provider, error) {
			providerResult = provider;
			errorLoginResult = error;
		};
	}));

	it("Should login function is calling loginErrorCallback when provider does not exist", function() {
		provider = 'invalidProvider';
		invalidProvider = 'INVALID_PROVIDER';
		
		oAuthService.login(provider, loginSuccessCallback, loginErrorCallback);

		expect(successLoginResult).toBeNull();
		expect(provider).toEqual(providerResult);
		expect(invalidProvider).toEqual(errorLoginResult);
	});

	it("Should login function is calling $cordovaOauth linkedin service and calling auth.$authWithCustomToken service and calling loginSuccessCallback when the user is successfully logged", function() {
		provider = 'linkedin';
		buildSocialToken();
		buildAuthData();

		spyOn(firebaseService, 'getAuth').and.returnValue(auth);
		spyOn(cordovaOauth, provider).and.returnValue(socialDeferred.promise);
		spyOn(firebaseService, 'generateToken').and.returnValue(socialToken.access_token);
		spyOn(auth, '$authWithCustomToken').and.returnValue(firebaseAuthDeferred.promise);

		oAuthService.login(provider, loginSuccessCallback, loginErrorCallback);
		socialDeferred.resolve(socialToken);
		firebaseAuthDeferred.resolve(authData);
		scope.$apply();

		expect(firebaseService.getAuth).toHaveBeenCalled();
		expect(cordovaOauth.linkedin).toHaveBeenCalled();
		expect(firebaseService.generateToken).toHaveBeenCalled();
		expect(auth.$authWithCustomToken).toHaveBeenCalledWith(socialToken.access_token);
		expect(errorLoginResult).toBeNull();
		expect(provider).toEqual(providerResult);
		expect(authData).toEqual(successLoginResult);
	});

	it("Should login function is calling $cordovaOauth linkedin service and calling auth.$authWithCustomToken service and calling loginErrorCallback when the user is invalid", function() {
		provider = 'linkedin';
		invalidUser = 'invalidUser';

		spyOn(firebaseService, 'getAuth').and.returnValue(auth);
		spyOn(cordovaOauth, provider).and.returnValue(socialDeferred.promise);
		spyOn(auth, '$authWithCustomToken')

		oAuthService.login(provider, loginSuccessCallback, loginErrorCallback);
		socialDeferred.reject(invalidUser);
		scope.$apply();

		expect(firebaseService.getAuth).toHaveBeenCalled();
		expect(cordovaOauth.linkedin).toHaveBeenCalled();
		expect(auth.$authWithCustomToken).not.toHaveBeenCalled();
		expect(successLoginResult).toBeNull();
		expect(provider).toEqual(providerResult);
		expect(invalidUser).toEqual(errorLoginResult);
	});

	it("Should login function is calling $cordovaOauth linkedin service and calling auth.$authWithCustomToken service and calling loginErrorCallback when the token is invalid", function() {
		provider = 'linkedin';
		invalidToken = 'invalidToken';
		buildSocialToken();

		spyOn(firebaseService, 'getAuth').and.returnValue(auth);
		spyOn(cordovaOauth, provider).and.returnValue(socialDeferred.promise);
		spyOn(auth, '$authWithCustomToken').and.returnValue(firebaseAuthDeferred.promise);

		oAuthService.login(provider, loginSuccessCallback, loginErrorCallback);
		socialDeferred.resolve(socialToken);
		firebaseAuthDeferred.reject(invalidToken);
		scope.$apply();

		expect(firebaseService.getAuth).toHaveBeenCalled();
		expect(cordovaOauth.linkedin).toHaveBeenCalled();
		expect(auth.$authWithCustomToken).toHaveBeenCalled();
		expect(successLoginResult).toBeNull();
		expect(provider).toEqual(providerResult);
		expect(invalidToken).toEqual(errorLoginResult);
	});

	it("Should login function is calling $cordovaOauth facebook service and calling auth.$authWithOAuthToken service and calling loginSuccessCallback when the user is successfully logged", function() {
		provider = 'facebook';
		buildSocialToken();
		buildAuthData();

		spyOn(firebaseService, 'getAuth').and.returnValue(auth);
		spyOn(cordovaOauth, provider).and.returnValue(socialDeferred.promise);
		spyOn(auth, '$authWithOAuthToken').and.returnValue(firebaseAuthDeferred.promise);

		oAuthService.login(provider, loginSuccessCallback, loginErrorCallback);
		socialDeferred.resolve(socialToken);
		firebaseAuthDeferred.resolve(authData);
		scope.$apply();

		expect(firebaseService.getAuth).toHaveBeenCalled();
		expect(cordovaOauth.facebook).toHaveBeenCalled();
		expect(auth.$authWithOAuthToken).toHaveBeenCalledWith(provider, socialToken.access_token);
		expect(errorLoginResult).toBeNull();
		expect(provider).toEqual(providerResult);
		expect(authData).toEqual(successLoginResult);
	});

	it("Should login function is calling $cordovaOauth facebook service and calling auth.$authWithOAuthToken service and calling loginErrorCallback when the user is invalid", function() {
		provider = 'facebook';
		invalidUser = 'invalidUser';

		spyOn(firebaseService, 'getAuth').and.returnValue(auth);
		spyOn(cordovaOauth, provider).and.returnValue(socialDeferred.promise);
		spyOn(auth, '$authWithOAuthToken')

		oAuthService.login(provider, loginSuccessCallback, loginErrorCallback);
		socialDeferred.reject(invalidUser);
		scope.$apply();

		expect(firebaseService.getAuth).toHaveBeenCalled();
		expect(cordovaOauth.facebook).toHaveBeenCalled();
		expect(auth.$authWithOAuthToken).not.toHaveBeenCalled();
		expect(successLoginResult).toBeNull();
		expect(provider).toEqual(providerResult);
		expect(invalidUser).toEqual(errorLoginResult);
	});

	it("Should login function is calling $cordovaOauth facebook service and calling auth.$authWithOAuthToken service and calling loginErrorCallback when the token is invalid", function() {
		provider = 'facebook';
		invalidToken = 'invalidToken';
		buildSocialToken();

		spyOn(firebaseService, 'getAuth').and.returnValue(auth);
		spyOn(cordovaOauth, provider).and.returnValue(socialDeferred.promise);
		spyOn(auth, '$authWithOAuthToken').and.returnValue(firebaseAuthDeferred.promise);

		oAuthService.login(provider, loginSuccessCallback, loginErrorCallback);
		socialDeferred.resolve(socialToken);
		firebaseAuthDeferred.reject(invalidToken);
		scope.$apply();

		expect(firebaseService.getAuth).toHaveBeenCalled();
		expect(cordovaOauth.facebook).toHaveBeenCalled();
		expect(auth.$authWithOAuthToken).toHaveBeenCalled();
		expect(successLoginResult).toBeNull();
		expect(provider).toEqual(providerResult);
		expect(invalidToken).toEqual(errorLoginResult);
	});

	it("Should login function is calling $cordovaOauth google service and calling auth.$authWithOAuthToken service and calling loginSuccessCallback when the user is successfully logged", function() {
		provider = 'google';
		buildSocialToken();
		buildAuthData();

		spyOn(firebaseService, 'getAuth').and.returnValue(auth);
		spyOn(cordovaOauth, provider).and.returnValue(socialDeferred.promise);
		spyOn(auth, '$authWithOAuthToken').and.returnValue(firebaseAuthDeferred.promise);

		oAuthService.login(provider, loginSuccessCallback, loginErrorCallback);
		socialDeferred.resolve(socialToken);
		firebaseAuthDeferred.resolve(authData);
		scope.$apply();

		expect(firebaseService.getAuth).toHaveBeenCalled();
		expect(cordovaOauth.google).toHaveBeenCalled();
		expect(auth.$authWithOAuthToken).toHaveBeenCalledWith(provider, socialToken.access_token);
		expect(errorLoginResult).toBeNull();
		expect(provider).toEqual(providerResult);
		expect(authData).toEqual(successLoginResult);
	});

	it("Should login function is calling $cordovaOauth google service and calling auth.$authWithOAuthToken service and calling loginErrorCallback when the user is invalid", function() {
		provider = 'google';
		invalidUser = 'invalidUser';

		spyOn(firebaseService, 'getAuth').and.returnValue(auth);
		spyOn(cordovaOauth, provider).and.returnValue(socialDeferred.promise);
		spyOn(auth, '$authWithOAuthToken')

		oAuthService.login(provider, loginSuccessCallback, loginErrorCallback);
		socialDeferred.reject(invalidUser);
		scope.$apply();

		expect(firebaseService.getAuth).toHaveBeenCalled();
		expect(cordovaOauth.google).toHaveBeenCalled();
		expect(auth.$authWithOAuthToken).not.toHaveBeenCalled();
		expect(successLoginResult).toBeNull();
		expect(provider).toEqual(providerResult);
		expect(invalidUser).toEqual(errorLoginResult);
	});

	it("Should login function is calling $cordovaOauth google service and calling auth.$authWithOAuthToken service and calling loginErrorCallback when the token is invalid", function() {
		provider = 'google';
		invalidToken = 'invalidToken';
		buildSocialToken();

		spyOn(firebaseService, 'getAuth').and.returnValue(auth);
		spyOn(cordovaOauth, provider).and.returnValue(socialDeferred.promise);
		spyOn(auth, '$authWithOAuthToken').and.returnValue(firebaseAuthDeferred.promise);

		oAuthService.login(provider, loginSuccessCallback, loginErrorCallback);
		socialDeferred.resolve(socialToken);
		firebaseAuthDeferred.reject(invalidToken);
		scope.$apply();

		expect(firebaseService.getAuth).toHaveBeenCalled();
		expect(cordovaOauth.google).toHaveBeenCalled();
		expect(auth.$authWithOAuthToken).toHaveBeenCalled();
		expect(successLoginResult).toBeNull();
		expect(provider).toEqual(providerResult);
		expect(invalidToken).toEqual(errorLoginResult);
	});

	it("Should login function is calling $cordovaOauth twitter service and calling auth.$authWithOAuthToken service and calling loginSuccessCallback when the user is successfully logged", function() {
		provider = 'twitter';
		socialToken = {
			user_id: 'user_id',
			oauth_token: 'oauth_token',
			oauth_token_secret: 'oauth_token_secret'
		};
		buildAuthData();

		spyOn(firebaseService, 'getAuth').and.returnValue(auth);
		spyOn(cordovaOauth, provider).and.returnValue(socialDeferred.promise);
		spyOn(auth, '$authWithOAuthToken').and.returnValue(firebaseAuthDeferred.promise);

		oAuthService.login(provider, loginSuccessCallback, loginErrorCallback);
		socialDeferred.resolve(socialToken);
		firebaseAuthDeferred.resolve(authData);
		scope.$apply();

		expect(firebaseService.getAuth).toHaveBeenCalled();
		expect(cordovaOauth.twitter).toHaveBeenCalled();
		expect(auth.$authWithOAuthToken).toHaveBeenCalledWith(provider, socialToken);
		expect(errorLoginResult).toBeNull();
		expect(provider).toEqual(providerResult);
		expect(authData).toEqual(successLoginResult);
	});

	it("Should login function is calling $cordovaOauth twitter service and calling auth.$authWithOAuthToken service and calling loginErrorCallback when the user is invalid", function() {
		provider = 'twitter';
		invalidUser = 'invalidUser';

		spyOn(firebaseService, 'getAuth').and.returnValue(auth);
		spyOn(cordovaOauth, provider).and.returnValue(socialDeferred.promise);
		spyOn(auth, '$authWithOAuthToken')

		oAuthService.login(provider, loginSuccessCallback, loginErrorCallback);
		socialDeferred.reject(invalidUser);
		scope.$apply();

		expect(firebaseService.getAuth).toHaveBeenCalled();
		expect(cordovaOauth.twitter).toHaveBeenCalled();
		expect(auth.$authWithOAuthToken).not.toHaveBeenCalled();
		expect(successLoginResult).toBeNull();
		expect(provider).toEqual(providerResult);
		expect(invalidUser).toEqual(errorLoginResult);
	});

	it("Should login function is calling $cordovaOauth twitter service and calling auth.$authWithOAuthToken service and calling loginErrorCallback when the token is invalid", function() {
		provider = 'twitter';
		invalidToken = 'invalidToken';
		buildSocialToken();

		spyOn(firebaseService, 'getAuth').and.returnValue(auth);
		spyOn(cordovaOauth, provider).and.returnValue(socialDeferred.promise);
		spyOn(auth, '$authWithOAuthToken').and.returnValue(firebaseAuthDeferred.promise);

		oAuthService.login(provider, loginSuccessCallback, loginErrorCallback);
		socialDeferred.resolve(socialToken);
		firebaseAuthDeferred.reject(invalidToken);
		scope.$apply();

		expect(firebaseService.getAuth).toHaveBeenCalled();
		expect(cordovaOauth.twitter).toHaveBeenCalled();
		expect(auth.$authWithOAuthToken).toHaveBeenCalled();
		expect(successLoginResult).toBeNull();
		expect(provider).toEqual(providerResult);
		expect(invalidToken).toEqual(errorLoginResult);
	});

	it("Should getCurrentUser function is returning the looged user", function() {
		buildAuthData();

		spyOn(firebaseService, 'getAuth').and.returnValue(auth);
		spyOn(auth, '$getAuth').and.returnValue(authData);

		var user = oAuthService.getCurrentUser();

		expect(user).toBeDefined();
		expect(user.key).toEqual('value');
	});
});