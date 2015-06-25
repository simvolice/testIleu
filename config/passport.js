/**
 * Passport configuration
 *
 * This is the configuration for your Passport.js setup and where you
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {
  local: {
    strategy: require('passport-local').Strategy
  },

  bearer: {
    strategy: require('passport-http-bearer').Strategy
  },



  facebook: {
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    options: {
      clientID: '845947535495655',
      clientSecret: 'f5ba13fc99e7a6b32fe46ce37b36050d',
      scope: ['email']
    }
  },

  google: {
    name: 'Google',
    protocol: 'oauth2',
    strategy: require('passport-google-oauth').OAuth2Strategy,
    options: {
      clientID: '764010842907-4v2v8hbk1pgm092e27bqr2rskv93omts.apps.googleusercontent.com',
      clientSecret: 'AH261OFR5JKvbDiWvPGQXcCS',
        scope: ['email']
    }
  },



  twitter: {
    name: 'Twitter',
    protocol: 'oauth',
    strategy: require('passport-twitter').Strategy,
    options: {
      consumerKey: 'z1X2qDLJ3AidM9cTa6f5lTxiS',
      consumerSecret: 'I5j9IlvsDKzfCl8n18nhio0nZNhhDwX982jsyGBUErIANiVW0h'
    }
  },

    vkontakte: {
    name: 'Vkontakte',
    protocol: 'oauth2',
    strategy: require('passport-vkontakte').Strategy,
    options: {
      clientID: '4969237',
      clientSecret: 'zmsBxTH8SYXfVh1tgtQQ'
    }
  },


  linkedin: {
    name: 'Linkedin',
    protocol: 'oauth2',
    strategy: require('passport-linkedin-oauth2').Strategy,
    options: {
      clientID: '77l7s00s83poej',
      clientSecret: '16t1bEttzDlzMIv1',
        scope: ['r_emailaddress'],
        state: true
    }
  }



   /*
  github: {
    name: 'GitHub',
    protocol: 'oauth2',
    strategy: require('passport-github').Strategy,
    options: {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret'
    }
  },


  cas: {
    name: 'CAS',
    protocol: 'cas',
    strategy: require('passport-cas').Strategy,
    options: {
      ssoBaseURL: 'http://your-cas-url',
      serverBaseURL: 'http://localhost:1337',
      serviceURL: 'http://localhost:1337/auth/cas/callback'
    }
  }*/
};
