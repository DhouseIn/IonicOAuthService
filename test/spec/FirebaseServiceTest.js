describe("FirebaseServiceTest", function() {
	
	var scope;
	var fb;
	var host;

	beforeEach(module('ionicOAuthService', function () {
	}));

	beforeEach(inject(function($rootScope, FirebaseService, FIREBASE_URL) {
		scope = $rootScope.$new();
		fb = FirebaseService;
		host = FIREBASE_URL;
	}));

	it("Should getFirebase function is returning a Firebase reference", function() {
		var ref = fb.getFirebase();
		expect(ref).toBeDefined();
		expect(ref.toString()).toEqual(host + '/');
	});

	it("Should getAuth function is returning an auth reference", function() {
		var auth = fb.getAuth();
		expect(auth).toBeDefined();
	});

	it("Should generateToken function is returning a token based on the Object passed", function() {
		var token = fb.generateToken('fbToken', 'socialToken');
		expect(token).toBeDefined();
	});
});