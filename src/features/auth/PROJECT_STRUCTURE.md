# React Native Project Structure Documentation

यह दस्तावेज़ आपके `MyApp` एप्लिकेशन की वर्तमान फ़ाइल और फ़ोल्डर संरचना का वर्णन करता है। यह संरचना मॉड्यूलरिटी पर केंद्रित है, जिसमें `core`, `features`, और `shared` डायरेक्टरी का उपयोग किया गया है।

```
MyAwesomeApp/
│
├── src/                          # 📂 Main source code directory
│   ├── api/                      # 🌐 API related files
│   │   ├── client.ts             # Axios instance configuration
│   │   ├── endpoints.ts          # All API endpoints constants
│   │   ├── interceptors.ts       # Request/Response interceptors
│   │   └── types.ts              # API request/response types
│   │
│   ├── assets/                   # 🎨 Static assets
│   │   ├── fonts/                # Custom fonts
│   │   ├── images/               # PNG, JPG, SVG files
│   │   ├── animations/           # Lottie/JSON animations
│   │
│   ├── components/               # 🧩 Reusable UI components
│   │   ├── common/               # Shared components (Button, Input, Card)
│   │   ├── forms/                # Form-related components
│   │   ├── navigation/           # Custom nav components
│   │   └── index.ts              # Export all components
│   │
│   ├── config/                   # ⚙️ App configuration
│   │   ├── env.ts                # Environment variables (DEV/STG/PROD)
│   │   └── app.config.ts         # App settings
│   │
│   ├── constants/                # 📝 App constants
│   │   ├── colors.ts             # Color palette
│   │   ├── typography.ts         # Font sizes, families
│   │   ├── spacing.ts            # Margin/padding constants
│   │   ├── storageKeys.ts        # AsyncStorage keys
│   │   └── routes.ts             # Navigation route names
│   │
│   ├── hooks/                    # 🪝 Custom React hooks
│   │   ├── useAuth.ts            # Auth related hooks
│   │   ├── useDebounce.ts        # Debounce hook for search
│   │   └── useNetwork.ts         # Network connectivity
│   │
│   ├── i18n/                     # 🌍 Internationalization
│   │   ├── locales/              # Translation files
│   │   └── i18n.config.ts        # i18next configuration
│   │
│   ├── navigation/               # 🧭 Navigation setup
│   │   ├── stacks/               # Stack navigators
│   │   ├── tabs/                 # Tab navigator
│   │   ├── RootNavigator.tsx     # Root navigation container
│   │   ├── NavigationService.ts  # Navigation without props
│   │   └── types.ts              # Navigation param types
│   │
│   ├── redux/                    # 🗃️ Redux state management
│   │   ├── slices/               # Redux Toolkit slices
│   │   ├── store.ts              # Store configuration
│   │   ├── rootReducer.ts        # Combine reducers
│   │   └── hooks.ts              # Typed hooks (useAppDispatch, useAppSelector)
│   │
│   ├── screens/                  # 📱 App screens
│   │   ├── auth/                 # Authentication screens
│   │   ├── home/                 # Home screens
│   │   └── ...                   # Other feature screens
│   │
│   ├── services/                 # 🔧 Business logic services
│   │   ├── auth.service.ts       # Login, logout, signup APIs
│   │   ├── storage.service.ts    # Secure storage wrapper
│   │   └── ...                   # Other services
│   │
│   ├── theme/                    # 🎨 Theming
│   │   ├── lightTheme.ts
│   │   ├── darkTheme.ts
│   │   └── ThemeProvider.tsx
│   │
│   ├── types/                    # 📘 TypeScript type definitions
│   │   ├── user.types.ts
│   │   └── ...                   # Other global types
│   │
│   ├── utils/                    # 🛠️ Utility functions
│   │   ├── validators.ts         # Form validation
│   │   ├── formatters.ts         # Date, currency formatters
│   │   └── ...                   # Other helpers
│   │
│   ├── App.tsx                   # 🚀 Main App component
│   └── index.js                  # Entry point
│
├── __tests__/                    # 🧪 Test files
├── android/                      # 🤖 Native Android code
├── ios/                          # 🍎 Native iOS code
├── .env                          # Environment variables
├── .eslintrc.js                  # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── package.json
└── tsconfig.json                 # TypeScript config
```

---

## 📂 `src` - डायरेक्टरी का विस्तृत विवरण

