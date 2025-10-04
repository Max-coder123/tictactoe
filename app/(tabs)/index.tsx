import { Image } from "expo-image";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";

export default function HomeScreen() {
  const [board, setBoard] = useState(
    [...Array(3)].map(() => [...Array(3)].map(() => " "))
  );
  const [turn, setTurn] = useState("X");

  // Calculate responsive font size
  const getFontSize = () => {
    const screenWidth = Dimensions.get("window").width;
    return Math.min(screenWidth * 0.12, 60);
  };
  const handleClick = (i: number, j: number) => {
    const boardCopy = board.map((row) => [...row]);
    boardCopy[i][j] = turn;
    setBoard(boardCopy);
    setTurn((prev) => {
      return prev === "X" ? "O" : "X";
    });
  };

  const isWin = (board: string[][]) => {
    // checkrows
    for (const row of board) {
      const allSame = row.every((e) => e !== " " && e === row[0]);
      if (allSame) {
        return true;
      }
    }

    // checkcolumns
    for (let i = 0; i < board.length; i++) {
      let sameChars = true;
      for (let j = 0; j < board[i].length - 1; j++) {
        if (board[j][i] !== board[j + 1][i] || board[j][i] === " ") {
          sameChars = false;
        }
      }
      if (sameChars === true) {
        return true;
      }
    }

    // check diagonal1
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== " "
    ) {
      return true;
    }

    //check diagonal2
    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[1][1] !== " "
    ) {
      return true;
    }

    return false;
  };

  const isFull = (board: string[][]) => {
    for (const row of board) {
      const allFull = row.every((e) => e !== " ");
      if (!allFull) {
        return false;
      }
    }
    return true;
  };

  const isDraw = (board: string[][]) => !isWin(board) && isFull(board);

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
      <ThemedView style={styles.boardContainer}>
        {board.map((row, i) => (
          <ThemedView style={styles.titleContainer} key={i}>
            {row.map((cell, j) => (
              <TouchableOpacity
                disabled={cell === "X" || cell === "O" || isWin(board)}
                style={styles.cell}
                onPress={() => {
                  handleClick(i, j);
                }}
                key={j}
              >
                <ThemedText
                  style={[styles.cellText, { fontSize: getFontSize() }]}
                >
                  {cell}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        ))}
      </ThemedView>
      <ThemedView style={styles.gameStatus}>
        <ThemedText style={styles.statusText}>
          {isWin(board)
            ? "🎉 Player " + (turn === "X" ? "O" : "X") + " Won! 🎉"
            : isDraw(board)
            ? "🤝 It's a Draw! 🤝"
            : ""}
        </ThemedText>
      </ThemedView>
      <TouchableOpacity
        style={styles.playAgainButton}
        onPress={() => {
          setBoard([...Array(3)].map(() => [...Array(3)].map(() => " ")));
          setTurn("X");
        }}
      >
        <ThemedText style={styles.playAgainText}>Play Again</ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    flex: 1,
    gap: 8,
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
    flex: 1,
    aspectRatio: 1,
    fontFamily: "monospace",
    borderColor: "#4A90E2",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cellText: {
    fontWeight: "bold",
    color: "#2C3E50",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  gameStatus: {
    alignItems: "center",
    marginVertical: 20,
  },
  statusText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E74C3C",
    textAlign: "center",
  },
  playAgainButton: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  playAgainText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
