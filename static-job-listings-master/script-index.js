let allJobs = [];
let selectedFilters = [];

const renderSearchBar = () => {
    const searchBar = document.getElementById("Search-bar");
    const filterContainer = document.getElementById("filter-container");

    filterContainer.innerHTML = "";

    if (selectedFilters.length === 0) {
        searchBar.style.display = "none";
        return;
    }

    searchBar.style.display = "flex";

    selectedFilters.forEach(filter => {
        const filterElement = document.createElement("div");
        filterElement.className = "filter-tag";

        const filterText = document.createElement("span");
        filterText.className = "tools-name";
        filterText.textContent = filter;

        const removeButton = document.createElement("button");
        removeButton.className = "remove-filter";
        removeButton.dataset.filter = filter;
        removeButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

        removeButton.addEventListener("click", (e) => {
            removeFilter(e.target.closest("button").dataset.filter);
        });

        filterElement.appendChild(filterText);
        filterElement.appendChild(removeButton);
        filterContainer.appendChild(filterElement);
    });
};

const filterJobs = (filterText) => {
    if (!selectedFilters.includes(filterText)) {
        selectedFilters.push(filterText);
        renderSearchBar();
    }

    const filteredJobs = allJobs.jobs.filter(job =>
        selectedFilters.every(filter =>
            job.role === filter ||
            job.level === filter ||
            job.languages.includes(filter) ||
            (job.tools && job.tools.includes(filter))
        )
    );

    renderJobs(filteredJobs);
};

const removeFilter = (filterText) => {
    selectedFilters = selectedFilters.filter(filter => filter !== filterText);
    renderSearchBar();

    const filteredJobs = allJobs.jobs.filter(job =>
        selectedFilters.every(filter =>
            job.role === filter ||
            job.level === filter ||
            job.languages.includes(filter) ||
            (job.tools && job.tools.includes(filter))
        )
    );

    renderJobs(selectedFilters.length > 0 ? filteredJobs : allJobs.jobs);
};

const renderJobs = (jobs) => {
    const container = document.getElementById("main-container-items");
    container.innerHTML = "";

    jobs.forEach(job => {
        const imgSrc = `./images/${job.company.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}.svg`;

        const containerClasses = job.featured ? "item-container border-active-left" : "item-container";

        const newElement = document.createElement("div");
        newElement.className = containerClasses

        newElement.innerHTML = `
            <div class="item-container-info">
                <div class="item-container-img">
                    <img src="${imgSrc}" alt="${job.company}">
                </div>
                <div class="item-container-text">
                    <div class="item-container-text-header">
                        <h3 class="primary-color-text font-w-7">${job.company}</h3>
                        ${job.new ? `<h4 class="font-9 pd-5 circle-10 font-white primary-color-bg">NEW!</h4>` : ""}
                        ${job.featured ? `<h4 class="font-9 pd-5 circle-10 font-white very-dark-gray-bg">FEATURED</h4>` : ""}
                    </div>
                    <p class="font-w-7 clicked-text">${job.position}</p>
                    <div class="footer-item-info">
                        <p class="primary-color-text">${job.posted}</p>
                        <ul class="list-item-info primary-color-text">
                            <li>${job.contract}</li>
                            <li>${job.location}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="item-container-technologies">
                ${[job.role, job.level, ...job.languages, ...(job.tools || [])]
            .map(tech => `<p class="pd-5 primary-color-text light-gray-bg font-w-5 clicked circle-5 clicked-bg">${tech}</p>`)
            .join("")}
            </div>
        `;

        container.appendChild(newElement);
    });

    attachFilterEvents();
};

const attachFilterEvents = () => {
    document.querySelectorAll(".clicked").forEach(item => {
        item.addEventListener("click", (e) => {
            const selectedText = e.target.textContent.trim();
            filterJobs(selectedText);
        });
    });
};

const clearAllFilters = () => {
    selectedFilters = [];
    renderSearchBar();
    renderJobs(allJobs.jobs);
};

const loadJobs = async () => {
    try {
        const response = await fetch("./data.json");
        if (!response.ok) throw new Error("Error in charge the JSON");
        allJobs = await response.json();
        renderJobs(allJobs.jobs);
    } catch (error) {
        console.error(error);
    }
};

document.getElementById("clear-filters").addEventListener("click", clearAllFilters);
window.addEventListener("load", loadJobs);
