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
        document.getElementById('profile-pic').src = storedProfilePic;
        document.getElementById('modal-profile-pic').src = storedProfilePic;
    }
};

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
        localStorage.setItem('username', newUsername);
    }
    if (newEmail) {
        document.getElementById('email').textContent = newEmail;
        localStorage.setItem('email', newEmail);
    }
    if (newBio) {
        document.getElementById('bio').textContent = newBio;
        localStorage.setItem('bio', newBio);
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function openProfilePictureModal() {
    const modal = document.getElementById('profile-picture-modal');
    modal.classList.add('show');
    modal.style.display = 'flex';
}

function closeProfilePictureModal() {
    const modal = document.getElementById('profile-picture-modal');
    modal.classList.remove('show');

    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
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
                localStorage.setItem('profilePic', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    input.click();
}