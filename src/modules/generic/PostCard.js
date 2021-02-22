import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions, Text, TextInput } from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faTimes, faStar, faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import { BasicStyles, Color } from 'common';
import { connect } from 'react-redux';
const height = Math.round(Dimensions.get('window').height);
import UserImage from 'components/User/Image';

class PostCard extends Component{
  constructor(props){
    super(props);
  }


  renderHeader = (data) => {
    return(
      <View style={{
          ...BasicStyles.standardWidth,
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <UserImage user={data.user} size={30}/>
        <View style={{
          paddingLeft: 5,
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '90%',
          alignItems: 'center'
        }}>
          <View>
            <Text style={{
              fontSize: BasicStyles.standardTitleFontSize,
              fontWeight: 'bold'
            }}>{data.user.username}</Text>
            <Text style={{
              fontSize: BasicStyles.standardFontSize
            }}>
              {data.date}
            </Text>
          </View>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faEllipsisH} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderBody = (data) => {
    return(
      <View style={{
          ...BasicStyles.standardWidth,
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 20,
          paddingBottom: 20,
        }}>
          <Text style={{
            fontSize: BasicStyles.standardFontSize
          }}>{data.message}</Text>
        
      </View>
    )
  }

  renderActions = (data) => {
    return(
      <View style={{
          ...BasicStyles.standardWidth,
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 20,
          flexDirection: 'row'
        }}>
          <TouchableOpacity style={{
            width: 70,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            borderColor: data.like_status == true ? Color.primary : Color.lightGray,
            borderWidth: 1,
            height: 40,
            marginRight: 5,
            backgroundColor: data.like_status == true ? Color.primary : Color.white
          }}
            onPress={() => this.props.onLike({
              ...data,
              like_status: !data.like_status
            })}
          >
            <Text style={{
              color: data.like_status == true ? Color.white : Color.black
            }}>{data.like_status == true ? 'Liked' : 'Like'}</Text>
          </TouchableOpacity>


          <TouchableOpacity style={{
            width: 70,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            borderColor: data.joined_status == true ? Color.primary : Color.lightGray,
            borderWidth: 1,
            height: 40,
            marginRight: 5,
            backgroundColor: data.joined_status == true ? Color.primary : Color.white
          }}
          onPress={() => this.props.onJoin({
            ...data,
            joined_status: !data.joined_status
          })}>
            <Text style={{
              color: data.joined_status == true ? Color.white : Color.black
            }}>{data.joined_status == true ? 'Joined' : 'Join'}</Text>
          </TouchableOpacity>

          <Text>24 joined</Text>
      </View>
    )
  }


  renderComments = (comments) => {
    const { user } = this.props.state;
    return(
      <View style={{
          width: '100%',
          alignItems: 'center',
          borderTopColor: Color.lightGray,
          borderTopWidth: 1
        }}>
          {
            (comments && comments.length > 0) && comments.map((item, index) => (
              <View style={{
                ...BasicStyles.standardWidth
              }}>
                {this.renderHeader(item)}
                {this.renderBody(item)}
              </View>
            ))
          }

          {
            user && (
              <View style={{
                width: '90%',
                borderTopWidth: comments.length == 0 ? 0 : 1,
                borderTopColor: Color.lightGray,
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: '5%',
                marginRight: '5%'
              }}>
                <UserImage user={user} size={30}/>
                <TextInput style={{
                  width: '100%',
                  height: 50
                }}
                placeholder={'Type reply here'}
                />
              </View>
            )
          }
      </View>
    )
  }


  render() {
    const { data } = this.props;
    return (
			<View style={{
        ...BasicStyles.standardWidth,
        borderRadius: BasicStyles.standardBorderRadius,
        borderColor: Color.lightGray,
        borderWidth: 1,
        marginBottom: 20
      }}>
        {this.renderHeader(data)}
        {this.renderBody(data)}
        {this.renderActions(data)}
        {this.renderComments(data.comments)}
			</View>
    )
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostCard);
