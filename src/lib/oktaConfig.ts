export const oktaConfig = {
    clientId: '0oa9bn2nr5hiiRYNG5d7',
    issuer: 'https://dev-35645221.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true
}