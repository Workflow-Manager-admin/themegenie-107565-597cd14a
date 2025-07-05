import React from "react";

// PUBLIC_INTERFACE
function ContactUs() {
  /** Page for showing contact methods. */
  return (
    <main className="container" style={{ minHeight: "60vh", paddingTop: "2rem" }}>
      <h1>Contact Us</h1>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:hello@themecreator.com" style={{ color: "#4f46e5" }}>
          hello@themecreator.com
        </a>
      </p>
      <p>
        <strong>Phone:</strong>{" "}
        <a href="tel:+1234567890" style={{ color: "#4f46e5" }}>
          +1 (234) 567-890
        </a>
      </p>
      <div style={{ marginTop: "2em", fontSize: "2rem" }}>
        <span role="img" aria-label="phone">📞</span>&nbsp;
        <span role="img" aria-label="email">📧</span>
      </div>
    </main>
  );
}

export default ContactUs;
