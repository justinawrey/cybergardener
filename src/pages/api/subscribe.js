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

  return fetch(url, {
    method: "GET",
    headers,
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

  let body = await res.json();
  console.log(body);

  // otherwise we good yo
  return new Response({
    status: 200,
  });
}
