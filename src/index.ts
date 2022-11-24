import { execSync } from "child_process";
import { resolve, join } from "path";
import { writeFileSync, readFileSync } from "fs";

export type speed_result = {
  bufferBloat: number;
  dl_speed: number;
  downloaded: number;
  latency: number;
  ul_speed: number;
  uploaded: number;
  userIp: string;
  userLocation: string;
  timestamp: string;
};

export const figure_my_speed_out_then_save_it_to_disk = () => {
  const cmd_to_run = execSync("yarn fast-json", {
    cwd: resolve(__dirname, ".."),
  });
  const cmd_lines = cmd_to_run.toString().split("\n");
  cmd_lines.shift(); // remove the yarn run output line
  const the_final_output = cmd_lines.join("\n");
  const the_result: speed_result = JSON.parse(the_final_output);
  const now = Date.now();
  const filename = `speed-result-${now}.json`;
  the_result.timestamp = now.toString();
  const file_path = resolve(__dirname, "../data");
  writeFileSync(join(file_path, filename), JSON.stringify(the_result, null, 2));
};

export const gimmie_that_json = (filter?: string) => {
  const file_path = resolve(__dirname, "../data");
  const cmd_to_run = execSync("ls", {
    cwd: file_path,
  });
  const files_to_read = cmd_to_run.toString().split("\n").filter(Boolean); // get each listed file
  const all_values: speed_result[] = [];
  files_to_read.forEach((path_to_json) => {
    const full_json_path = resolve(file_path, path_to_json);
    let should_push = (filter && !path_to_json.includes(filter)) ?? true;
    if (should_push)
      all_values.push(JSON.parse(readFileSync(full_json_path, "utf-8")));
  });
  return all_values;
};
