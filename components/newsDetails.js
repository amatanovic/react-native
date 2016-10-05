import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';

var navigator;

export default class NewsDetails extends Component {


	render () {
		navigator = this.props.navigator;
    var _data = navigator.props.params.news;
		return (
			<View style={styles.parentContainer}>
        <Image  style={{
              width: Dimensions.get('window').width,
              height: 240 }}
               source={{uri: _data.image}}
                resizeMode={'cover'}>
                <TouchableOpacity onPress={() => this.props.navigator.pop()}  style={styles.backButton}>
                <Image
                source={require('../images/back-arrow.png')} />
                </TouchableOpacity>
        </Image>
        <ScrollView>
				<View style={styles.container}>

        <View style={styles.detailHeader}>
          <Text style={styles.title}>{_data.headline}</Text>
          <Text style={styles.username} numberOfLines={1}>{_data.author.username}</Text>
        </View>
        <View style={styles.detailContent}>
            <Text style={styles.detailDescription}>{_data.metaDescription}</Text>
        </View>
	      </View>
        </ScrollView>
			</View>

		)
	}
}

var styles = StyleSheet.create({
	parentContainer: {
		flex: 1,
    backgroundColor: '#FFFFFF'
	},
	container: {
    flex: 1
  },
  detailHeader: {
    paddingLeft: 25,
    paddingRight: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailContent: {
    paddingLeft: 10,
    paddingRight: 10
  },
  detailDescription: {
    paddingTop: 25
  },
  title: {
    paddingTop: 15,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 22,
    color:'#262b31'
  },
  username: {
    fontSize: 12
  },
  backButton: {
    position: 'absolute',
    marginTop: 15,
    marginLeft: 15
  }
});
