import {google} from 'googleapis';
import { auth } from 'googleapis/build/src/apis/abusiveexperiencereport';
import { createConnection } from 'mysql';

const googleConfig = {
    clientId: process.env.dc3o91lvp3egur7rsv1eoovr59l8nb3k.apps.googleusercontent.com,
    clientSecret: process.env.iPykb2PfySeI1CSKroTSvZrS,
    //redirect: process.env.process.env.http://localhost:3000/auth/google/callback,
};

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];

function getConnectionUrl (auth) {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope
    });
}

function getGooglePlusApi(auth) {
    return google.plus({
        version: 'v1', auth
    });
}

function urlGoogle() {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
}

function getGoogleAccountFromCode(code) {
    const data = await auth.getIdTokenClient(code);
    const tokens = data.tokens;
    const auth = createConnection();
    auth.setCredentials(tokens);
    const plus = getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me'});
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    return {
        id: userGoogleId,
        email: userGoogleEmail,
        tokens: tokens,
    };
}