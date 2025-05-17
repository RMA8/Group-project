// Carousel Functionality
let currentSlide = 0;
let slideInterval;

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menuToggle');
    const navHeightDefault = header.offsetHeight;
    const navHeightMinimized = '50px';
    let hideTimer;
    let isNavVisible = true;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop === 0) {
            clearTimeout(hideTimer);
            header.style.transition = 'height 0.3s ease';
            header.style.height = navHeightDefault + 'px';
            header.style.opacity = '1';
            isNavVisible = true;
        } else {
            
            header.style.transition = 'height 0.3s ease';
            header.style.height = navHeightMinimized;
            
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                header.style.transition = 'opacity 3s ease';
                header.style.opacity = '0';
                isNavVisible = false;
            }, 3000);
        }
    });

    
    document.addEventListener('mousemove', function(e) {
        const rect = header.getBoundingClientRect();
        
        
        if (rect.top <= e.clientY && e.clientY <= rect.top + parseInt(navHeightMinimized) && 
            rect.left <= e.clientX && e.clientX <= rect.right && 
            header.style.height === navHeightMinimized) {
            clearTimeout(hideTimer);
            header.style.opacity = '1';
            header.style.transition = 'opacity 0.3s ease';
            isNavVisible = true;
        } 
        
    });

    
    document.addEventListener('mouseout', function(e) {
        const rect = header.getBoundingClientRect();
        if (!(rect.top <= e.clientY && e.clientY <= rect.top + parseInt(navHeightMinimized) && 
              rect.left <= e.clientX && e.clientX <= rect.right)) {
            
            if (header.style.height === navHeightMinimized && header.style.opacity === '1') {
                
                hideTimer = setTimeout(() => {
                    header.style.transition = 'opacity 3s ease';
                    header.style.opacity = '0';
                    isNavVisible = false;
                }, 3000);
            }
        }
    });

    menuToggle.addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.toggle("show");
    });
});

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlide) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

document.getElementById('next').addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

document.getElementById('prev').addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

startAutoSlide();

// Mobile Menu Toggle
document.getElementById('menuToggle').addEventListener('click', () => {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle("show");
});

// Competition
let competitions = [];
        

document.addEventListener('DOMContentLoaded', () => {
    fetch('competition_data.json')
        .then(response => response.json())
        .then(data => {
            competitions = data;
            showCompetition(1); 
        })
        .catch(error => {
            console.error('Error fetching competition data:', error);
        });
});
        

function showCompetition(id) {
    if (id < 1 || id > competitions.length) {
        console.error('Invalid competition ID');
        return;
    }
            
    const competition = competitions[id - 1];
            

    const viewShow = document.getElementById('view_show');
    viewShow.innerHTML = `<img src="${competition.view}" alt="${competition.name}">`;
            

    const detail = document.getElementById('detail');
    detail.innerHTML = `
        <h2>${competition.name}</h2>
        <p>${competition.description.replace(/\n/g, '<br>')}</p>
    `;
            

    document.getElementById('compA').classList.remove('active');
    document.getElementById('compB').classList.remove('active');
    document.getElementById('compC').classList.remove('active');
            
    const activeElement = document.getElementById(`comp${String.fromCharCode(64 + id)}`);
    if (activeElement) {
        activeElement.classList.add('active');
    }
}

// Application

document.addEventListener('DOMContentLoaded', function() {
    new Vue({
        el: '#app',
        data: {
            form: {
                name: '',
                gender: '',
                age: '',
                email: '',
                phone: '',
                competition: '',
                team: '',
                bio: '',
                terms: false
            },
            submitted: false,
            success: false
        },
        methods: {
            submitForm() {
                this.submitted = true;
                if (this.form.name && this.form.gender && this.form.age >= 1 && this.form.age <= 120 && this.isValidEmail(this.form.email) && this.isValidPhone(this.form.phone) && this.form.competition && this.form.team && this.form.terms) {
                    this.success = true;
                }
            },
            isValidEmail(email) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(email);
            },
            isValidPhone(phone) {
                const phonePattern = /^1[3-9]\d{9}$/;
                return phonePattern.test(phone);
            },
            resetForm() {
                this.form = {
                    name: '',
                    gender: '',
                    age: '',
                    email: '',
                    phone: '',
                    competition: '',
                    team: '',
                    bio: '',
                    terms: false
                };
                this.submitted = false;
                this.success = false;
            }
        }
    });
});

