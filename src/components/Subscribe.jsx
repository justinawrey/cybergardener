function subscribe(email) {
  fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
}

const CountingComponent = () => {
  return <button onClick={() => subscribe("justin")}>get subscribers</button>;
};

export default CountingComponent;
