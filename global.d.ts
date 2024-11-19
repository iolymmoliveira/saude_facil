declare module 'react-native-vector-icons/MaterialIcons' {
    import { IconProps } from 'react-native-vector-icons/Icon';
    import React from 'react';
    import { TextStyle, ViewStyle } from 'react-native';
  
    export interface MaterialIconsProps extends IconProps {
      name: string;
      size?: number;
      color?: string;
      style?: TextStyle | ViewStyle;
    }
  
    const MaterialIcons: React.FC<MaterialIconsProps>;
    export default MaterialIcons;
  }
  