# wa-client
## Notes for assessment
- Vue JS has been used(choice is purely based on my current assignment, as didnt had too much to setup things in react. 
- Due to time constrain, not able to add all unit test, however basic setup has been created to add unit test
- Solution is very generic, many thing can be improve and change based on more details in real project, specially amount 
need to be handle, e.g. the Warehouse api should provide endpoint for paginated/range of data
- If there bulk getter for article details for a specific set of article id, that would be a better option to fetch 
article details of product
- Would suggest update of article stock after registration of sales should be done on server side on api. considering 
reliability of api, need better system to handle transactional state of data.
- If had more time would have prefer to implement Vuex for Data Store(Much cleaner, implementation).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
