
# VirtuTour

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️  [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 📖 [Contributor Guide](#contributor-guide)
## <a name="introduction">🤖 Introduction</a>

VirtuTour app offers an innovative way to explore Texas A&M University by providing an immersive, interactive virtual tour guide experience. As users navigate through the campus, VirtuTour detects their proximity to historic sites and landmarks, automatically presenting rich audio narratives and visual stories that delve into the history and culture of each location. This app is perfect for enhancing the campus visit experience, offering a deep dive into the university's heritage in a modern, engaging way.

<img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
<img src="https://img.shields.io/badge/-Expo-black?style=for-the-badge&logoColor=white&logo=expo&color=000020" alt="expo" />
</div>

<div align="center" style="display: flex; justify-content: space-around; align-items: center; margin-bottom: 20px">
  <img src="VirtuTour/screenshots/ss4.png" alt="Campus Overview" width="200px">
  <img src="VirtuTour/screenshots/ss1.png" alt="Historical Site Detail View" width="200px">
<img src="VirtuTour/screenshots/ss3.png" alt="Interactive Tour Experience in Action" width="200px">
  <img src="VirtuTour/screenshots/ss2.png" alt="Interactive Tour Experience in Action" width="200px">
</div>
<div>

## Demo Video

<div align="center" style="display: flex; justify-content: space-around; align-items: center; margin-bottom: 20px">
  <img src="VirtuTour/screenshots/demo-virtutour.gif" alt="Interactive Tour GIF" width="500px">
</div>


## <a name="tech-stack">⚙️ Tech Stack</a>
 - Node.js
 - React Native
 - Expo
 - Gesture Handler
 - Reanimated
 - Google Maps API

## <a name="features">🔋 Features</a>

- **Proximity-Based Narratives:** As you approach different landmarks on the campus, the app automatically triggers audio stories and visual content, sharing the history and significance of each location.
- **Immersive Audio Tours:** Enjoy captivating audio guides that offer insights into the university's traditions, achievements, and historical milestones.
- **Interactive Campus Map:** Utilize an interactive map to navigate the campus efficiently, with highlighted points of interest that guide your journey.
- **Rich Visual Content:** Each point of interest is accompanied by a selection of photographs and visual elements that enhance the storytelling experience.
- **Easy Navigation:** The app's user-friendly interface ensures a seamless experience as you explore Texas A&M University.




## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) v21.6.2
- [npm](https://www.npmjs.com/) (Node Package Manager) v10.5.0

**Cloning the Repository**

```bash
git clone https://github.com/Sathvik10/VirtuTour.git
cd VirtuTour
```
**Set up development ENV variables**
1. Create a `.env.development` file in the root folder `VirtuTour/VirtuTour/.`
2. Add a Google Maps API key. Set the following env variable: `EXPO_PUBLIC_GOOGLE_API_KEY`

NOTE: All expo env variables should start with a prefix `EXPO_PUBLIC_[name]`. `name` here can be the env variable name

**Start the React Native project in Development Mode**
Run the below command to export application bundle to Android or iOS

```bash
NODE_ENV=development npx expo start
```

### Expo Client:
There are two options to setup the Expo Client:
1. Download an app called Expo Client. Scan the QR code on the app.
2. Setup the Simulator for Android/IOS


## <a name="contributor-guide">📖 Contributor Guide</a>

### Project Structure
```plaintext
VirtuoTour
├── app - Place all the main code in this directory
│   ├── _layout.js
│   ├── home.js
│   └── index.js
├── app.json
├── assets - Place all the assets in this file
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── fonts
│   ├── icon.png
│   └── splash.png
├── babel.config.js
├── components - Create components in this directory
│   └── common - Create common components in this directory
│       └── header -
│           └── header.js
├── constants - Create all the constants in this directory
│   ├── icons.js
│   ├── images.js
│   ├── index.js - Export the constants in this file
│   └── theme.js
├── index.js - Entry point is defined in this file
├── package-lock.json
├── package.json
├── styles - Place global styles in this directory
└── yarn.lock
```

### Folder Structuring Tips:
1. For components that are used throughout the app, such as cards, headers, and footers, place them in the components/common folder. This helps in reusing these components easily.
2. When creating a new component, organize it into its own folder within components. This folder should include two main files: one for the component's code and another for its styling. This way, you keep both the logic and the look of your component neatly packaged together. 
#### Example: 
```plaintext
VirtuoTour
├── components
│   ├── common
│   │   ├── Card
│   │   │   ├── Card.js          - Component logic for a reusable card.
│   │   │   └── Card.styles.js   - Styling for the Card component.
│   │   ├── Header
│   │   │   ├── Header.js        - Component logic for the app header.
│   │   │   └── Header.styles.js - Styling for the Header component.
│   │   └── Footer
│   │       ├── Footer.js        - Component logic for the app footer.
│   │       └── Footer.styles.js - Styling for the Footer component.
│   ├── FeatureComponent
│   │   ├── FeatureComponent.js       - Specific feature component logic.
│   │   └── FeatureComponent.styles.js- Styling specific to the feature component.
│   └── AnotherFeature
│       ├── AnotherFeature.js        - Another specific feature component logic.
│       └── AnotherFeature.styles.js - Styling specific to another feature component.
...
```
