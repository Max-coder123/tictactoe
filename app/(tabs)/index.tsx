import { Image } from "expo-image";
import { Button, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";

export default function HomeScreen() {
  const [board, setBoard] = useState(
    [...Array(3)].map(() => [...Array(3)].map(() => " "))
  );
  const [turn, setTurn] = useState(
    "X"
  )
  const handleClick = (i: number, j: number) => {
    setBoard((prev) => {
      prev = prev.map((row) => [...row]);
      
      prev[i][j] = turn;
      return prev;
    });
    setTurn((prev) => {
      return prev==="X"? "O":"X"
    })
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      {board.map((row, i) => (
        <ThemedView style={styles.titleContainer}>
          {row.map((cell, j) => (
            <Button
              title={cell}
              key={i}
              onPress={() => {
                handleClick(i, j);
              }}
            />
          ))}
        </ThemedView>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
