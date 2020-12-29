// Select API feed by country or region  
document.querySelectorAll(".country").forEach(item => {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(e.target.id);
        let region = e.target.id;
        search(region)
            .then(results => {
                console.log(results)
                let output = '<div class="row">';
                // Loop through
                results.slice(2).forEach(post => {
                    // Check for image
                    const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.pixabay.com/photo/2020/04/21/07/57/corona-5071972_960_720.jpg';
                    const postTitle = post.title;
                    const url = post.url;
                    output += cards(image, postTitle, url);
                    })
                output += '</div> ';
                document.getElementById('results').innerHTML = output;
            });

        $('#navbarNav').removeClass('show');
        $('#new').removeClass("active");
        $('#hot').addClass("active");

        
    });
});

// Select API feed by trending and new

document.getElementById("tabNode").addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e.target);
    let cat = e.target.id;
    search(newsType, cat)
        .then(results => {
            console.log(results)
            let output = '<div class="row">';
            // Loop through
            results.slice(2).forEach(post => {
                // Check for image
                const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.pixabay.com/photo/2020/04/21/07/57/corona-5071972_960_720.jpg';
                const postTitle = post.title;
                const url = post.url;
                output += cards(image, postTitle, url);
            })
            output += '</div> ';
            document.getElementById('results').innerHTML = output;

        });

});


// API Fetch
function search(searchTerm = "coronavirus", top = "") {
    return fetch(`https://www.reddit.com/r/${searchTerm}/${top}.json?limit=100`)
        .then(newsType = searchTerm)
        .then(res => res.json())
        .then(data => data.data.children.map(data => data.data))
        .catch(err => console.log(err));
};

// Search reddit
search()
    .then(results => {
        console.log(results)
        let output = '<div class="row">';
        // Loop through
        results.slice(2).forEach(post => {
            // Check for image
            const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.pixabay.com/photo/2020/04/21/07/57/corona-5071972_960_720.jpg';
            const postTitle = post.title;
            const url = post.url;
            output +=   cards(image, postTitle, url);
        })
        output += '</div> ';
        document.getElementById('results').innerHTML = output;
       
    });



// Truncate text

function truncateText(text, limit) {
    const shortened = text.indexOf('', limit);
    if (shortened === -1) return text;
    return text.substring(0, shortened);
};

// Function for displaying API data in a card format
function cards(image, postTitle, url) {
  return `
  <div class="card-pic col-sm-3 mt-3">
  <img class="card w-100" src="${image}" alt="">
</div>

  <div class="card-text col-sm-9 sm-mt-3">
  <div class="card-block">
    <p>${truncateText(postTitle, 150)}</p>
    <a href="${url}" class="btn  btn-sm btn-outline-secondary" target="_blank">Read More</a>
  </div>
</div>
`
};

// Scroll up arrow

document.querySelector('.scroll-btn').addEventListener('click', () => {
    document.querySelector('html').style.scrollBehavior = 'smooth';
    setTimeout(() => {
        document.querySelector('html').style.scrollBehavior = 'unset';
    }, 1000);
});

// Display the scroll up arrow after scrolling down the page
mybutton = document.querySelector(".scroll-btn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }
}