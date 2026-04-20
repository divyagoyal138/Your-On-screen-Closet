# Your-On-screen-Closet App

Having trouble choosing your oufits from your pile of clothes?
Here is our solution!

-> A modern wardrobe management web application that allows users to digitally organize their clothing, create outfits, and simplify daily styling decisions.

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Build-Vite-purple)
![TypeScript](https://img.shields.io/badge/Code-TypeScript-blue)
![Firebase](https://img.shields.io/badge/Auth-Firebase-orange)
![Tailwind](https://img.shields.io/badge/UI-TailwindCSS-38B2AC)
![Status](https://img.shields.io/badge/Status-In_Development-yellow)

---
## Overview
Digital Closet is a frontend-focused web application built with React and Vite, designed to help users manage their wardrobe visually. It integrates Firebase Authentication for secure user access and leverages a clean, responsive UI built with Tailwind CSS and modern component libraries.

---

## Features

*  Add and manage clothing items
*  Create and organize outfits
*  User authentication with Firebase
*  Fast performance using Vite
*  Clean UI with Tailwind, Radix UI, and Material UI
*  Smooth animations using Motion
*  Icon system powered by Lucide React
---
##  Tech Stack

**Languages**
* TypeScript / TSX
* JavaScript
* HTML / CSS

**Frontend**
* React 18
* Vite

**Styling & UI**
* Tailwind CSS
* Radix UI
* Material UI (with Emotion)

**Icons & Animations**
* Lucide React
* Motion

**Backend / Services**
* Firebase Authentication

> Note: No custom backend (Node/Express) is currently implemented.

---
## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/divyagoyal138/Your-On-screen-Closet.git
cd Your-On-screen-Closet
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase
Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Ensure Firebase Authentication is enabled in your Firebase console.

---

### 4. Run the Development Server

```bash
npm run dev
```

---
## Future Improvements

*  AI-based outfit recommendations
*  Weather-based outfit suggestions
*  Cloud storage for clothing images (Firebase Storage)
*  Social features (sharing outfits)
*  Mobile-responsive enhancements and app
