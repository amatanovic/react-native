/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  BackAndroid
} from 'react-native';

import NewsList from './components/newsList';
import NewsDetails from './components/newsDetails';

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});


class ShoutemReact extends Component {

    _renderScene (route, navigator) {
      _navigator = navigator;
      switch (route.id) {
        case 'newsList':
          return (
            <NewsList navigator={navigator}/>
          )
        case 'newsDetails':
          return (
            <NewsDetails navigator={navigator} />
          )
      }
    }

    render() {
      return (
        <Navigator
          initialRoute={{ id: 'newsList' }}
          params={{news: {}}}
          renderScene={(route, navigator) => this._renderScene(route, navigator)}
        />
      );
    }

}

AppRegistry.registerComponent('ShoutemReact', () => ShoutemReact);
