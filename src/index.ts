import "./index.css";
import "./static/bg.jpg";
import "./static/favicon.jpg";
import { mount } from "svelte";
import App from "./App.svelte";

const app = mount(App, { target: document.getElementById("root")! });

export default app;
