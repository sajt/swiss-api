# swiss-api

This api for getting Houses and planets position for a given date and position

This start the nodemon server for testing 
```
npm start
```

You can post the following data
```
{
  "year": 2007,
  "month": 1,
  "day": 1,
  "hour": 12,
  "minute": 1,
  "second": 0,
  "timezone" : 1,
  "longitude": 19.73, //in degree
  "lattitude": 47.19 //in degree
}
```

You could get back a json, with an array of houses and an associative array of planets
