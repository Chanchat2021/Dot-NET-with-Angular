import { MsalInterceptorConfiguration } from '@azure/msal-angular';
import {
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

export const MSALInstanceFactory = (): IPublicClientApplication => {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      redirectUri: environment.logInRedirectUrl,
      postLogoutRedirectUri: environment.logOutRedirectUrl,
      navigateToLoginRequestUrl: false,
    },
  });
};
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.GraphEndpoint, ['user.read','User.ReadBasic.All']);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}
