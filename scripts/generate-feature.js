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