// Highlight
function createUnit(data, index) {
    const unit = document.createElement("div");
    unit.className = "unit";

    const hexagonContainer = document.createElement("div");
    hexagonContainer.className = "hexagon-container";

    const trapezoidContainer = document.createElement("div");
    trapezoidContainer.className = "trapezoid-container";

    const hexagon = document.createElement("div");
    hexagon.className = "hexagon";
    const img = document.createElement("img");
    img.src = `assets/${data.filename}`;
    img.alt = "Hexagon Image";
    hexagon.appendChild(img);

    const trapezoid = document.createElement("div");
    trapezoid.className = (index + 1) % 2 === 1 ? "trapezoid trapezoid-up" : "trapezoid trapezoid-down";
    const p = document.createElement("p");
    p.textContent = data.description;
    trapezoid.appendChild(p);

    // Create placeholders
    const placeholderAbove = document.createElement("div");
    placeholderAbove.className = "placeholder placeholder-above";

    const placeholderBelow = document.createElement("div");
    placeholderBelow.className = "placeholder placeholder-below";

    // Add classes for positioning based on index
    if ((index + 1) % 2 === 1) {
        unit.classList.add("unit-a");
    } else {
        unit.classList.add("unit-b");
    }

    // Add to unit
    unit.appendChild(placeholderAbove);
    unit.appendChild(hexagon);
    unit.appendChild(trapezoid);
    unit.appendChild(placeholderBelow);

    return unit;
}

// Load data from JSON file and create units
fetch('photodata.json')
    .then(response => response.json())
    .then(data => {
        const photoWallContainer = document.getElementById("photoWallContainer");
        const realUnits = [];

        // Create real units
        data.forEach((item, index) => {
            const unit = createUnit(item, index);
            realUnits.push(unit);
            photoWallContainer.appendChild(unit);
        });

        // Clone the first few units and append them to the end
        const cloneCount = 8; // Number of units to clone for smooth loop
        for (let i = 0; i < cloneCount; i++) {
            const clone = realUnits[i].cloneNode(true);
            photoWallContainer.appendChild(clone);
        }

        // Smooth scroll for the container
        let scrollPosition = 120;
        const container = document.querySelector('.photo-wall-container');
        const unitWidth = realUnits[0].offsetWidth; // Width of one unit
        const realUnitsLength = realUnits.length;
        const totalUnits = realUnitsLength + cloneCount;

        function autoScroll() {
            scrollPosition += 1; 
            container.style.transform = `translate3d(${-scrollPosition}px, 0, 0)`;

            // When scrolled past the real units, reset to the beginning
            if (scrollPosition >= ((realUnitsLength) * (unitWidth + 120) +120)) {
                scrollPosition = 120;
                container.style.transform = `translate3d(${-scrollPosition}px, 0, 0)`;
            }

            requestAnimationFrame(autoScroll);
        }

        requestAnimationFrame(autoScroll);
    })
    .catch(error => {
        console.error('Error loading photo data:', error);
    });

// Function to generate filter buttons for a given dataset
function generateFilterItems(data, manufacturerElement, seriesElement, UAVselectElement) {
    // Clear existing items
    manufacturerElement.innerHTML = '';
    seriesElement.innerHTML = '';
    UAVselectElement.innerHTML = '';

    // Flag to track if we should hide the series and UAVselect when clicking the same manufacturer
    let hideSeriesAndUAV = false;

    // Generate manufacturer items
    data.forEach(item => {
        const manufacturerDiv = document.createElement('div');
        manufacturerDiv.className = 'filter-item';
        manufacturerDiv.textContent = item.name;
        manufacturerDiv.dataset.id = item.id;
        manufacturerDiv.addEventListener('click', (e) => {
            // Check if the clicked item is already active
            if (e.target.classList.contains('active')) {
                // If already active, remove active class and hide series and UAVselect
                e.target.classList.remove('active');
                seriesElement.innerHTML = '';
                UAVselectElement.innerHTML = '';
                hideSeriesAndUAV = true;
            } else {
                // If not active, clear all active states and set this one as active
                document.querySelectorAll(`#${manufacturerElement.id} .filter-item`).forEach(div => {
                    div.classList.remove('active');
                });
                e.target.classList.add('active');
                hideSeriesAndUAV = false;
            }

            // Generate series items based on the selected manufacturer, unless we need to hide them
            if (!hideSeriesAndUAV) {
                seriesElement.innerHTML = '';
                const manufacturerId = e.target.dataset.id;
                const seriesData = data.find(man => man.id === manufacturerId)?.childen || [];
                seriesData.forEach(series => {
                    const seriesDiv = document.createElement('div');
                    seriesDiv.className = 'filter-item';
                    seriesDiv.textContent = series.name;
                    seriesDiv.dataset.id = series.id;
                    seriesDiv.addEventListener('click', (e2) => {
                        // Check if the clicked series item is already active
                        if (e2.target.classList.contains('active')) {
                            e2.target.classList.remove('active');
                            UAVselectElement.innerHTML = '';
                        } else {
                            document.querySelectorAll(`#${seriesElement.id} .filter-item`).forEach(div => {
                                div.classList.remove('active');
                            });
                            e2.target.classList.add('active');
                            
                            // Generate UAV select items based on the selected series
                            UAVselectElement.innerHTML = '';
                            const seriesId = e2.target.dataset.id;
                            const UAVData = seriesData.find(s => s.id === seriesId)?.childen || [];
                            UAVData.forEach(uav => {
                                const uavDiv = document.createElement('div');
                                uavDiv.className = 'filter-item';
                                uavDiv.textContent = uav.name;
                                uavDiv.dataset.id = uav.id;
                                UAVselectElement.appendChild(uavDiv);
                            });
                        }
                    });
                    seriesElement.appendChild(seriesDiv);
                });
            }
        });
        manufacturerElement.appendChild(manufacturerDiv);
    });

    // Update the window box initially
    updateWindowBox(manufacturerElement, seriesElement, UAVselectElement, windowBoxElement);
}

