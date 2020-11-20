
export const setUpWs = async (ws) => {

  ws.onopen = () => console.log("ws opened");
  ws.onclose = () => console.log("ws closed");
  ws.onmessage = (message) => {
    console.log(message);
  }

  setTimeout(() => {
    ws.send(JSON.stringify({
      msg: 'foo',
      type: 'utf8',
    }));
  }, 200)

}
