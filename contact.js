const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const statusElement = document.querySelector("#contact-status");
        const setStatus = (message) => {
            if (statusElement) statusElement.textContent = message;
        };
        const readText = (key) => {
            const value = formData.get(key);
            return typeof value === "string" ? value.trim() : "";
        };
        const name = readText("name");
        const email = readText("email");
        const message = readText("message");
        if (!name || name.length > 100 || /[\r\n\x00-\x1f\x7f]/.test(name)) {
            setStatus("Please provide a valid name (max 100 characters, one line).");
            return;
        }
        if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\x00-\x1f\x7f]/.test(email)) {
            setStatus("Please provide a valid email address.");
            return;
        }
        if (!message || message.length > 1000 || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(message)) {
            setStatus("Please provide a valid message (max 1000 characters).");
            return;
        }
        const recipient = "tukue.geb@gmail.com";
        const subject = `Website inquiry from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setStatus(`Your email app should open with your message addressed to ${recipient}.`);
        window.location.href = mailtoUrl;
    });
}
