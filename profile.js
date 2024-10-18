// Load stored data when the page loads
window.onload = function () {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedBio = localStorage.getItem('bio');
    const storedProfilePic = localStorage.getItem('profilePic');

    if (storedUsername) {
        document.getElementById('username').textContent = storedUsername;
    }
    if (storedEmail) {
        document.getElementById('email').textContent = storedEmail;
    }
    if (storedBio) {
        document.getElementById('bio').textContent = storedBio;
    }
    if (storedProfilePic) {
        document.getElementById('profile-pic').src = storedProfilePic; // Load the profile picture
        document.getElementById('modal-profile-pic').src = storedProfilePic; // Load the modal profile picture
    }
};

// Update profile information and store it
document.getElementById('edit-button').addEventListener('click', function () {
    let newUsername = prompt("Enter new username:", document.getElementById('username').textContent);
    
    let newEmail;
    do {
        newEmail = prompt("Enter new email:", document.getElementById('email').textContent);
        if (newEmail && !validateEmail(newEmail)) {
            alert("Please enter a valid email address.");
        }
    } while (newEmail && !validateEmail(newEmail));
    
    let newBio = prompt("Enter new bio:", document.getElementById('bio').textContent);

    if (newUsername) {
        document.getElementById('username').textContent = newUsername;
        localStorage.setItem('username', newUsername); // Store new username
    }
    if (newEmail) {
        document.getElementById('email').textContent = newEmail;
        localStorage.setItem('email', newEmail); // Store new email
    }
    if (newBio) {
        document.getElementById('bio').textContent = newBio;
        localStorage.setItem('bio', newBio); // Store new bio
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function openProfilePictureModal() {
    const modal = document.getElementById('profile-picture-modal');
    const modalPic = document.getElementById('modal-profile-pic');
    modalPic.src = document.getElementById('profile-pic').src;
    modal.style.display = 'flex';
}

function closeProfilePictureModal() {
    document.getElementById('profile-picture-modal').style.display = 'none';
}

function openImagePicker() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('profile-pic').src = e.target.result;
                document.getElementById('modal-profile-pic').src = e.target.result;
                // Store the profile picture URL
                localStorage.setItem('profilePic', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    input.click();
}