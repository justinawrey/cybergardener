import { createSignal } from "solid-js";

const Subscribe = () => {
  const [email, setEmail] = createSignal("");

  function handleChange(event) {
    setEmail(event.currentTarget.value);
  }

  function subscribe() {
    fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email(),
      }),
    });
  }

  return (
    <div>
      <input
        name="email"
        type="email"
        value={email()}
        placeholder="Enter email address..."
        onInput={handleChange}
      />
      <button onClick={subscribe}>subscribe to newsletter</button>
    </div>
  );
};

export default Subscribe;
