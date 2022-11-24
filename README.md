# speed test render

## what

it renders a chart via chart.js of your upload, download, and latency as a bar chart.

## how

simply:

```
$ yarn
yarn install v1.22.17
...
✨  Done in 0.09s.
$ yarn start
yarn run v1.22.17
...
up, will take five minutes to populate the first results
```

go to [localhost:8080](http://localhost:8080) to see the output

### add some ish to your db

simply:

```
$ yarn dl-one
yarn run v1.22.17
$ node -r esbuild-register src/script.ts
✨  Done in 34.35s.
```

this will add a single result to the output

## notes

you must build the out.js each time you make a change, or just add nodemmon...
