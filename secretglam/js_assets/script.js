
document.addEventListener("DOMContentLoaded", function () {

    console.log("Secret Glam by Dimpho JavaScript is ready!");

    // SERVICE SEARCH
    const searchInput = document.getElementById("serviceSearch");
    const searchMessage = document.getElementById("searchMessage");
    const serviceSections = document.querySelectorAll("main section");

    if (searchInput && searchMessage) {

        searchInput.addEventListener("input", function () {

            const searchText = searchInput.value.toLowerCase().trim();
            let foundServices = 0;

            serviceSections.forEach(function (section, index) {

                // Keep the introduction and search box visible
                if (index === 0) {
                    section.style.display = "block";
                    return;
                }

                // Keep the gallery visible while searching
                if (section.id === "serviceGallery") {
                    section.style.display = "block";
                    return;
                }

                const sectionText = section.textContent.toLowerCase();

                if (sectionText.includes(searchText)) {
                    section.style.display = "block";
                    foundServices++;
                } else {
                    section.style.display = "none";
                }
            });

            if (searchText === "") {
                searchMessage.textContent = "";
            } else if (foundServices > 0) {
                searchMessage.textContent =
                    foundServices + " service section(s) found.";
            } else {
                searchMessage.textContent =
                    "Sorry, no matching services found. Try another search.";
            }
        });
    }

    // IMAGE LIGHTBOX
    const galleryImages = document.querySelectorAll(".gallery-image");
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeLightbox = document.getElementById("closeLightbox");

    // Open the lightbox when a gallery image is clicked
    if (lightbox && lightboxImage && closeLightbox) {

        galleryImages.forEach(function (image) {

            image.style.cursor = "pointer";

            image.addEventListener("click", function () {

                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;

                const caption = image.closest("figure").querySelector("figcaption");

                lightboxCaption.textContent = caption
                    ? caption.textContent
                    : image.alt;

                lightbox.style.display = "flex";
            });
        });

        // Close using the X button
        closeLightbox.addEventListener("click", function () {
            lightbox.style.display = "none";
        });

        // Close by clicking the dark background
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                lightbox.style.display = "none";
            }
        });

        // Close by pressing Escape
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                lightbox.style.display = "none";
            }
        });
    }

    // CONTACT FORM
    const contactForm = document.getElementById("contactForm");
    const contactFormMessage = document.getElementById("contactFormMessage");

    if (contactForm && contactFormMessage) {

        contactForm.addEventListener("submit", function (event) {

            // Check that the form details are valid
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                contactForm.reportValidity();
                return;
            }

            // Stop automatic form submission
            event.preventDefault();

            // Get the information entered by the visitor
            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const messageType = document.getElementById("messageType").value;
            const message = document.getElementById("message").value.trim();

            // Prepare the email subject
            const subject = encodeURIComponent(
                "Secret Glam Contact: " + messageType
            );

            // Prepare the email message
            const emailBody = encodeURIComponent(
                "Name: " + fullName + "\n" +
                "Email: " + email + "\n" +
                "Phone: " + (phone || "Not provided") + "\n" +
                "Message Type: " + messageType + "\n\n" +
                "Message:\n" + message
            );

            // Create an email addressed to the business
            const emailLink =
                "mailto:Secretglambydimpho@gmail.com" +
                "?subject=" + subject +
                "&body=" + emailBody;

            contactFormMessage.textContent =
                "Your email application should open. Review your message and press Send.";

            // Open the visitor's email application
            window.location.href = emailLink;
        });
    }

});
