import React from "react";
import {
  StatusBar,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import CubeNavigationHorizontal from "./CubeHorizontal";

const { width, height } = Dimensions.get("window");

export default class CubeHorizontal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      move: new Animated.Value(600)
    };
  }

  goToNext = (index = 1) => {
    this.cube.scrollTo(index);
  };

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 100 }}>
      <View style={styles.father}>
        <CubeNavigationHorizontal
          ref={view => {
            this.cube = view;
          }}
        >
          <View style={[styles.container, { backgroundColor: "#A3F989" }]}>
            <Image source={require("./assets/02.png")} style={styles.image} />
            <Text style={[styles.text, { color: "#fff", paddingBottom: 20 }]}>
              Screen A
            </Text>
            <TouchableWithoutFeedback onPress={() => this.goToNext(1)}>
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
            </TouchableWithoutFeedback>
          </View>

          <View style={[styles.container, { backgroundColor: "#CBF941" }]}>
            <Image source={require("./assets/01.png")} style={styles.image} />
            <Text style={[styles.text, { paddingBottom: 80 }]}>
              Screen B
            </Text>
            <TouchableWithoutFeedback onPress={() => this.goToNext(0)}>
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
            </TouchableWithoutFeedback>
          </View>
        </CubeNavigationHorizontal>
      </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  father: {
    transform: [ { 
      scale: 0.8
    }]
  },
  container: {
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
