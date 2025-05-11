// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize skeleton loader
    initSkeletonLoader();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll handling
    initScrollHandling();
});

// Skeleton Loader
function initSkeletonLoader() {
    const skeletonElements = document.querySelectorAll('.skeleton');
    
    // Simulate loading time
    setTimeout(() => {
        skeletonElements.forEach(element => {
            element.classList.remove('skeleton');
        });
    }, 2000);
}

// Search Functionality
function initSearch() {
    const searchButton = document.querySelector('.search-button');
    const locationInput = document.querySelector('input[placeholder="Where are you going?"]');
    const checkInInput = document.querySelector('input[placeholder="Add dates"]');
    const checkOutInput = document.querySelector('input[placeholder="Add dates"]');
    const guestsInput = document.querySelector('input[placeholder="Add guests"]');

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            // Validate inputs
            if (!locationInput.value) {
                showError(locationInput, 'Please enter a location');
                return;
            }

            // Collect search data
            const searchData = {
                location: locationInput.value,
                checkIn: checkInInput.value,
                checkOut: checkOutInput.value,
                guests: guestsInput.value
            };

            // Log search data (in a real app, this would make an API call)
            console.log('Search Data:', searchData);
        });
    }
}

// Mobile Menu
function initMobileMenu() {
    const menuButton = document.querySelector('.menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Scroll Handling
function initScrollHandling() {
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.classList.remove('shadow-md');
        } else {
            nav.classList.add('shadow-md');
        }

        lastScroll = currentScroll;
    });
}

// Show error message
function showError(element, message) {
    // Remove any existing error
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create and append error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    element.parentElement.appendChild(errorDiv);

    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Category scrolling
function initCategoryScroll() {
    const categoryContainer = document.querySelector('.category-container');
    if (categoryContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;

        categoryContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            categoryContainer.classList.add('cursor-grabbing');
            startX = e.pageX - categoryContainer.offsetLeft;
            scrollLeft = categoryContainer.scrollLeft;
        });

        categoryContainer.addEventListener('mouseleave', () => {
            isDown = false;
            categoryContainer.classList.remove('cursor-grabbing');
        });

        categoryContainer.addEventListener('mouseup', () => {
            isDown = false;
            categoryContainer.classList.remove('cursor-grabbing');
        });

        categoryContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - categoryContainer.offsetLeft;
            const walk = (x - startX) * 2;
            categoryContainer.scrollLeft = scrollLeft - walk;
        });
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    // Add any necessary responsive adjustments
});

// Error handling for failed image loads
function handleImageError(img) {
    img.src = 'fallback-image-url.jpg'; // Replace with actual fallback image
    img.alt = 'Image not available';
}
