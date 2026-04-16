#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Creating Enterprise React Native Structure...${NC}\n"

# Check if we're in a React Native project
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No package.json found!${NC}"
    echo -e "${YELLOW}Please run this script from your React Native project root directory${NC}"
    exit 1
fi

# Create main directories
echo -e "${GREEN}📁 Creating directory structure...${NC}"

# Core directories
mkdir -p src/app
mkdir -p src/features/{auth,product,cart,user,payment,notification,order}
mkdir -p src/shared/{components/ui,components/layout,hooks,utils,constants,types,assets}
mkdir -p src/core/{api/interceptors,config/env,i18n/locales,navigation/stacks,storage}
mkdir -p src/lib/{firebase,pushNotifications,analytics,payments}
mkdir -p __mocks__
mkdir -p __tests__/{unit,integration,e2e}
mkdir -p scripts
mkdir -p .husky
mkdir -p .github/workflows

# Create feature subdirectories
for feature in auth product cart user payment notification order; do
    mkdir -p src/features/$feature/{components,hooks,services,screens,redux,types,utils}
done

# Create shared component directories
for component in Button Input Modal Loader; do
    mkdir -p src/shared/components/ui/$component
done

# Create asset directories
mkdir -p src/shared/assets/{fonts,images,animations,theme}

echo -e "${GREEN}✅ Directories created${NC}\n"

# Create all TypeScript files
echo -e "${GREEN}📝 Creating TypeScript files...${NC}"

# App files
cat > src/app/store.ts << 'EOF'
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
EOF

cat > src/app/rootReducer.ts << 'EOF'
import { combineReducers } from '@reduxjs/toolkit';
// Import reducers from features
// import authReducer from '../features/auth/redux/authSlice';

const rootReducer = combineReducers({
  // auth: authReducer,
  // Add other reducers here
});

export default rootReducer;
EOF

cat > src/app/App.tsx << 'EOF'
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../core/navigation/RootNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
EOF

# Auth feature files
cat > src/features/auth/index.ts << 'EOF'
// Export all public APIs for auth feature
export { default as LoginScreen } from './screens/LoginScreen';
export { default as SignupScreen } from './screens/SignupScreen';
export { default as OTPScreen } from './screens/OTPScreen';
export { useAuth } from './hooks/useAuth';
export { default as authReducer } from './redux/authSlice';
export type { User, AuthState } from './types/auth.types';
EOF

cat > src/features/auth/redux/authSlice.ts << 'EOF'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: null | any;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;
EOF

cat > src/features/auth/hooks/useAuth.ts << 'EOF'
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logout, setLoading, setError } from '../redux/authSlice';
import type { RootState } from '../../../app/store';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      // Add your login API call here
      // const response = await authAPI.login(email, password);
      // dispatch(setUser(response.data));
      console.log('Login:', email, password);
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signup = async (userData: any) => {
    dispatch(setLoading(true));
    try {
      // Add your signup API call here
      console.log('Signup:', userData);
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout: handleLogout,
  };
};
EOF

cat > src/features/auth/screens/LoginScreen.tsx << 'EOF'
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    await login(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
  },
});

export default LoginScreen;
EOF

# Core navigation files
cat > src/core/navigation/RootNavigator.tsx << 'EOF'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../features/auth/screens/LoginScreen';
import SignupScreen from '../../features/auth/screens/SignupScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
EOF

cat > src/core/navigation/navigationRef.ts << 'EOF'
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
EOF

# Shared Button component
cat > src/shared/components/ui/Button/Button.tsx << 'EOF'
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#6C757D',
  },
  danger: {
    backgroundColor: '#DC3545',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#fff',
  },
  dangerText: {
    color: '#fff',
  },
  outlineText: {
    color: '#007AFF',
  },
});

export default Button;
EOF

# Entry point
cat > src/index.tsx << 'EOF'
import { AppRegistry } from 'react-native';
import App from './app/App';
import { name as appName } from '../app.json';

AppRegistry.registerComponent(appName, () => App);
EOF

# Script for generating new features
cat > scripts/generate-feature.js << 'EOF'
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const featureName = process.argv[2];

if (!featureName) {
  console.error('❌ Please provide a feature name');
  console.log('Usage: node scripts/generate-feature.js <featureName>');
  process.exit(1);
}

const featurePath = path.join(__dirname, '../src/features', featureName);
const directories = ['components', 'hooks', 'services', 'screens', 'redux', 'types', 'utils'];

console.log(`🚀 Generating feature: ${featureName}...`);

// Create directories
directories.forEach(dir => {
  fs.mkdirSync(path.join(featurePath, dir), { recursive: true });
});

