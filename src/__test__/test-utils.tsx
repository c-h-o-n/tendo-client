import { render } from '@testing-library/react-native';
import React, { ReactElement } from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      <NavigationContainer>{children}</NavigationContainer>
    </NativeBaseProvider>
  );
};

// wrap tests with necessery providers
const customRender = (ui: ReactElement, options?: Omit<any, 'wrapper'>) => render(ui, { wrapper, ...options });

export * from '@react-navigation/native';
export { customRender as render };
