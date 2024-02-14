import { useState } from "react";
import "./App.css";
import formImage from "./assets/right_img.png";
import arrowIcon from "./assets/arrow_icon.png";
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [textArea, setTextArea] = useState("");
  const [isSubmited, setIsSubmitted] = useState(false);
  //func

  //
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "dc49a030-ea78-4ce9-a27c-696daa102224");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setTextArea("");
    }
  };

  return (
    <>
      {isSubmited ? (
        <div className="submited">
          <h1>Form Submitted Successfully !</h1>
        </div>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="left-container">
            <div className="contact-left-title">
              <h2>Get in touch</h2>
              <hr />
            </div>

            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email Here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              name="message"
              id="textarea"
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
              required
            ></textarea>
            <button type="submit">
              Submit <img src={arrowIcon} alt="" />
            </button>
          </div>
          <div className="right-container">
            <img src={formImage} alt="" />
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