// Create index.ts
const indexPath = path.join(featurePath, 'index.ts');
const indexContent = `// Export all public APIs for ${featureName} feature
export { default as ${featureName.charAt(0).toUpperCase() + featureName.slice(1)}Screen } from './screens/${featureName.charAt(0).toUpperCase() + featureName.slice(1)}Screen';
export { use${featureName.charAt(0).toUpperCase() + featureName.slice(1)} } from './hooks/use${featureName.charAt(0).toUpperCase() + featureName.slice(1)}';
export { default as ${featureName}Reducer } from './redux/${featureName}Slice';
export type { ${featureName.charAt(0).toUpperCase() + featureName.slice(1)}State } from './types/${featureName}.types';
`;

fs.writeFileSync(indexPath, indexContent);

// Create slice template
const slicePath = path.join(featurePath, `redux/${featureName}Slice.ts`);
const sliceContent = `import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ${featureName.charAt(0).toUpperCase() + featureName.slice(1)}State {
  data: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ${featureName.charAt(0).toUpperCase() + featureName.slice(1)}State = {
  data: [],
  isLoading: false,
  error: null,
};

const ${featureName}Slice = createSlice({
  name: '${featureName}',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setData, setError } = ${featureName}Slice.actions;
export default ${featureName}Slice.reducer;
`;

fs.writeFileSync(slicePath, sliceContent);

// Create hook template
const hookPath = path.join(featurePath, `hooks/use${featureName.charAt(0).toUpperCase() + featureName.slice(1)}.ts`);
const hookContent = `import { useSelector, useDispatch } from 'react-redux';
import { setLoading, setData, setError } from '../redux/${featureName}Slice';
import type { RootState } from '../../../app/store';

export const use${featureName.charAt(0).toUpperCase() + featureName.slice(1)} = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.${featureName}.data);
  const isLoading = useSelector((state: RootState) => state.${featureName}.isLoading);

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      // Add your API call here
      console.log('Fetching ${featureName} data...');
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    data,
    isLoading,
    fetchData,
  };
};
`;

fs.writeFileSync(hookPath, hookContent);

// Create screen template
const screenPath = path.join(featurePath, `screens/${featureName.charAt(0).toUpperCase() + featureName.slice(1)}Screen.tsx`);
const screenContent = `import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { use${featureName.charAt(0).toUpperCase() + featureName.slice(1)} } from '../hooks/use${featureName.charAt(0).toUpperCase() + featureName.slice(1)}';

const ${featureName.charAt(0).toUpperCase() + featureName.slice(1)}Screen = () => {
  const { data, isLoading, fetchData } = use${featureName.charAt(0).toUpperCase() + featureName.slice(1)}();

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>${featureName.charAt(0).toUpperCase() + featureName.slice(1)} Screen</Text>
      <Text>Data: {JSON.stringify(data)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ${featureName.charAt(0).toUpperCase() + featureName.slice(1)}Screen;
`;

fs.writeFileSync(screenPath, screenContent);

console.log(`✅ Feature '${featureName}' created successfully!`);
console.log(`📁 Location: src/features/${featureName}`);
EOF

# Make scripts executable
chmod +x scripts/generate-feature.js

echo -e "${GREEN}✅ All files created successfully!${NC}\n"

# Show summary
echo -e "${BLUE}📊 Structure Created:${NC}"
echo -e "${GREEN}✓ src/app/ - App bootstrap (4 files)${NC}"
echo -e "${GREEN}✓ src/features/ - 7 features ready${NC}"
echo -e "${GREEN}✓ src/shared/ - Shared components & utilities${NC}"
echo -e "${GREEN}✓ src/core/ - Core modules${NC}"
echo -e "${GREEN}✓ scripts/ - Automation scripts${NC}"
echo -e "${GREEN}✓ Total files created: $(find src -type f -name "*.ts" -o -name "*.tsx" 2>/dev/null | wc -l)${NC}"

echo -e "\n${BLUE}🎯 Next Steps:${NC}"
echo -e "1️⃣  Install dependencies:"
echo -e "   ${YELLOW}npm install @reduxjs/toolkit react-redux @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context${NC}"
echo -e "\n2️⃣  iOS only (run this):"
echo -e "   ${YELLOW}cd ios && pod install && cd ..${NC}"
echo -e "\n3️⃣  Generate a new feature:"
echo -e "   ${YELLOW}node scripts/generate-feature.js chat${NC}"
echo -e "\n4️⃣  Start the app:"
echo -e "   ${YELLOW}npx react-native start${NC}"
echo -e "   ${YELLOW}npx react-native run-android${NC}  # or run-ios"

echo -e "\n${GREEN}✅ Setup complete! Happy coding! 🚀${NC}"