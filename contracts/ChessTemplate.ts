export const CONTRACT_ADDRESS = "0x41AE06EF8507E37ba8bd36B40e45AC4672F1d2b7";
export const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadyInitialized",
    type: "error",
  },
  {
    inputs: [],
    name: "DrawAlreadyProposed",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptyMovesArray",
    type: "error",
  },
  {
    inputs: [],
    name: "GameAlreadyActive",
    type: "error",
  },
  {
    inputs: [],
    name: "GameNotActive",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidChessFactory",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPlayers",
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
    name: "OnlyChessFactory",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "PlayersNotRegistered",
    type: "error",
  },
  {
    inputs: [],
    name: "ProposerCannotAccept",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "TimeoutNotPassed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "fromType",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "UnsupportedPieceType",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "proposer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "accepter",
        type: "address",
      },
    ],
    name: "DrawAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "proposer",
        type: "address",
      },
    ],
    name: "DrawProposed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "loser",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "GameAbandoned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "outcome",
        type: "uint16",
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
        name: "winner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "loser",
        type: "address",
      },
    ],
    name: "GameEndedForTimeout",
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
    ],
    name: "GameForcedDraw",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
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
        internalType: "uint16[]",
        name: "moves",
        type: "uint16[]",
      },
    ],
    name: "MovePlayed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousPlayer1",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newPlayer1",
        type: "address",
      },
    ],
    name: "Player1Set",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousPlayer2",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newPlayer2",
        type: "address",
      },
    ],
    name: "Player2Set",
    type: "event",
  },
  {
    inputs: [],
    name: "BET_AMOUNT",
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
    name: "DRAW_REWARD",
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
    name: "MOVE_TIMEOUT",
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
    name: "PLATFORM_FEE",
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
    name: "WINNER_REWARD",
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
    name: "abandon",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "abandoner",
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
    name: "acceptDraw",
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
        internalType: "uint8",
        name: "fromPos",
        type: "uint8",
      },
      {
        internalType: "int8",
        name: "step",
        type: "int8",
      },
      {
        internalType: "uint8",
        name: "limitCheck",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "kingPos",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
    ],
    name: "checkDirectionBishop",
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
        internalType: "int8",
        name: "step",
        type: "int8",
      },
      {
        internalType: "uint8",
        name: "limitCheck",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "kingPos",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
    ],
    name: "checkDirectionQueen",
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
        internalType: "int8",
        name: "step",
        type: "int8",
      },
      {
        internalType: "uint8",
        name: "limitCheck",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "kingPos",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "currentTurnBlack",
        type: "bool",
      },
    ],
    name: "checkDirectionRook",
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
    inputs: [],
    name: "chessFactory",
    outputs: [
      {
        internalType: "contract IChessFactory",
        name: "",
        type: "address",
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
    name: "drawProposed",
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
    name: "forceDrawDueToTimeout",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "forceWinDueToTimeout",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "getGameState",
    outputs: [
      {
        internalType: "uint16[]",
        name: "moves",
        type: "uint16[]",
      },
      {
        internalType: "uint8",
        name: "outcome",
        type: "uint8",
      },
      {
        internalType: "enum ChessTemplate.GameStatus",
        name: "currentStatus",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        internalType: "address",
        name: "loser",
        type: "address",
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
        name: "_chessFactory",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isGameActive",
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
    name: "lastMoveTime",
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
    name: "moveCount",
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
    name: "owner",
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
        internalType: "uint16[]",
        name: "moves",
        type: "uint16[]",
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
    name: "proposeDraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proposer",
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
    name: "renounceOwnership",
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
    inputs: [],
    name: "setGameActive",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "status",
    outputs: [
      {
        internalType: "enum ChessTemplate.GameStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
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
