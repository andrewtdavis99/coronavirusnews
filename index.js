
// API Fetch
 function search(searchTerm, SearchLimit, sortBy) {
    return fetch('https://www.reddit.com/r/coronavirus/new.json?limit=100')
    
    .then(res => res.json())
    .then(data => data.data.children.map(data => data.data))
    .catch(err => console.log(err));
}

 // Search reddit
 search()
 .then(results => {
     console.log(results)
     let output = '<div class="row">';
     // Loop through
     results.slice(2).forEach(post => {
         // Check for image
         const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.pixabay.com/photo/2020/04/21/07/57/corona-5071972_960_720.jpg';
         output += `
         <div class="col-lg-6 col-md-6 mb-4">
        <div class="card">
         <img src="${image}" class="card-img-top" alt="..." style ="max-height: 285px;">
         <div class="card-body">
             <h6 class="card-title" style ="height: 96px;">${truncateText(post.title, 150)}</h6>
            
             <a href="${post.url}" target='_blank' class="btn btn-outline-secondary">Read More</a>
         </div>
         </div>
         </div>
        `;
     })
     output += '</div> ';
     document.getElementById('results').innerHTML = output;
 });

// Truncate text

function truncateText(text, limit) {
    const shortened = text.indexOf('', limit);
    if (shortened === -1) return text;
    return text.substring(0, shortened);


}