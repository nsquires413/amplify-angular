import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify from 'aws-amplify';
import { Auth } from "aws-amplify";

console.log("loaded main.ts");

let config = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'MY_USER_POOL_ID',
    userPoolWebClientId: 'MY_APP_CLIENT_ID',
    oauth: {
        domain: 'MY_AUTH_DOMAIN',
        scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: 'http://localhost:4200',
        redirectSignOut: 'http://localhost:4200',
        responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
}

Amplify.configure(config);

const currentConfig = Auth.configure();

console.log("currentConfig: ", currentConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
