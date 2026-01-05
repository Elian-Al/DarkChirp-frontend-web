# 🐦 DarkChirp - Client Web (Next.js)

**DarkChirp** est l'interface web officielle du réseau social DarkChirp. Ce client permet aux utilisateurs de partager des "Posts", de gérer leur profil et d'interagir avec la communauté en temps réel grâce à une architecture moderne et réactive.

---

## 🚀 Fonctionnalités

- **Gestion de Session** : Authentification complète (Inscription/Connexion) avec persistance via **Zustand**.
- **Fil d'actualité dynamique** : Affichage des derniers posts avec mise à jour instantanée après publication.
- **Interactions Sociales** : 
  - Système de **Likes** pour réagir aux posts.
  - Système de **Sauvegardes** (Bookmarks) pour retrouver ses posts favoris.
  - **Suppression sécurisée** des posts par leurs auteurs.
- **Navigation Intelligente** : Routing fluide entre la Home, le Profil et les pages de connexion.
- **Design Atomique** : Composants UI réutilisables (`Button`, `Input`, `Modal`) pour une interface cohérente.

---

## 🛠️ Stack Technique

- **Framework** : [Next.js](https://nextjs.org/)
- **Gestion d'état global** : [Zustand](https://github.com/pmndrs/zustand)
- **Client API** : Fetch API encapsulée dans des services dédiés (`authService`, `postService`).
- **Styles** : CSS Modules pour une isolation parfaite des styles.
- **Iconographie** : [React Icons](https://react-icons.github.io/react-icons/)

---

## 📂 Architecture du Code

```text
├── components/          # Composants de structure (Home, Posts, Profile)
│   ├── UI/              # Composants atomiques (Button, Input)
│   └── auth/            # Logique d'authentification (Modales, Forms)
├── pages/               # Système de routes Next.js
├── services/            # Appels API (Fetch)
├── stores/              # Stores Zustand (Authentification)
└── styles/              # CSS Modules
```

## ⚙️ Installation et Lancement
### 1. Prérequis
Node.js (v18.0.0+)

Le Backend DarkChirp doit être opérationnel.

### 2. Clonage et dépendances
```Bash
git clone https://github.com/Elian-Al/DarkChirp-frontend-web.git
cd frontend-web
npm install
```

### 3. Configuration (.env.local)
Créez un fichier .env.local à la racine du projet :

```Extrait de code
NEXT_PUBLIC_API_URL=http://localhost:3000
````

### 4. Lancement
```Bash
# Lancement sur le port 3001 (configuré dans package.json)
npm run dev
```
Accédez à l'application via : http://localhost:3001

## 🛡️ Sécurité
Le client communique avec l'API en utilisant des Tokens JWT stockés localement et gérés par le store Zustand. Chaque requête vers un endpoint protégé inclut automatiquement le header Authorization: Bearer <token>.

## 🔗 Liens
Dépôt Backend : [DarkChirp-backend](https://github.com/Elian-Al/DarkChirp-backend)

## 📝 Auteur
Elian - [Profil GitHub](https://github.com/Elian-Al)
