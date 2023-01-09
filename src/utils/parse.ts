import Parse from "parse/dist/parse.min.js";

export function initializeParse(serverUrl: string, appId: string) {
  console.log("initializeParse", serverUrl, appId);

  Parse.serverURL = serverUrl;
  Parse.initialize(appId);
}
