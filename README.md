# Leaderboard App

This is a **React Native** app built with **Expo** that allows users to search for a specific user in a leaderboard, view the top 10 users by the number of bananas they have, and perform additional sorting and filtering operations. The app uses **Redux** for state management, **Immutable.js** for immutable state updates, and **TypeScript** for type checking. It also includes a **fuzzy search** feature and **translation** support as a bonus.

---

## Features

### **Core Features**
1. **Search for a User**:
   - Enter a username in the search bar and click the search button.
   - The app will display the top 10 users by the number of bananas they have.
   - If the searched user is in the top 10, they will be highlighted in the list.
   - If the searched user is not in the top 10, they will replace the last user in the top 10 list, and their rank will be displayed.

2. **Sorting Options**:
   - **Sort by Name**: Sort the list alphabetically by username.
   - **Sort by Rank**: Sort the list by rank (highest to lowest number of bananas).
   - **Sort by Lowest Rank**: Show the lowest-ranked users, sorted alphabetically if they have the same rank.

3. **Error Handling**:
   - If the searched user does not exist, an error message will be displayed:  
     *“This user name does not exist! Please specify an existing user name!”*

4. **Fuzzy Search**:
   - Users can search by partial names. The app will show all matching usernames, sorted by rank.

5. **Translation Support**:
   - The app includes translation support for a better user experience.

---

## Tech Stack

- **React Native**: For building the mobile app.
- **Expo**: For easy development and deployment.
- **Redux**: For state management.
- **Immutable.js**: For immutable state updates.
- **TypeScript**: For type checking and better code maintainability.
- **React Native Paper**: For UI components and theming.
- **i18next**: For translation support.

---

## Setup Instructions

1. **Clone the Repository**:
```bash
   git clone https://github.com/ryan-j-cooke/react-native-case-study-coding-task.git
   cd leaderboard-app
```

2. **install Dependencies:**
```bash
npm install
```

3. **Run the App:**
```bash
npx expo start
```

4. **Run on a Device:**
- Scan the QR code with the Expo Go app (available on iOS and Android).
- Alternatively, run on an emulator or simulator.

# Project Structure
📂 /  
┣ 📄 _layout.tsx                → Main layout for the app, handles navigation and structure  
┣ 📄 +not-found.tsx             → 404 page displayed when a route is not found  
┗ 📂 src/  
    ┣ 📄 app.tsx                → Entry point of the application  
    ┣ 📂 components/            → Reusable UI components  
    ┃   ┗ 📄 language-selector.tsx  → Dropdown component for changing languages  
    ┣ 📄 fuzzy-search-dialog.tsx → Dialog component for fuzzy search functionality  
    ┣ 📄 home.tsx               → Home screen component  
    ┣ 📂 hooks/                 → Custom React hooks for reusable logic  
    ┃   ┗ 📄 leaderboard-data.tsx → Hook for fetching and managing leaderboard data  
    ┣ 📂 locales/               → Translation files  
    ┃   ┣ 📄 en.json            → English translations  
    ┃   ┣ 📄 i18n.ts            → i18n configuration for multi-language support  
    ┃   ┗ 📄 th.json            → Thai translations  
    ┣ 📄 splash.tsx             → Splash screen component  
    ┗ 📂 store/                 → Redux store, actions, and reducers  
        ┣ 📄 index.tsx          → Redux store configuration  
        ┗ 📄 leaderboard-actions.tsx → Actions related to the leaderboard state  

### Future Improvements  

- **Add more unit tests** for edge cases.  
- **Improve the fuzzy search algorithm** for better performance.  
- **Add animations** for a smoother user experience.  
- **Support dark mode** for better accessibility and aesthetics.  
