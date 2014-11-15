// Sandbox
function in_sandbox(){
  var environ = [[NSProcessInfo processInfo] environment];
  return (nil != [environ objectForKey:"APP_SANDBOX_CONTAINER_ID"]);
}
var sandboxAccess = AppSandboxFileAccess.init({
  message: "Please authorize Sketch to write to this folder. You will only need to do this once per folder.",
  prompt:  "Authorize",
  title: "Sketch Authorization"
})
