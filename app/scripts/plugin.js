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