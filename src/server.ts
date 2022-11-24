import express from "express";
import cron from "node-cron";
import { resolve } from "path";
import { readFile } from "fs";
import { figure_my_speed_out_then_save_it_to_disk, gimmie_that_json } from ".";

const app = express();

app.use(express.json());
app.use(express.static(resolve(__dirname, "..", "build")));

app.engine("html", (filePath: string, options: {}, callback: any) => {
  // define the template engine
  readFile(filePath, (err, content) => {
    if (err) return callback(err);
    const rendered = content
      .toString()
      .replace(
        "{{ DATA_FROM_SERVER }}",
        `${(options as any).data
          .map((datum) => JSON.stringify(datum))
          .join(",")}`
      );
    return callback(null, rendered);
  });
});

app.set("views", resolve(__dirname, "..", "static"));
app.set("view engine", "html");

app.get("/", (req, res) => {
  const all_data = gimmie_that_json();
  res.render("index", { data: all_data });
});

app.get("/api/results", (req, res) => {
  const all_data = gimmie_that_json();
  res.send(all_data);
});

app.get("/api/results/:timestamp", (req, res) => {
  const all_data = gimmie_that_json(req.params.timestamp);
  res.send(all_data[0]);
});

app.listen(8080, () => {
  console.log("up, will take five minutes to populate the first results");
  cron.schedule("*/5 * * * *", () => {
    console.log("running speed test");
    figure_my_speed_out_then_save_it_to_disk();
    console.log("latest speed written");
  });
});
