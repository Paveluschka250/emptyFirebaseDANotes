import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"danotes-36412","appId":"1:1090523998352:web:094ab390e93cc81a541015","storageBucket":"danotes-36412.firebasestorage.app","apiKey":"AIzaSyDOkkiqbTp7ACudmhFMkEwntJu-oFzxJHs","authDomain":"danotes-36412.firebaseapp.com","messagingSenderId":"1090523998352","projectNumber":"1090523998352","version":"2"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
