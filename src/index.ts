import { AppRoutes, Server } from "./presentation";

(() => {
  main();
})();

function main() {
  new Server({
    port: 3000,
    routes: AppRoutes.routes,
  }).start();
}
