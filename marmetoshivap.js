fetch('https://cdn.shopify.com/s/files/1/0856/4454/2232/files/habitatstyled-blog-posts.json?v=1707400041')
    .then(response => response.json())
    .then(data => {

        const heading = data.settings.heading_text;
        const tagLine = data.settings.description_text;
        const viewAllposts = data.settings.view_button_url;

        const topContainerEl = document.getElementById('top-container');

        topContainerEl.innerHTML = `
            <h1>${heading}</h1>
            <p>${tagLine}</p>
        `;

        const newsContainer = document.getElementById('news-container');

        data.blocks.forEach(block => {
            const articleContainer = document.createElement('div');
            articleContainer.classList.add('article-container');

            const articleImage = document.createElement('img');
            let imageClassname = block["id"];
            articleImage.src = block.settings.article_image;
            articleImage.alt = block.settings.article_title;
            articleImage.classList.add(imageClassname);

            const publishedDate = document.createElement('p');
            publishedDate.textContent = block.settings.article_published_date;

            const title = document.createElement('h2');
            title.textContent = block.settings.article_title;

            const url = document.createElement('a');
            url.href = block.settings.article_url;
            url.textContent = 'Read More';

            articleContainer.appendChild(articleImage);
            articleContainer.appendChild(publishedDate);
            articleContainer.appendChild(title);
            articleContainer.appendChild(url);

            newsContainer.appendChild(articleContainer);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.onscroll = function() {
    const topArrow = document.getElementById('top-arrow');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topArrow.style.display = 'block';
    } else {
        topArrow.style.display = 'none';
    }
};