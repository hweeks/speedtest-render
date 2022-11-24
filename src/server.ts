import express from "express";
import cron from "node-cron"
import { resolve } from "path";
import {readFile } from 'fs'
import { figure_my_speed_out_then_save_it_to_disk, gimmie_that_json } from ".";

const app = express();

app.use(express.json());

app.engine('html', (filePath: string, options: {}, callback: any) => { // define the template engine
  readFile(filePath, (err, content) => {
    if (err) return callback(err)
    debugger
    const rendered = content.toString()
      .replace('{{ DATA_FROM_SERVER }}', `${(options as any).data.map(datum => JSON.stringify(datum)).join(',')}`)
    return callback(null, rendered)
  })
})

app.set('views', resolve(__dirname, "..", "static"))
app.set('view engine', 'html')

app.get("/", (req, res) => {
  const all_data = gimmie_that_json();
  debugger
  res.render("index", {data: all_data}, (err: Error, html: string) => {
    res.send(html)
  });
});

app.listen(8080, () => {
  console.log("up")
  figure_my_speed_out_then_save_it_to_disk()
  console.log("latest speed written")
  cron.schedule('*/15 * * * *', () => {
    figure_my_speed_out_then_save_it_to_disk()
    console.log("latest speed written")
  });
});
