import Parse from "parse/dist/parse.min.js";

export function initializeParse(serverUrl: string, appId: string) {
  console.log("Initializing Parse");

  Parse.serverURL = serverUrl;
  Parse.initialize(appId);
}
