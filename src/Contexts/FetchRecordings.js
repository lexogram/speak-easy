const dummyRecordings = {
  240101: {
    "b": {
      "buy": 0,
      "bye": 1,
      "bat": 2
    }
  },
  240102: {
    "b": {
      "buy": 3,
      "bye": 4,
      "ball": 5
    },
    "w": {
      "why": 6,
      "wall": 7,
      "wish": 8
    }
  },
  240103: {
    "b": {
      "buy": 9,
      "bye": 10,
      "bet": 11
    },
    "w": {
      "why": 12,
      "wall": 13,
      "wet": 14
    }
  }
}


export const fetchRecordings = async callback => {
  const recordings = await Promise.resolve(dummyRecordings)
  callback(recordings)
}