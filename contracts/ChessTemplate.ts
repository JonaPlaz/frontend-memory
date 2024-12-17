export const CONTRACT_ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
export const CONTRACT_ABI = [
  {
    inputs: [],
    name: "AlreadyInitialized",
    type: "error",
  },
  {
    inputs: [],
    name: "GameHasEnded",
    type: "error",
  },
  {
    inputs: [],
    name: "GameNotActive",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPlayerAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "NotParticipant",
    type: "error",
  },
  {
    inputs: [],
    name: "NotYourTurn",
    type: "error",
  },
  {
    inputs: [],
    name: "PlayerAlreadyAssigned",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "outcome",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "GameEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player1",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player2",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betAmount",
        type: "uint256",
      },
    ],
    name: "GameStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "move",
        type: "uint16",
      },
    ],
    name: "MovePlayed",
    type: "event",
  },
  {
    inputs: [],
    name: "betAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "playerState",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
    ],
    name: "checkBishopValidMoves",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "playerState",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "opponentState",
        type: "uint32",
      },
    ],
    name: "checkEndgame",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "playerState",
        type: "uint32",
      },
    ],
    name: "checkForCheck",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "startingGameState",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "startingPlayerState",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "startingOpponentState",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "startingTurnBlack",
        type: "bool",
      },
      {
        internalType: "uint16[]",
        name: "moves",
        type: "uint16[]",
      },
    ],
    name: "checkGame",
    outputs: [
      {
        internalType: "uint8",
        name: "outcome",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "playerState",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "opponentState",
        type: "uint32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16[]",
        name: "moves",
        type: "uint16[]",
      },
    ],
    name: "checkGameFromStart",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "playerState",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
    ],
    name: "checkKingValidMoves",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "playerState",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
    ],
    name: "checkKnightValidMoves",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "playerState",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "opponentState",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
    ],
    name: "checkPawnValidMoves",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "playerState",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
    ],
    name: "checkQueenValidMoves",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "playerState",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
    ],
    name: "checkRookValidMoves",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "toPos",
        type: "uint8",
      },
    ],
    name: "commitMove",
    outputs: [
      {
        internalType: "uint256",
        name: "newGameState",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "currentTurnBlack",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gameActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gameState",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getGameState",
    outputs: [
      {
        internalType: "address",
        name: "_player1",
        type: "address",
      },
      {
        internalType: "address",
        name: "_player2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_betAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_gameActive",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_currentTurnBlack",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "_gameState",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_player1State",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "_player2State",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "toPos",
        type: "uint8",
      },
    ],
    name: "getHorizontalMovement",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "toPos",
        type: "uint8",
      },
    ],
    name: "getInBetweenMask",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "pos",
        type: "uint8",
      },
    ],
    name: "getPositionMask",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "toPos",
        type: "uint8",
      },
    ],
    name: "getVerticalMovement",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_player1",
        type: "address",
      },
      {
        internalType: "address",
        name: "_player2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_betAmount",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "pos",
        type: "uint8",
      },
    ],
    name: "pieceAtPosition",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "pos",
        type: "uint8",
      },
    ],
    name: "pieceUnderAttack",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "move",
        type: "uint16",
      },
    ],
    name: "playMove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "player1",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "player1State",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "player2",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "player2State",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "playerState",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "opponentState",
        type: "uint32",
      },
      {
        internalType: "uint8",
        name: "color",
        type: "uint8",
      },
      {
        internalType: "uint16",
        name: "pBitOffset",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "bitSize",
        type: "uint16",
      },
    ],
    name: "searchPiece",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_player1",
        type: "address",
      },
    ],
    name: "setPlayer1",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_player2",
        type: "address",
      },
    ],
    name: "setPlayer2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "pos",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "piece",
        type: "uint8",
      },
    ],
    name: "setPosition",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "toPos",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
    ],
    name: "verifyExecuteBishopMove",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "toPos",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
      {
        internalType: "uint32",
        name: "playerState",
        type: "uint32",
      },
    ],
    name: "verifyExecuteKingMove",
    outputs: [
      {
        internalType: "uint256",
        name: "newGameState",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "newPlayerState",
        type: "uint32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "toPos",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
    ],
    name: "verifyExecuteKnightMove",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "move",
        type: "uint16",
      },
      {
        internalType: "uint32",
        name: "playerState",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "opponentState",
        type: "uint32",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
    ],
    name: "verifyExecuteMove",
    outputs: [
      {
        internalType: "uint256",
        name: "newGameState",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "newPlayerState",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "newOpponentState",
        type: "uint32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "toPos",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "moveExtra",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
      {
        internalType: "uint32",
        name: "playerState",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "opponentState",
        type: "uint32",
      },
    ],
    name: "verifyExecutePawnMove",
    outputs: [
      {
        internalType: "uint256",
        name: "newGameState",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "newPlayerState",
        type: "uint32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "toPos",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
    ],
    name: "verifyExecuteQueenMove",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "toPos",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
    ],
    name: "verifyExecuteRookMove",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameState",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "pos",
        type: "uint8",
      },
    ],
    name: "zeroPosition",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];