// Function to filter UAVs based on selected filters
document.addEventListener('DOMContentLoaded', function() {
    // Load UAV data from UAV.json
    fetch('UAV.json')
        .then(response => response.json())
        .then(data => {
            window.UAVData = data; // Store UAV data in a global variable
            
            // Initialize the windows
            initWindow('A');
            initWindow('B');
        })
        .catch(error => {
            console.error('Error loading UAV.json:', error);
        });
});

// Function to initialize a window
function initWindow(windowId) {
    const addButton = document.getElementById(`addButton${windowId}`);
    const content = document.getElementById(`content${windowId}`);
    const searchBox = document.getElementById(`searchBox${windowId}`);
    const listContainer = document.getElementById(`listContainer${windowId}`);
    const extendContainer = document.getElementById(`extendContainer${windowId}`);

    // Add event listener to the ADD button
    addButton.addEventListener('click', function() {
        content.style.display = content.style.display === 'none' ? 'flex' : 'none';
        if (content.style.display === 'flex') {
            
            updateListContainer('', listContainer, windowId);
            listContainer.style.display = 'flex';
        }
    });

    // Add event listener to the search box
    searchBox.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        updateListContainer(searchTerm, listContainer, windowId);
    });

    // Add event listener to the list container for item clicks
    listContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('item')) {
            const itemId = e.target.dataset.id;
            const uav = window.UAVData.find(uav => uav.id === itemId);
            if (uav) {
                showExtendContainer(uav, extendContainer, windowId);
            }
        }
    });

    // Add event listener to the extend container's expand button
    extendContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('expand-button')) {
            toggleExpand(extendContainer, windowId);
        }
    });
}

// Function to update the list container based on the search term
function updateListContainer(searchTerm, listContainer, windowId) {
    // Clear the list container
    listContainer.innerHTML = '';

    // Filter UAVs based on the search term
    const filteredUAVs = window.UAVData.filter(uav => 
        uav.name.toLowerCase().includes(searchTerm)
    );

    // Create items for each filtered UAV
    filteredUAVs.forEach(uav => {
        const item = document.createElement('div');
        item.className = 'item';
        item.textContent = uav.name;
        item.dataset.id = uav.id;
        listContainer.appendChild(item);
    });

    // list-container
    listContainer.style.display = 'flex';
}

// Function to show the extend container
function showExtendContainer(uav, extendContainer, windowId) {
    // Set the extend container content
    extendContainer.innerHTML = `
        <div class="extend-header">${uav.name}</div>
        <div class="extend-content">
            <img src="${uav.picture}" alt="${uav.name}">
            <p>Weight/Max Weight: ${uav['weight/max_weight']}</p>
            <p>Size: ${uav.size}</p>
            <p>Max Speed 3D: ${uav.max_speed3d}</p>
            <p>Vertical/Horizontal Hover Accuracy: ${uav['Vertical/horizontal hover accuracy'] || uav['Vertical/horizontal_hover_accuracy']}</p>
            <p>Maximum Flight Time: ${uav['maximum flight time'] || uav['maximum_flight_time']}</p>
            <p>Distance Per Charge: ${uav['distance_per_charge'] || uav['distance_per_charge']}</p>
            <p>Maximum Tilt Angle: ${uav['Maximum tilt Angle'] || uav['Maximum_tilt_Angle']}</p>
            <p>Minimum Delay: ${uav['Minimum delay'] || uav['Minimum_delay']}</p>
            <p>Battery Capacity: ${uav['Battery capacity'] || uav['Battery_capacity']}</p>
            <p>Battery Weight: ${uav['Battery weight'] || uav['Battery_weight']}</p>
            <p>Perceptual Aid: ${uav['Perceptual aid'] || uav['Perceptual_aid']}</p>
        </div>
        <button class="expand-button">${windowId === 'A' ? '<' : '>'}</button>
    `;

    // Show the extend container
    extendContainer.style.display = 'flex';
}

extendContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('expand-button')) {
        // "extend-container"
        if (extendContainer.style.display === 'none') {
            extendContainer.style.display = 'flex';
        } else {
            extendContainer.style.display = 'none';
        }
    }
});

// Function to toggle the expand state of the extend container
function toggleExpand(extendContainer, windowId) {
    if (extendContainer.style.display === 'none') {
        extendContainer.style.display = 'flex';
    } else {
        extendContainer.style.display = 'none';
    }
}