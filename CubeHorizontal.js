import React from "react";
import PropTypes from "prop-types";
import {
  PanResponder,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  View,
  Text,
  Platform
} from "react-native";
const { width, height } = Dimensions.get("window");

const PESPECTIVE = Platform.OS === "ios" ? 2.38 : 1.7;
const TR_POSITION = Platform.OS === "ios" ? 2 : 1.5;

export default class CubeNavigationHorizontal extends React.Component {
  constructor(props) {
    super(props);

    this.pages = this.props.children.map((child, index) => width * -index);
  }

  componentWillMount() {
    this._animatedValue = new Animated.ValueXY();
    this._animatedValue.setValue({ x: 0, y: 0 });
  }

  scrollTo(page = 1, animated) {
    animated = animated == undefined ? true : animated;

    if (animated) {
      Animated.timing(this._animatedValue, {
        toValue: { x: this.pages[page], y: 0 },
        duration: 1200
      }).start();
    } else {
      this._animatedValue.setValue({ x: this.pages[page], y: 0 });
    }
  }

  _getTransformsFor = i => {
    let scrollX = this._animatedValue.x;
    let pageX = -width * i;

    let translateX = scrollX.interpolate({
      inputRange: [pageX - width, pageX, pageX + width],
      outputRange: [(-width - 1) / TR_POSITION, 0, (width + 1) / TR_POSITION],
      extrapolate: "clamp"
    });

    let rotateY = scrollX.interpolate({
      inputRange: [pageX - width, pageX, pageX + width],
      outputRange: ["-60deg", "0deg", "60deg"],
      extrapolate: "clamp"
    });

    let translateXAfterRotate = scrollX.interpolate({
      inputRange: [pageX - width, pageX, pageX + width],
      inputRange: [
        pageX - width,
        pageX - width + 0.1,
        pageX,
        pageX + width - 0.1,
        pageX + width
      ],
      outputRange: [
        -width - 1,
        (-width - 1) / PESPECTIVE,
        0,
        (width + 1) / PESPECTIVE,
        +width + 1
      ],
      extrapolate: "clamp"
    });

    let opacity = scrollX.interpolate({
      inputRange: [
        pageX - width,
        pageX - width + 10,
        pageX,
        pageX + width - 250,
        pageX + width
      ],
      outputRange: [0, 0.6, 1, 0.6, 0],
      extrapolate: "clamp"
    });

    return {
      transform: [
        { perspective: width },
        { translateX },
        { rotateY: rotateY },
        { translateX: translateXAfterRotate }
      ],
      opacity: opacity
    };
  };

  _renderChild = (child, i) => {
    let expandStyle = this.props.expandView
      ? { paddingTop: 100, paddingBottom: 100, height: height + 200 }
      : { width, height };
    let style = [child.props.style, expandStyle];
    let props = {
      i,
      style
    };
    let element = React.cloneElement(child, props);

    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "transparent" },
          this._getTransformsFor(i, false)
        ]}
        key={`child- ${i}`}
      >
        {element}
      </Animated.View>
    );
  };

  render() {
    return (
      <Animated.View
        style={[{ position: "absolute" }]}
      >
        <Animated.View
          style={[
            { backgroundColor: "transparent", position: "absolute", width, height },
          ]}
        >
          {this.props.children.map(this._renderChild)}
        </Animated.View>
      </Animated.View>
    );
  }
}
