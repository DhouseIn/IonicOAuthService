[![PayPal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NR8YJSJX353AC)

# IonicOAuthService

OAuth Service with Firebase and ng-cordova-oauth to do Social Login in Ionic

## Social

 - LinkedIn;
 - Facebook;
 - Google+;
 - Twitter.

## Requirements

* [Apache Cordova 3.5+](https://cordova.apache.org/)
* [Apache Cordova InAppBrowser Plugin](http://cordova.apache.org/docs/en/3.0.0/cordova_inappbrowser_inappbrowser.md.html)
* [Apache Cordova Whitelist Plugin](https://github.com/apache/cordova-plugin-whitelist)
* [jsSHA 1.6.0](https://github.com/Caligatio/jsSHA) Secure Hash Library (Twitter, Withings, and Magento only)
* [Ionic Framework 1.0+](http://ionicframework.com/)

## Installing IonicOAuthService Into Your Project

### Bower way:

Add this repository as dependency:

    $ bower install ionic-oauth-service -S

This action will set the dependency and add it to the `bower.json` file.

The JavaScript library must then be added to your **index.html** file:

    <script src="../ionicoauthservice/dist/config.js"></script>
    <script src="../ionicoauthservice/dist/ionicoauthservice.min.js"></script>

### Outdated way:

Copy the following file from this repository to your Ionic project:

    $ cd ionicoauthservice
    $ cp ionicoauthservice.js /path/to/project/www/js/config.js
    $ cp ionicoauthservice.js /path/to/project/www/js/ionicoauthservice.min.js

The JavaScript library must then be added to your **index.html** file:

    <script src="js/config.js"></script>
    <script src="js/ionicoauthservice.min.js"></script>

### Injecting:

Once added to your index.html file, you must inject the library into your **app.js** module. Make your
**app.js** file look something like the following:

    angular.module('starter', ['ionic', 'ionicOAuthService'])

### Configuring your Firebase and Socials Keys:

Now you need to update the config.js file to use your socials signIn. You must need put the Firebase URL and should set just the socials that you want to do SignIn.

At this point, ionicOAuthService is installed into your project and is ready for use.
