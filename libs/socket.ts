import { Socket } from "phoenix";

export class CustomSocket extends Socket {
  endPointURL() {
    return super.endPointURL().replace("/websocket", "");
  }
}
