import { Chart } from "chart.js/auto";
import type { speed_result } from ".";

const build_download = (found_div: HTMLCanvasElement, data: speed_result[]) =>
  new Chart(found_div as HTMLCanvasElement, {
    type: "bar",
    data: {
      labels: data.map((row) => {
        const dateFormat = new Date(parseInt(row.timestamp, 10));
        return (
          dateFormat.toDateString() + " " + dateFormat.toLocaleTimeString()
        );
      }),
      datasets: [
        {
          label: "download speed",
          data: data.map((row) => row.dl_speed),
        },
      ],
    },
  });

const build_upload = (found_div: HTMLCanvasElement, data: speed_result[]) =>
  new Chart(found_div as HTMLCanvasElement, {
    type: "bar",
    data: {
      labels: data.map((row) => {
        const dateFormat = new Date(parseInt(row.timestamp, 10));
        return (
          dateFormat.toDateString() + " " + dateFormat.toLocaleTimeString()
        );
      }),
      datasets: [
        {
          label: "upload speed",
          data: data.map((row) => row.ul_speed),
        },
      ],
    },
  });

const build_latency = (found_div: HTMLCanvasElement, data: speed_result[]) =>
  new Chart(found_div as HTMLCanvasElement, {
    type: "bar",
    data: {
      labels: data.map((row) => {
        const dateFormat = new Date(parseInt(row.timestamp, 10));
        return (
          dateFormat.toDateString() + " " + dateFormat.toLocaleTimeString()
        );
      }),
      datasets: [
        {
          label: "latency (ms)",
          data: data.map((row) => row.latency),
        },
      ],
    },
  });

const build_chart = (data: speed_result[], target_div: string) => {
  const found_div = document.getElementById(target_div);
  if (!found_div) return;
  switch (target_div) {
    case "download-canvas":
      build_download(found_div as HTMLCanvasElement, data);
      break;
    case "upload-canvas":
      build_upload(found_div as HTMLCanvasElement, data);
      break;
    case "latency-canvas":
      build_latency(found_div as HTMLCanvasElement, data);
      break;
  }
};

(window as any).build_chart = build_chart;
