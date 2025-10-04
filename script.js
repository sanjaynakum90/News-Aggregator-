const apiKey = "90df1c01fce94bacab261c3679d521a8";


document.getElementById("fetchBtn").addEventListener("click", () => fetchNews());


const fetchNews = async () => {
    const categorySelect = document.getElementById("categorySelect");
    const newsContainer = document.getElementById("newsContainer");
    const loadingSpinner = document.querySelector('.loading-spinner');

    loadingSpinner.style.display = 'inline-block';
    newsContainer.innerHTML = "";

    await new Promise(resolve => setTimeout(resolve, 100));

    try {
        
        const response = await fetch(`https://newsapi.org/v2/everything?q=Apple&sortBy=${categorySelect.value}&apiKey=${apiKey}`);
        const { status, articles } = await response.json();

        if (status !== "ok" || !articles.length) {
            newsContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info text-center" role="alert">
                        <i class="fas fa-info-circle me-2"></i>
                        No news found for "${categorySelect.value}". Try another category.
                    </div>
                </div>`;
            loadingSpinner.style.display = 'none';
            return;
        }

        
        const articleElements = articles.map(({ urlToImage, title, description, source, url }) => {
            const col = document.createElement("div");
            col.className = "col";
            
        
            col.innerHTML = `
                <div class="card h-100">
                    <img src="${urlToImage ?? 'https://via.placeholder.com/300x200/6c757d/ffffff?text=No+Image'}" 
                         class="card-img-top" alt="${title ?? 'News Image'}">
                    <div class="card-body">
                        <h5 class="card-title">${title ?? "No Title"}</h5>
                        <p class="card-text">${description ?? "No description available."}</p>
                        <p class="card-text"><small class="text-muted">Source: ${source.name ?? "Unknown"}</small></p>
                    </div>
                    <div class="card-footer bg-white border-0">
                        <a href="${url}" target="_blank" class="btn btn-outline-primary w-100">
                            Read More <i class="fas fa-arrow-right ms-2"></i>
                        </a>
                    </div>
                </div>`;
            return col;
        });

        newsContainer.append(...articleElements);

    } catch (error) {
        newsContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger text-center" role="alert">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Unable to fetch news. Please check your connection or try again later.
                </div>
            </div>`;
        console.error("Fetch error:", error);
    } finally {
        loadingSpinner.style.display = 'none';
    }
};