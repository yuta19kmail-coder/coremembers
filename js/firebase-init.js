/* ========================================
   firebase-init.js  -  CoreMembers v0.1.0〜
   ----------------------------------------
   CarFlow と同じ Firebase プロジェクト(carflow-9d500)に「相乗り」する。
   ・認証(Google) と Firestore を共用。
   ・CoreMembers のデータは専用コレクション（coreMembers / coreDepts / coreLocations）に保存。
       本番 CarFlow / StockFlow / MHS のデータには触らない。
   ・入室判定は CoreFlow 名簿(portalMembers)を使う（他アプリと同じ）。
   ・authDomain はアプリと同一サブドメイン(coremembers.kobayashi-motors.com)。
       ※前提：Google Cloud OAuth クライアントに
         https://coremembers.kobayashi-motors.com/__/auth/handler を登録必須（MHS と同じ手順）。
   ======================================== */
(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyBmhI5SzkmPvZUiuTn_ttCZ4tUikKv_iHI",
    authDomain: "coremembers.kobayashi-motors.com",
    projectId: "carflow-9d500",
    storageBucket: "carflow-9d500.firebasestorage.app",
    messagingSenderId: "235121541987",
    appId: "1:235121541987:web:8f96dfadc23fe1de7f4956"
  };
  if (typeof firebase === 'undefined') { console.error('[firebase-init] Firebase SDK 未読込'); return; }
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  // オフライン永続化は無効（複数アプリ/タブのズレ事故を避け、常にサーバー実データ）。
  window.fb = {
    auth: auth, db: db, config: firebaseConfig,
    serverTimestamp: function () { return firebase.firestore.FieldValue.serverTimestamp(); },
    FieldValue: firebase.firestore.FieldValue,
    currentUser: null, currentMember: null
  };
  console.log('[firebase-init] OK', firebaseConfig.projectId);
})();
