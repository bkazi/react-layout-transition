# react-layout-transition
Trying to make layout transitions simple

This project aims to provide React components that can :sparkles:_automagically_:sparkles: animate between changes in your layout.
Inspired by existing solutions on native platforms, it hopes to bring similar functionality and ease to the web.

These are some great pieces with example code on how to use the native platform feature
- [React Native’s LayoutAnimation is Awesome](https://medium.com/@Jpoliachik/react-native-s-layoutanimation-is-awesome-4a4d317afd3e) - Justin Poliachik (Medium)
- [Animate all the Things. Transitions in Android](https://medium.com/@andkulikov/animate-all-the-things-transitions-in-android-914af5477d50) - Andrey Kulikov (Medium)

**Note:** This is a very early implementation so do expect loads of bugs and missing features (but also be sure to report them)

## SharedElementTransitionGroup

A container around the views to transition between that animates shared elements, between their initial and final position.
It classifies elements as shared if you mark them with the same id in both the intial and final layout component and does the rest for you.

Check out the following demo at [https://react-layout-transition.surge.sh/](https://react-layout-transition.surge.sh)

![SharedElementDemo](assets/demoGifs/sharedElementDemo.gif)

## LayoutTransitionGroup

A component that animates state based changes in layout in certain parts of your view.
Currently this is only tested on adding elements as displayed by the GIF below

![LayoutTransitionDemo](assets/demoGifs/layoutTransitionDemo.gif)

You can find the code for the above demos in the example directory

## Usage

`npm install --save react-layout-transition`

This currently requires babel transpilation as the library does not ship any processed code for now

Please do report any bugs you encounter and point to me any examples and use cases that could be used to improve this

If you like the direction the project is headed in and want to help please do reach out!
