import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth'; 


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZuK7qOmK1w_llSsZQTsbPNarzt7SVfQ8",
  authDomain: "etec-50c04.firebaseapp.com",
  databaseURL: "https://etec-50c04-default-rtdb.firebaseio.com",
  projectId: "etec-50c04",
  storageBucket: "etec-50c04.appspot.com",
  messagingSenderId: "1094862902633",
  appId: "1:1094862902633:web:642a907cfff5b7308719f8",
  measurementId: "G-ZKX90BZ7BF"
};

// Inicialize o Firebase
// Delete o Firebase App existente, se existir
if (firebase.apps.length) {
  firebase.apps[0].delete()
    .then(() => {
      console.log('Firebase App excluído com sucesso');
      // Inicialize o Firebase com a nova configuração
      firebase.initializeApp(firebaseConfig);
    })
    .catch(error => {
      console.error('Erro ao excluir o Firebase App:', error);
    });
} else {
  console.log('Nenhum Firebase App encontrado para excluir');
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
