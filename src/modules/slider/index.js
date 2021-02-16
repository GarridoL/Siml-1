
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Style';
import {NavigationActions, StackActions} from 'react-navigation';
import {ScrollView, Text, View, Image} from 'react-native';
import { connect } from 'react-redux';
import { Helper, BasicStyles, Color } from 'common';
import Config from 'src/config.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

class Slider extends Component {
  constructor(props){
    super(props);
  }
  navigateToScreen = (route) => {
    if(route == 'share'){
      return
    }
    this.props.navigation.toggleDrawer();
    const navigateAction = NavigationActions.navigate({
      routeName: 'drawerStack',
      action: StackActions.reset({
        index: 0,
        key: null,
        actions: [
            NavigationActions.navigate({routeName: route, params: {
              initialRouteName: route,
              index: 0
            }}),
        ]
      })
    });
    this.props.navigation.dispatch(navigateAction);
  }

  logoutAction(){
    
    //clear storage
    const { logout, setActiveRoute } = this.props;
    logout();
    // setActiveRoute(null)
    this.props.navigation.navigate('loginStack');
  }

  render () {
    const { user, theme } = this.props.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            {user != null ? (
                <View style={[styles.sectionHeadingStyle, {
                  backgroundColor: theme ? theme.primary : Color.primary
                }]}>
                  {
                    user.account_profile != null && user.account_profile.url != null && (
                      <Image
                        source={{uri: Config.BACKEND_URL  + user.account_profile.url}}
                        style={[BasicStyles.profileImageSize, {
                          height: 100,
                          width: 100,
                          borderRadius: 50
                        }]}/>
                    )
                  }

                  {
                    (user.account_profile == null || (user.account_profile != null && user.account_profile.url == null)) && (
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        size={100}
                        style={{
                          color: Color.white
                        }}
                      />
                    )
                  }
            
                </View>
              ) : <Text style={[styles.sectionHeadingStyle, {
              paddingTop: 150,
              backgroundColor: theme ? theme.primary : Color.primary
            }]}>
              Welcome to {Helper.company}!
            </Text>}
            {Helper.DrawerMenu.length > 0 &&
              Helper.DrawerMenu.map((item, index) => {
                return(
                <View style={[styles.navSectionStyle, {
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: item.borderBottom == true ? 1 : 0
                }]} key={index}>
                  <FontAwesomeIcon icon={item.icon} style={[item.iconStyle, {
                    color: theme ? theme.primary : Color.primary,
                    marginLeft: 10
                  }]}/>
                  <Text style={styles.navItemStyle} onPress={() => this.navigateToScreen(item.route)}>
                    {item.title}
                  </Text>
                </View>)
              })
            }
            <View style={[styles.navSectionStyle, {
              borderBottomWidth: 0
            }]}>
              <Text style={[styles.navItemStyle, {
                color: Color.danger,
                fontWeight: 'bold'
              }]} onPress={() => this.logoutAction()}>
                Logout
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

Slider.propTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    logout: () => dispatch(actions.logout()),
    setActiveRoute: (route) => dispatch(actions.setActiveRoute(route))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider);
