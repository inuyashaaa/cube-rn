import React from "react";
import {
  StatusBar,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import CubeNavigationHorizontal from "./CubeHorizontal";

const { width, height } = Dimensions.get("window");

export default class CubeHorizontal extends React.Component {
  constructor(props) {
    super(props);

    this.animatedScale = new Animated.Value(0.8)
  }

  goToNext = (index = 1) => {
    this.cube.scrollTo(index);
    Animated.timing(this.animatedScale, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true
    }).start()
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={[{
          transform: [{
            scale: this.animatedScale
          },]
        }]}>
          <CubeNavigationHorizontal
            ref={view => {
              this.cube = view;
            }}
            style={{ flex:1, backgroundColor: 'red' }}
          >
            <View style={[styles.container]}>
              <Image source={require("./assets/02.png")} style={styles.image} />
              <Text style={[styles.text, { color: "#fff", paddingBottom: 20 }]}>Screen A</Text>
              <TouchableOpacity onPress={() => this.goToNext(1)}>
                <View
                  style={{
                    width: width - width / 2.5,
                    paddingTop: 15,
                    paddingBottom: 15,
                    marginBottom: 30,
                    borderWidth: 2,
                    borderColor: "#fff",
                    borderRadius: 100
                  }}
                >
                  <Text
                    style={[
                      styles.text,
                      { fontSize: 18, textAlign: "center", color: "#fff" }
                    ]}
                  >
                    Go to B
                </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={[styles.container]}>
              <Image source={require("./assets/01.png")} style={styles.image} />
              <Text style={[styles.text, { paddingBottom: 80 }]}>Screen B</Text>
              <TouchableOpacity onPress={() => this.goToNext(0)}>
                <View
                  style={{
                    width: width - width / 2.5,
                    paddingTop: 15,
                    paddingBottom: 15,
                    marginBottom: 30,
                    borderWidth: 2,
                    borderColor: "#fff",
                    borderRadius: 100
                  }}
                >
                  <Text
                    style={[
                      styles.text,
                      { fontSize: 18, textAlign: "center", color: "#fff" }
                    ]}
                  >
                    Go to A
                </Text>
                </View>
              </TouchableOpacity>
            </View>
          </CubeNavigationHorizontal>
        </Animated.View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  father: {

  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#3a405a",
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "transparent"
  },
  image: {
    position: "absolute",
    top: 0,
    height: height,
    width: width
  },
});