### `api/` - नेटवर्क रिक्वेस्ट्स
यह फ़ोल्डर API से संबंधित सभी चीज़ों को संभालता है।

*   **`client.ts`**: यहाँ `axios` का एक इंस्टेंस बनाया जाता है। इसमें बेस URL, हेडर और टाइमआउट जैसी डिफ़ॉल्ट कॉन्फ़िगरेशन होती है।
    ```typescript
    // src/api/client.ts
    import axios from 'axios';
    import Config from '../config/env';

    const apiClient = axios.create({
      baseURL: Config.API_URL,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
    });

    export default apiClient;
    ```
*   **`endpoints.ts`**: सभी API एंडपॉइंट्स को एक ही स्थान पर रखा जाता है ताकि उन्हें आसानी से मैनेज किया जा सके।
*   **`interceptors.ts`**: रिक्वेस्ट भेजने से पहले (जैसे ऑथेंटिकेशन टोकन जोड़ना) और रिस्पॉन्स मिलने के बाद (जैसे एरर को हैंडल करना) लॉजिक चलाने के लिए।

### `assets/` - स्टैटिक फाइल्स
ऐप में उपयोग होने वाली सभी स्टैटिक फाइलें जैसे इमेज, फॉन्ट, और एनिमेशन यहाँ रखी जाती हैं।

### `components/` - दोबारा उपयोग होने वाले UI कंपोनेंट्स
यह UI कंपोनेंट्स का घर है।
*   **`common/`**: बहुत ही सामान्य और छोटे कंपोनेंट्स जैसे `Button.tsx`, `Input.tsx`, `Card.tsx`।
*   **`forms/`**: फॉर्म से संबंधित बड़े कंपोनेंट्स जैसे `LoginForm.tsx` जो `Input` और `Button` का उपयोग करता है।
*   **`navigation/`**: नेविगेशन से संबंधित कस्टम कंपोनेंट्स जैसे `CustomTabBar.tsx`।

### `config/` - ऐप कॉन्फ़िगरेशन
ऐप की कॉन्फ़िगरेशन सेटिंग्स यहाँ होती हैं।
*   **`env.ts`**: विभिन्न एनवायरनमेंट (डेवलपमेंट, प्रोडक्शन) के लिए वैरिएबल को मैनेज करता है।

### `constants/` - ऐप के स्थिरांक
ऐसे मान जो पूरे ऐप में बदलते नहीं हैं।
*   **`colors.ts`**: ऐप की कलर पैलेट।
*   **`routes.ts`**: नेविगेशन के लिए स्क्रीन के नाम।
*   **`storageKeys.ts`**: `AsyncStorage` में डेटा स्टोर करने के लिए कीज़ (keys)।

### `hooks/` - कस्टम हुक्स
कस्टम React हुक्स जो लॉजिक को कंपोनेंट्स के बीच साझा करने की अनुमति देते हैं।
*   **`useAuth.ts`**: ऑथेंटिकेशन से संबंधित लॉजिक (जैसे `login`, `logout`) को मैनेज करता है।
*   **`useNetwork.ts`**: डिवाइस की नेटवर्क स्थिति की जाँच करता है।

### `i18n/` - अंतर्राष्ट्रीयकरण (Multi-language)
ऐप को कई भाषाओं में सपोर्ट देने के लिए।
*   **`locales/`**: हर भाषा के लिए ट्रांसलेशन फाइलें (`en.json`, `hi.json`)।
*   **`i18n.config.ts`**: `i18next` लाइब्रेरी को कॉन्फ़िगर करता है।

### `navigation/` - नेविगेशन
`React Navigation` का पूरा सेटअप यहाँ होता है।
*   **`stacks/`**: विभिन्न स्क्रीन के लिए स्टैक नेविगेटर (`AuthStack.tsx`, `HomeStack.tsx`)।
*   **`RootNavigator.tsx`**: यह मुख्य नेविगेटर है। यह तय करता है कि उपयोगकर्ता को लॉगिन स्क्रीन दिखानी है या ऐप की मुख्य स्क्रीन।
    ```typescript
    // src/navigation/RootNavigator.tsx
    import React from 'react';
    import { NavigationContainer } from '@react-navigation/native';
    import { useAuth } from '../hooks/useAuth';
    import AuthStack from './stacks/AuthStack';
    import MainTabNavigator from './tabs/MainTabNavigator';

    const RootNavigator = () => {
      const { isAuthenticated } = useAuth();

      return (
        <NavigationContainer>
          {isAuthenticated ? <MainTabNavigator /> : <AuthStack />}
        </NavigationContainer>
      );
    };

    export default RootNavigator;
    ```
