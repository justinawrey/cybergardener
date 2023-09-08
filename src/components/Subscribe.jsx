function subscribe() {
  const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

  let senderKey = isDenoDeploy
    ? Deno.env.get("PUBLIC_SENDER_API_KEY")
    : import.meta.env.PUBLIC_SENDER_API_KEY;

  const url = new URL("https://api.sender.net/v2/subscribers");

  let headers = {
    Authorization: `Bearer ${senderKey}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  fetch(url, {
    method: "GET",
    headers,
  }).then((response) => console.log(response.json()));
}

const CountingComponent = () => {
  return <button onClick={subscribe}>get subscribers</button>;
};

export default CountingComponent;
