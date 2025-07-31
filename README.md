# 🎯 TodoApp - Firebase Todo List

A beautiful, modern todo list application built with React, TypeScript, and Firebase. Features secure authentication, real-time synchronization, and a responsive design with dark mode support.

## ✨ Features

### 🔒 Authentication
- **Secure Login/Signup** with Firebase Authentication
- **Email & Password** authentication
- **Persistent Sessions** - stay logged in across browser sessions
- **Real-time Auth State** management

### ✅ Task Management
- **Add, Edit, Delete** tasks with ease
- **Mark Complete/Incomplete** with smooth animations
- **Due Dates & Times** for better organization
- **Task Descriptions** for additional context
- **Real-time Sync** across all devices
- **User-specific Tasks** - each user sees only their tasks

### 💻 UI/UX
- **Beautiful Dark/Light Mode** with smooth transitions
- **Mobile-First Design** - fully responsive
- **Smooth Animations** and micro-interactions
- **Modern Design** with Tailwind CSS
- **Toast Notifications** for user feedback
- **Advanced Filtering** - view all, active, completed, or overdue tasks
- **Search Functionality** to find tasks quickly

### 🚀 Technical Features
- **React 18** with TypeScript
- **Firebase v9** for authentication and database
- **Firestore** for real-time data storage
- **Context API** for state management
- **Custom Hooks** for reusable logic
- **Responsive Design** with Tailwind CSS
- **Hot Toast** for notifications

## 🛠️ Firebase Setup

Before running the application, you need to set up Firebase:

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard

2. **Enable Authentication**
   - In your Firebase project, go to Authentication > Sign-in method
   - Enable "Email/Password" provider

3. **Create Firestore Database**
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in test mode" for development

4. **Get Configuration**
   - Go to Project Settings > General
   - Scroll down to "Your apps" and click the web icon (</>)
   - Copy the Firebase configuration object

5. **Update Configuration**
   - Open `src/lib/firebase.ts`
   - Replace the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```
### Authentication
- **Sign Up**: Create a new account with email and password
- **Sign In**: Log in to your existing account
- **Sign Out**: Securely log out from the app

### Task Management
- **Add Task**: Click the "Add Task" button and fill in the details
- **Edit Task**: Click the edit icon on any task to modify it
- **Complete Task**: Click the circle icon to mark tasks as done
- **Delete Task**: Click the trash icon to remove tasks
- **Filter Tasks**: Use the filter buttons to view specific task types
- **Search Tasks**: Use the search bar to find specific tasks

### Customization
- **Theme**: Toggle between light and dark mode using the theme button
- **Responsive**: The app works perfectly on mobile, tablet, and desktop

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Auth/           # Authentication components
│   ├── Layout/         # Layout components
│   └── Tasks/          # Task management components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── lib/                # Firebase configuration
├── types/              # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🎨 Design System

- **Colors**: Comprehensive color palette with primary, secondary, and accent colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent 8px spacing system
- **Components**: Reusable components with consistent styling
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first design with breakpoints

## 🔒 Security

- **Firebase Auth**: Industry-standard authentication
- **Firestore Rules**: User data isolation (configure in Firebase Console)
- **Client-side Validation**: Input validation and error handling
- **Secure Storage**: No sensitive data stored in localStorage

## 📦 Build & Deploy

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase Hosting** (optional)
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

