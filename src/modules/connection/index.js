import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { BasicStyles, Color, Routes } from 'common'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Footer from 'modules/generic/Footer'
import CardList from 'modules/generic/CardList'
import Share from 'components/Share'
import Style from './Style'
import { connect } from 'react-redux';
import { Spinner, Empty } from 'components';
import Api from 'services/api/index.js';
import _ from 'lodash';

const navs = [
  { name: "Suggestions", flag: true },
  { name: "Connections", flag: false },
  { name: "Sent Requests", flag: false }
]

class Connections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevActive: 0,
      currActive: 0,
      search: null,
      isShow: false,
      data: [],
      limit: 6,
      offset: 0,
      isLoading: false,
      pending: [],
      suggestions: [],
      connections: [],
      sentRequests: []
    }
  }

  componentDidMount() {
    this.retrieveRandomUsers(false);
    this.retrieveConnections(false);
    this.retrieveSuggestions(false);
    this.retrieveSentRequests(false);
  }

  refresh = () => {
    this.retrieveRandomUsers(false);
    this.retrieveConnections(false);
    this.retrieveSuggestions(false);
    this.retrieveSentRequests(false);
  }

  retrieveConnections(flag) {
    const { user } = this.props.state
    let parameter = {
      condition: [{
        value: user.id,
        column: 'account_id',
        clause: '='
      }, {
        value: user.id,
        column: 'account',
        clause: 'or'
      }, {
        clause: "=",
        column: "status",
        value: 'accepted'
      }],
      offset: flag == true && this.state.offset > 0 ? (this.state.offset * this.state.limit) : this.state.offset,
      limit: this.state.limit
    }
    this.setState({ isLoading: true })
    Api.request(Routes.circleRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      if (response.data.length > 0) {
        this.setState({
          connections: flag == false ? response.data : _.uniqBy([...this.state.connections, ...response.data], 'id'),
          offset: flag == false ? 1 : (this.state.offset + 1)
        })
      } else {
        this.setState({
          connections: flag == false ? [] : this.state.connections,
          offset: flag == false ? 0 : this.state.offset
        })
      }
    });
  }

  retrieveSentRequests(flag) {
    const { user } = this.props.state
    let parameter = {
      condition: [{
        value: user.id,
        column: 'account_id',
        clause: '='
      }, {
        value: user.id,
        column: 'account_id',
        clause: '='
      }, {
        clause: "=",
        column: "status",
        value: 'pending'
      }],
      offset: flag == true && this.state.offset > 0 ? (this.state.offset * this.state.limit) : this.state.offset,
      limit: this.state.limit
    }
    this.setState({ isLoading: true })
    Api.request(Routes.circleRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      if (response.data.length > 0) {
        this.setState({
          sentRequests: flag == false ? response.data : _.uniqBy([...this.state.sentRequests, ...response.data], 'id'),
          offset: flag == false ? 1 : (this.state.offset + 1)
        })
      } else {
        this.setState({
          sentRequests: flag == false ? [] : this.state.sentRequests,
          offset: flag == false ? 0 : this.state.offset
        })
      }
    });
  }

  retrieveSuggestions(flag) {
    const { user } = this.props.state
    let parameter = {
      condition: [{
        value: user.id,
        column: 'account',
        clause: '='
      }, {
        value: user.id,
        column: 'account',
        clause: '='
      }, {
        clause: "=",
        column: "status",
        value: 'pending'
      }],
      offset: flag == true && this.state.offset > 0 ? (this.state.offset * this.state.limit) : this.state.offset,
      limit: this.state.limit
    }
    this.setState({ isLoading: true })
    Api.request(Routes.circleRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      if (response.data.length > 0) {
        this.setState({
          pending: flag == false ? response.data : _.uniqBy([...this.state.connections, ...response.data], 'id'),
          offset: flag == false ? 1 : (this.state.offset + 1)
        })
      } else {
        this.setState({
          pending: flag == false ? [] : this.state.connections,
          offset: flag == false ? 0 : this.state.offset
        })
      }
    });
  }

  retrieveRandomUsers = (flag) => {
    const { user } = this.props.state;
    let parameter = {
      account_id: user.id,
      offset: flag == true && this.state.offset > 0 ? (this.state.offset * this.state.limit) : this.state.offset,
      limit: this.state.limit
    }
    this.setState({ isLoading: true })
    Api.request(Routes.otherAccountsRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      if (response.data.length > 0) {
        this.setState({
          suggestions: flag == false ? response.data : _.uniqBy([...this.state.suggestions, ...response.data], 'id'),
          offset: flag == false ? 1 : (this.state.offset + 1)
        })
      } else {
        this.setState({
          suggestions: flag == false ? [] : this.state.suggestions,
          offset: flag == false ? 0 : this.state.offset
        })
      }
    });
  }

  async changeTab(idx) {
    if (this.state.prevActive != idx) {
      await this.setState({ currActive: idx })
      navs[this.state.prevActive].flag = false
      navs[idx].flag = true
      await this.setState({ prevActive: idx })
    }
    // this.setState({connections: []})
    // this.retrieve(false)
  }

  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <ScrollView style={{
          backgroundColor: Color.containerBackground,
          marginBottom: 50
        }}
          showsVerticalScrollIndicator={false}
          onScroll={(event) => {
            let scrollingHeight = event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y
            let totalHeight = event.nativeEvent.contentSize.height
            if (event.nativeEvent.contentOffset.y <= 0) {
              if (this.state.isLoading == false) {
                // this.retrieve(false)
              }
            }
            if (Math.round(scrollingHeight) >= Math.round(totalHeight)) {
              if (this.state.isLoading === false) {
                this.retrieveRandomUsers(true)
              }
            }
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.3, paddingBottom: 20, borderColor: Color.gray, marginTop: '7%' }}>
            {
              navs.map((el, idx) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.changeTab(idx)}
                    style={{
                      ...Style.standardButton,
                      backgroundColor: el.flag == true ? Color.primary : '#BDBDBD',
                      marginLeft: 5
                    }}
                  >
                    <Text style={{ color: 'white' }}>{el.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
          {
            this.state.currActive == 0 ? (
              <View>
                <CardList level={2} retrieve={() => { this.refresh() }} status={'pending'} navigation={this.props.navigation} data={this.state.pending.length > 0 && this.state.pending} hasAction={true} actionType={'text'}></CardList>
                <View style={{ marginTop: 50, paddingLeft: 30, borderTopWidth: 0.3, paddingTop: 20, borderColor: Color.gray }}>
                  <Text style={{ fontWeight: 'bold' }}>Connections you may know</Text>
                </View>

                <View>
                  <CardList level={2} invite={false} retrieve={() => { this.refresh() }} navigation={this.props.navigation} data={this.state.suggestions.length > 0 && this.state.suggestions} hasAction={false} actionType={'button'} actionContent={'text'}></CardList>
                  {this.state.suggestions.length == 0 && (<Empty refresh={true} onRefresh={() => this.refresh()} />)}
                </View>

              </View>
            ) : (
              <View>
                {this.state.currActive == 1 ? (
                  <View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                      <View style={Style.TextContainer}>
                        <TextInput
                          style={[BasicStyles.formControl, { backgroundColor: '#e8e8e8' }]}
                          onChangeText={(search) => this.setState({ search: search })}
                          value={this.state.search}
                          placeholder={'Search'}
                        />
                      </View>
                      <View>
                        <CardList level={1} search={this.state.search} retrieve={() => { this.refresh() }} navigation={this.props.navigation} data={this.state.connections.length > 0 && this.state.connections} hasAction={false} actionType={'button'} actionContent={'icon'} ></CardList>
                      </View>
                    </View>
                    {this.state.connections.length == 0 && (<Empty refresh={true} onRefresh={() => this.refresh()} />)}
                  </View>)
                  : <View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                      <View>
                        <CardList level={2} search={this.state.search} retrieve={() => { this.refresh() }} navigation={this.props.navigation} data={this.state.sentRequests.length > 0 && this.state.sentRequests} hasAction={false} actionType={'button'} actionContent={'icon'} ></CardList>
                      </View>
                    </View>
                    {this.state.sentRequests.length == 0 && (<Empty refresh={true} onRefresh={() => this.refresh()} />)}
                  </View>}
              </View>
            )
          }
        </ScrollView>
        {this.state.isLoading ? <Spinner mode="overlay" /> : null}
        <Footer layer={1} {...this.props} />
      </View>
    );
  }
}
const mapStateToProps = state => ({ state: state });

const mapDispatchToProps = dispatch => {
  const { actions } = require('@redux');
  return {
    viewMenu: (isViewing) => dispatch(actions.viewMenu(isViewing))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps)(Connections);
