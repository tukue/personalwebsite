const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("name").trim();
        const email = formData.get("email").trim();
        const message = formData.get("message").trim();
        const recipient = "tukue.geb@gmail.com";
        const subject = `Website inquiry from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        document.querySelector("#contact-status").textContent =
            `Your email app should open with your message addressed to ${recipient}.`;
        window.location.href = mailtoUrl;
    });
}
