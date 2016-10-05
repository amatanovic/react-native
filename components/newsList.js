import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  TouchableOpacity,
  ActivityIndicator,
  ListView,
  Image
} from 'react-native';

var navigator;
var url = 'https://api.myjson.com/bins/1nrbo';

export default class NewsList extends Component {

  constructor(props) {
   super(props);
   this.state = {
     dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      news:[],
      animating: true,
   };
 }

 componentDidMount(){
    this.fetchData(url);
}

handleErrorJson() {
  this.setState({
    news:[],
    animating: false,
  });
}

reload() {
  this.setState({
    animating: true,
  });
  this.fetchData(url);
}


fetchData(url){
  fetch(url)
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        else {
            return this.handleErrorJson();
        }
    })
    .then((responseData) => {
      if (responseData !== undefined) {
      var oldNewsArray = this.state.news;
      if (oldNewsArray.length > 0) {
        oldNews.pop();
      }
      var newNewsArray = [];

      responseData.forEach(value => {
        // some images have invalid path in feed, but image events like onLoad, onError etc. are not firing as I want to,
        // to populate data if image is not returned, so I'm not handeling that case for now
        if (value.image === "") {
          value.image = "http://s2.quickmeme.com/img/c5/c595586b491836bb2135fb603c2f4e5997ce0e2f8e41c30a81af650f568eaff8.jpg";
        }
        if (value.metaDescription === "" || value.headline === "" || value.author.username === "") {
          value.metaDescription = "Ooops, there is nothing here";
        }
        newNewsArray.push(value);
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newNewsArray),
        news:newNewsArray,
        animating: false,
      });
    }
    })
    .done();
}

	navigateToDetails(news) {
		this.props.navigator.push({
			id: 'newsDetails',
		});
    this.props.navigator.props.params.news = news;
	}

 renderListView(){
    return (
      <View style={styles.parentContainer}>
      <Toolbar />
      <View style={styles.listContainer}>
          <ListView dataSource={this.state.dataSource}
                  renderRow={this.renderNewsItem.bind(this)}
                  style={styles.listView}/>
        </View>
      </View>
    );
  }

  renderNewsItem(news){
      return (
        <TouchableOpacity onPress={() => this.navigateToDetails(news)}>
          <View style={styles.listItem}>
            <Image style={styles.listItem_image}
                   source={{uri:news.image}}
            />
            <View style={styles.listItem_rightContainer}>
              <Text style={styles.listItem_title} numberOfLines={3}>{news.headline}</Text>
              <Text style={styles.listItem_username} numberOfLines={1}>{news.author.username}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );

  }

  renderError() {
    return (
      <View style={styles.parentContainer}>
      <Toolbar />
      <View style={styles.container}>
  					<TouchableOpacity
  						style={styles.button}
  						onPress={() => {
  	            this.reload();
  	        	}
  	        }>
  	        	<Text style={styles.buttonText}>Try again!</Text>
  	        </TouchableOpacity>
  	      </View>
      </View>
    );

  }



	render () {
		navigator = this.props.navigator;
    if (this.state.animating) {
		return (
			<View style={styles.parentContainer}>
        <Toolbar />
        <View style={styles.container}>
          <ActivityIndicator
          animating={this.state.animating}
          size="large"
          color="#4883da"
        />
	      </View>

			</View>
		)}
    else if (!this.state.animating && this.state.news.length > 0) {
        return this.renderListView();
    }
    else if (!this.state.animating && this.state.news.length == 0) {
      return this.renderError();
    }
	}
}

class Toolbar extends Component {
  render() {
    return (
      <View style={styles.toolbar}>
          <Text style={styles.title}>NEWS</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
	parentContainer: {
		flex: 1
	},
	container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  toolbar: {
    justifyContent: 'center',
    alignItems: 'center',
  	height: 65
  },
  title: {
    fontSize: 20,
    color:'#262b31'
  },
  listContainer:{
  flex:1
},

listView:{
  marginTop:0,
  marginLeft:12,
  marginRight:12
},

listItem:{
  borderBottomWidth:1,
  borderBottomColor:'#efefef',
  flexDirection:'row',
  paddingTop:12,
  paddingBottom:12
},

listItem_image:{
  width:95,
  height:68
},
listItem_rightContainer:{
    flex:1,
    flexDirection:'column',
    marginLeft:12,
    height:68
  },

  listItem_title:{
    color:'#262b31',
    height:45,
    fontSize:13
  },

  listItem_username:{
    height:17,
    fontSize:13,
    color:'#9ca4ae'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    width: 200,
    backgroundColor: '#F44336',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});