*   **`NavigationService.ts`**: बिना प्रॉप्स के कहीं से भी नेविगेट करने के लिए।

### `redux/` - ग्लोबल स्टेट मैनेजमेंट
`Redux Toolkit` का उपयोग करके ऐप की ग्लोबल स्टेट को मैनेज करता है।
*   **`slices/`**: हर फीचर के लिए एक अलग "स्लाइस" होता है जो उसके स्टेट और एक्शन को मैनेज करता है (जैसे `authSlice.ts`, `cartSlice.ts`)।
*   **`store.ts`**: सभी स्लाइस को मिलाकर Redux स्टोर बनाता है।
*   **`hooks.ts`**: टाइप-सेफ हुक्स `useAppDispatch` और `useAppSelector` प्रदान करता है।

### `screens/` - ऐप की स्क्रीन्स
हर स्क्रीन एक अलग कंपोनेंट होती है। इन्हें फीचर के अनुसार ग्रुप किया जाता है।
*   **`auth/`**: `LoginScreen.tsx`, `SignupScreen.tsx`।
*   **`home/`**: `HomeScreen.tsx`, `ProductDetailScreen.tsx`।

### `services/` - बिजनेस लॉजिक
यह लेयर UI (कंपोनेंट्स, हुक्स) को डेटा लॉजिक (API कॉल्स) से अलग करती है।
*   **`auth.service.ts`**: ऑथेंटिकेशन से संबंधित API कॉल करने वाले फ़ंक्शन शामिल होते हैं। यह `api/client` का उपयोग करता है।
    ```typescript
    // src/services/auth.service.ts
    import apiClient from '../api/client';
    import { API_ENDPOINTS } from '../api/endpoints';

    const login = (email, password) => {
      return apiClient.post(API_ENDPOINTS.LOGIN, { email, password });
    };

    const logout = () => {
      // ...
    };

    export const authService = {
      login,
      logout,
    };
    ```
*   **`storage.service.ts`**: `AsyncStorage` के लिए एक रैपर, जो डेटा को सुरक्षित रूप से स्टोर और रिट्रीव करता है।

### `theme/` - थीमिंग
ऐप की दिखावट (look and feel) को मैनेज करता है, जैसे लाइट और डार्क मोड।
*   **`lightTheme.ts` / `darkTheme.ts`**: थीम ऑब्जेक्ट्स को परिभाषित करते हैं।
*   **`ThemeProvider.tsx`**: पूरे ऐप में थीम प्रदान करता है।

### `types/` - TypeScript टाइप्स
पूरे ऐप में उपयोग होने वाले ग्लोबल TypeScript टाइप डेफिनिशन।

### `utils/` - यूटिलिटी फ़ंक्शंस
छोटे, दोबारा उपयोग होने वाले हेल्पर फ़ंक्शंस।
*   **`validators.ts`**: ईमेल, पासवर्ड आदि के लिए वैलिडेशन फ़ंक्शंस।
*   **`formatters.ts`**: तारीख, मुद्रा आदि को फॉर्मेट करने के लिए।

### `App.tsx` - मुख्य ऐप कंपोनेंट
यह ऐप का रूट कंपोनेंट है। यह सभी प्रोवाइडर्स (`ReduxProvider`, `ThemeProvider`, `NavigationContainer`) को रैप करता है।

```typescript
// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import RootNavigator from './navigation/RootNavigator';
import { ThemeProvider } from './theme/ThemeProvider';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
```

---

## 🌳 रूट डायरेक्टरी

*   **`__tests__/`**: Jest और React Testing Library के लिए टेस्ट फाइलें।
*   **`android/` और `ios/`**: नेटिव कोड।
*   **`.env`**: एनवायरनमेंट वैरिएबल्स (API कीज़ आदि)। इसे `.gitignore` में जोड़ा जाना चाहिए।
*   **`.eslintrc.js`**: कोड की क्वालिटी और स्टाइल के लिए ESLint के नियम।
*   **`package.json`**: प्रोजेक्ट की डिपेंडेंसी और स्क्रिप्ट्स।
*   **`tsconfig.json`**: TypeScript कंपाइलर के लिए कॉन्फ़िगरेशन।
