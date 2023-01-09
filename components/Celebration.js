import React, { useState, useEffect } from "react";
import { Animated, LayoutAnimation, Text, View } from "react-native";

const FALL_DURATION = 1000; // duration of the fall animation in milliseconds

export default function Celebration() {
  const position = new Animated.Value(0); // track the position of each emoji

  // update the position of the emojis over time
  useEffect(() => {
    function updatePosition() {
      // decrease the position of the emojis by a small amount each frame
      position.setValue(position._value - 0.1);

      // if the emojis have reached the bottom of the screen, reset their position to the top
      if (position._value <= -100) {
        position.setValue(0);
      }

      // schedule the next frame
      requestAnimationFrame(updatePosition);
    }

    updatePosition();
  }, []);

  // use LayoutAnimation to smoothly transition the position of the emojis
  LayoutAnimation.configureNext({
    duration: FALL_DURATION,
    update: {
      type: LayoutAnimation.Types.easeInOut,
    },
  });

  //   return (
  //     <View style={{ backgroundColor: "transparent" }}>
  //       {/* render 10 emojis that fall from the top of the screen to the bottom */}
  //       {[...Array(10)].map((_, i) => (
  //         <Animated.Text
  //           key={i}
  //           style={{
  //             position: "absolute",
  //             top: position,
  //             left: i * 25, // spread the emojis out horizontally
  //           }}
  //         >
  //           🎉
  //         </Animated.Text>
  //       ))}
  //     </View>
  //   );
}
