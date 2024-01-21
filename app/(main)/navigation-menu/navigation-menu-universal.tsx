import { useDrawerStatus } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '~/components/universal-ui/navigation-menu';
import { TextRef } from '~/lib/rn-primitives/types';
import { cn } from '~/lib/utils';

export default function MenubarPrimitiveScreen() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [value, setValue] = React.useState<string>();
  const navigation = useNavigation();
  const isDrawerOpen = useDrawerStatus() === 'open';

  function closeAll() {
    setValue('');
  }

  React.useEffect(() => {
    const sub = navigation.addListener('blur', () => {
      closeAll();
    });

    return sub;
  }, []);

  React.useEffect(() => {
    if (isDrawerOpen) {
      closeAll();
    }
  }, [isDrawerOpen]);

  return (
    <View className='flex-1  items-center px-6 py-3 gap-12'>
      {Platform.OS !== 'web' && !!value && (
        <Pressable
          onPress={() => {
            setValue('');
          }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <NavigationMenu value={value} onValueChange={setValue}>
        <NavigationMenuList>
          <NavigationMenuItem value='getting-started'>
            <NavigationMenuTrigger>
              <Text className='text-foreground'>Getting started</Text>
            </NavigationMenuTrigger>
            <NavigationMenuContent insets={contentInsets}>
              <View
                role='list'
                className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'
              >
                <View role='listitem' className='web:row-span-3'>
                  <NavigationMenuLink asChild>
                    <View className='flex select-none flex-col justify-end rounded-md web:bg-gradient-to-b web:from-muted/50 web:to-muted native:border native:border-border p-6 web:no-underline web:outline-none focus:shadow-md'>
                      <Sparkles size={16} className='text-foreground' />
                      <Text className='mb-2 mt-4 text-lg native:text-2xl font-medium text-foreground'>
                        react-native-reusables
                      </Text>
                      <Text className='text-sm native:text-base leading-tight text-muted-foreground'>
                        Universal components that you can copy and paste into
                        your apps. Accessible. Customizable. Open Source.
                      </Text>
                    </View>
                  </NavigationMenuLink>
                </View>
                <ListItem href='/docs' title='Introduction'>
                  <Text className='text-foreground'>
                    Re-usable components built using Radix UI on the web and
                    Tailwind CSS.
                  </Text>
                </ListItem>
                <ListItem href='/docs/installation' title='Installation'>
                  <Text className='text-foreground'>
                    How to install dependencies and structure your app.
                  </Text>
                </ListItem>
                <ListItem href='/docs/primitives/typography' title='Typography'>
                  <Text className='text-foreground'>
                    Styles for headings, paragraphs, lists...etc
                  </Text>
                </ListItem>
              </View>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value='components'>
            <NavigationMenuTrigger>
              <Text className='text-foreground '>Components</Text>
            </NavigationMenuTrigger>
            <NavigationMenuContent insets={contentInsets}>
              <View
                role='list'
                className='web:grid w-[400px] gap-3 p-4 md:w-[500px] web:md:grid-cols-2 lg:w-[600px] '
              >
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </View>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value='documentation'>
            <NavigationMenuLink
              onPress={closeAll}
              className={navigationMenuTriggerStyle()}
            >
              <Text className='text-foreground '>Documentation</Text>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </View>
  );
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/alert-dialog/alert-dialog-universal',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/hover-card/hover-card-universal',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/progress/progress-universal',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/scroll-area/scroll-area-universal',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/tabs/tabs-universal',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/tooltip/tooltip-universal',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

const ListItem = React.forwardRef<
  TextRef,
  React.ComponentPropsWithoutRef<typeof Text> & { title: string; href: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <View role='listitem'>
      <NavigationMenuLink
        ref={ref}
        className={cn(
          'block select-none gap-1 rounded-md p-3 leading-none no-underline text-foreground outline-none web:transition-colors hover:bg-accent active:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
        {...props}
      >
        <Text className='text-sm native:text-base font-medium text-foreground leading-none'>
          {title}
        </Text>
        <Text className='line-clamp-2 text-sm native:text-base leading-snug text-muted-foreground'>
          {children}
        </Text>
      </NavigationMenuLink>
    </View>
  );
});
ListItem.displayName = 'ListItem';