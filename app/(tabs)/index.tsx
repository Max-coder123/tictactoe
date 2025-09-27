import { Image } from "expo-image";
import { Button, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  const [board, setBoard] = useState(
    [...Array(3)].map(() => [...Array(3)].map(() => " "))
  );
  const [turn, setTurn] = useState(
    "X"
  )
  const handleClick = (i: number, j: number) => {
    const boardCopy = board.map((row) => [...row]);
    boardCopy[i][j] = turn;
    setBoard(boardCopy)
    setTurn((prev) => {
      return prev==="X"? "O":"X"
    })
    console.log("isDraw: ", isDraw(boardCopy))
    console.log("isWin: ", isWin(boardCopy))

  };

  const isWin = (board: string[][]) => {
    // checkrows
    for (const row of board) {
      const allSame = row.every(e => e !== " " && e === row[0])
      if (allSame) {
        return true
      }
    }

    // checkcolumns
    for (let i=0; i < board.length; i++) {
      let sameChars = true
      for (let j=0; j < board[i].length - 1; j++) {
        if ((board[j][i] !== board[j+1][i] || board[j][i] === " ")) {
          sameChars = false
        }
      }
      if (sameChars === true) {
        return true
      }
    }

    // check diagonal1
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== " ") {
      return true
    }

    //check diagonal2
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[1][1] !== " ") {
      return true
    }

    return false
  }

  const isFull = (board: string[][]) => {
    for (const row of board) {
      const allFull = row.every(e => e !== " ")
      if (!allFull) {
        return false
      }
    }
    return true
  }

  const isDraw = (board: string[][]) => !isWin(board) && isFull(board)


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
        <ThemedView style={styles.titleContainer} key={i}>
          {row.map((cell, j) => (
            <ThemedText style = {styles.cell}><Button
              disabled={cell==="X" || cell==="O" || isWin(board)}
              
              title={cell === " "?"_":cell}
              
              onPress={() => {
                handleClick(i, j);
              }}
            /></ThemedText>

          ))}
          
        </ThemedView>
      ))}
      <ThemedView>
        {(isWin(board)) ? "game won" : isDraw(board) ? "draw" : ""}
      </ThemedView>
      <Button 
      title={"play again"} 
      onPress={() => {
        setBoard([...Array(3)].map(() => [...Array(3)].map(() => " ")))
        setTurn("X")
      }}
      />

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
  cell: {
    height: 30,
    width: 30,
    fontFamily: "monospace"
  }
});
