const dummyRecordings = [
  { "user": "_id",
    "sound": "w",
    "word":  "01-why",
    "date":  "2024-02-11T13:15:17.537Z",
    "src":   "blob",
    "url":   "_id/240211/w/01-why-131517.webm"
  },
  { "user": "_id",
    "sound": "w",
    "word":  "02-war",
    "date":  "2024-02-11T13:16:17.537Z",
    "src":   "blob",
    "url":   "_id/240211/w/02-war-131617.webm"
  },
  { "user": "_id",
    "sound": "w",
    "word":  "03-weigh",
    "date":  "2024-02-11T13:17:17.537Z",
    "src":   "blob",
    "url":   "_id/240211/w/03-weigh-131717.webm"
  },
  { "user": "_id",
    "sound": "w",
    "word":  "04-wet",
    "date":  "2024-02-11T13:18:17.537Z",
    "src":   "blob",
    "url":   "_id/240211/w/04-wet-131817.webm"
  },
  { "user": "_id",
    "sound": "th",
    "word":  "01-thaw",
    "date":  "2024-02-11T13:19:27.537Z",
    "src":   "blob",
    "url":   "_id/240211/th/01-thaw-131927.webm"
  },
  { "user": "_id",
    "sound": "th",
    "word":  "02-thought",
    "date":  "2024-02-11T13:19:17.537Z",
    "src":   "blob",
    "url":   "_id/240211/th/02-thought-131917.webm"
  },
  { "user": "_id",
    "sound": "th",
    "word":  "03-thirty",
    "date":  "2024-02-11T13:19:07.537Z",
    "src":   "blob",
    "url":   "_id/240211/th/03-thirty-131907.webm"
  },
  { "user": "_id",
    "sound": "Б",
    "word":  "бабочка",
    "date":  "2024-02-11T13:19:00.537Z",
    "src":   "blob",
    "url":   "_id/240211/Б/бабочка-131900.webm"
  },
  { "user": "_id",
    "sound": "Б",
    "word":  "бабушка",
    "date":  "2024-02-11T13:19:10.537Z",
    "src":   "blob",
    "url":   "_id/240211/Б/бабушка-131910.webm"
  },
  { "user": "_id",
    "sound": "Б",
    "word":  "балалайка",
    "date":  "2024-02-11T13:19:20.537Z",
    "src":   "blob",
    "url":   "_id/240211/Б/бабочка-131920.webm"
  }
]



export const fetchRecordings = async callback => {
  const recordings = await Promise.resolve(dummyRecordings)
  callback(recordings)
}