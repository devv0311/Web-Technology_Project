let focusedElementBeforeModal;

function joinNow() {
    const modal = document.getElementById("subscription-modal");
    modal.style.display = "flex";
    modal.classList.add("fade-in");
    modal.querySelector(".modal-content").classList.add("fade-in");
    modal.querySelector(".modal-content").style.opacity = 1;
    modal.querySelector(".modal-content").classList.add("show");

    focusedElementBeforeModal = document.activeElement;
    trapFocus(modal);
}

function closeModal() {
    const modal = document.getElementById("subscription-modal");
    modal.querySelector(".modal-content").classList.add("fade-out");

    return new Promise((resolve) => {
        setTimeout(() => {
            modal.style.display = "none";
            modal.classList.remove("fade-out");
            modal.querySelector(".modal-content").classList.remove("show");
            modal.querySelector(".modal-content").style.opacity = 1;
            resolve();
        }, 300);
    }).finally(() => {
        focusedElementBeforeModal.focus();
    });
}

function closeThankYouModal() {
    const modal = document.getElementById("thank-you-modal");
    modal.querySelector(".modal-content").classList.remove("show");
    modal.querySelector(".modal-content").style.opacity = 0;

    setTimeout(() => {
        modal.style.display = "none";
        window.location.href = "content.html";
    }, 300);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('subscription-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();
        const errorMessage = document.createElement('p');
        errorMessage.style.color = '#f05454';
        errorMessage.style.fontSize = '12px';
        errorMessage.style.marginTop = '5px';

        const existingErrorMessage = document.querySelector('.error-message');
        if (existingErrorMessage) {
            existingErrorMessage.remove();
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValue) {
            errorMessage.textContent = 'Please enter an email address.';
            errorMessage.classList.add('error-message');
            emailInput.insertAdjacentElement('afterend', errorMessage);
        } else if (!emailPattern.test(emailValue)) {
            errorMessage.textContent = 'Please enter a valid email address.';
            errorMessage.classList.add('error-message');
            emailInput.insertAdjacentElement('afterend', errorMessage);
        } else {
            emailInput.value = '';
            await closeModal(); 

            setTimeout(() => {
                const thankYouModal = document.getElementById("thank-you-modal");
                thankYouModal.style.display = "flex";
                thankYouModal.querySelector(".modal-content").classList.add("show");
            }, 100);
        }
    });

    const cards = document.querySelectorAll('.cards-container .card');

    cards.forEach(card => {
        card.addEventListener('click', joinNow);
    });
});

function trapFocus(modal) {
    const focusableElementsString = 'a[href], area[href], input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = modal.querySelectorAll(focusableElementsString);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', function (e) {
        const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                lastFocusableElement.focus();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                firstFocusableElement.focus();
            }
        }
    });

    firstFocusableElement.focus();
}