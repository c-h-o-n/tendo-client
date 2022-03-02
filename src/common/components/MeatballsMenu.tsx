import { FontAwesome5 } from '@expo/vector-icons';
import { Icon, Menu, Pressable } from 'native-base';

export function MeatballsMenu({ children }: any) {
  return (
    <Menu
      trigger={(triggerProps) => {
        return (
          <Pressable position="absolute" right={3} zIndex={1} {...triggerProps}>
            <Icon as={FontAwesome5} name="ellipsis-h" size={7} />
          </Pressable>
        );
      }}
    >
      {children}
    </Menu>
  );
}
