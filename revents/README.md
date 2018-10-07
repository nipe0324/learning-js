# Revent

Udemy cource: https://www.udemy.com/build-an-app-with-react-redux-and-firestore-from-scratch/

## Tools

- React
- Redux (State management)
- Types (PropTypes, TypeScript, Flow)
- Styling (Semantic UI css + Semantic UI React)
- React Router
- Redux Forms
- ... and more


* Configure google place & firebase / firestore

```
#.env
REACT_APP_GOOGLE_PLACE_API_KEY="Your API Key"
REACT_APP_FIREBASE_API_KEY="Your API Key"
REACT_APP_FIREBASE_AUTH_DOMAIN="Your Auth Domain"
REACT_APP_FIREBASE_DATABASE_URL="Your Database URL"
REACT_APP_FIREBASE_PROJECT_ID="Your Project Id"
REACT_APP_FIREBASE_BUCKET="Your Bucket"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="Your Messaging Sender Id"
```

* Run development server

```
yarn start
```

* Deploy Cloud functions

```
# install firebase cli
npm install -g @google-cloud/functions-emulator

# login firebase
firebase login

# deploy
firebase deploy --only functions
```