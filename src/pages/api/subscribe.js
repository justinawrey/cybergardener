async function subscribe(email) {
  const isDenoDeploy = "Deno" in globalThis;

  let senderKey = isDenoDeploy
    ? Deno.env.get("PUBLIC_SENDER_API_KEY")
    : import.meta.env.PUBLIC_SENDER_API_KEY;

  const url = new URL("https://api.sender.net/v2/subscribers");

  let headers = {
    Authorization: `Bearer ${senderKey}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  let data = {
    email,
  };

  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
}

export async function POST({ request }) {
  let { email } = await request.json();

  if (!email) {
    return new Response({
      status: 400,
    });
  }

  // if something went wrong with sender api, just send 500
  let res = await subscribe(email);
  if (!res.ok) {
    return new Response({
      status: 500,
    });
  }

  // log the response from sender
  let json = await res.json();
  console.log(json);

  // otherwise we good yo
  return new Response({
    status: 200,
  });
}
