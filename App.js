/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Modal,
  Pressable,
  Image,
} from 'react-native';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      modalVisible: false,
      // setting minutes and timer in countdown
      timer: 5,
      minutes: 2,
      interval: '',
      timeout: '',
      interval : '',
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
    this.CounterInterval()
  
  }

  setModalClose = () => {
    this.setState({ modalVisible: false, timer: 5 , minutes : 2 });
    this.clearTime()
  }

  tick = () => {
    this.state.inverval = setInterval(
      () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
      1000,
    );
    this;
  };

  clearTime = () => {
    clearInterval( this.interval);
  }

  CounterInterval = () => {
      this.interval = setInterval(() => 
      this.setState((prevState) => ({ timer: prevState.timer - 1 }), () => {
          if (this.state.timer === -1 && this.state.minutes > 0) {
            this.setState({timer: 5 , minutes : this.state.minutes - 1});
          } else if(this.state.timer === 0 && this.state.minutes  == 0 ) {
            this.clearTime()
          }
        }),
        1000
      );
  }

  refreshQrCode = () => {
    this.setState({ timer: 5 , minutes : 2 })
    this.CounterInterval();
  }

  render() {
    const { modalVisible ,timer, minutes} = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {minutes == 0 && timer == 0 ? (
                <Text style={styles.modalText}>Please update your QR code </Text>
              ) : (
                <Text style={styles.modalText}>QR Code will end in  <Text style={{ color: "#002f5f" }}>{minutes}:{timer}</Text> </Text>
              )
              }
              {minutes == 0 && timer == 0 ? (
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.refreshQrCode()}
                  >
                    <Text style={styles.textStyle}>Update QR CODE</Text>

                  </Pressable>
                </View>
              ) : (
                <Image
                  style={styles.imageQR}
                  source={require('./assets/qrcode.png')}
                />
              )
              }
              <View style={{ marginTop: 20 }}></View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalClose()}
              >
                <Text style={styles.textStyle}>Exit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible()}
        >
          <Text style={styles.textStyle}>Show QR CODE</Text>
        </Pressable>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    height: 280,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  imageQR:{
    width: 200,
    height: 140,
    alignSelf: 'center',
    resizeMode: 'contain'
  }
});
