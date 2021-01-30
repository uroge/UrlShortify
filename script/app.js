const shortenBtn = document.getElementById('input-btn');
const userInput = document.querySelector('.input-sh');

const links = [];
// const url = new URL("https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html");

function sendHttpRequest(method, url, data) {
  return fetch(url).then(response => {
    return response.json();
  });
}

async function fetchPosts(link) {
  const url = new URL(`https://api.shrtco.de/v2/shorten?url=${link}/very/long/link.html`);

  const responseData = await sendHttpRequest(
    'POST',
    url
  );
  console.log(responseData);
  return responseData.result.full_short_link;
}



const isURL = (str) => {
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var pattern = new RegExp(expression);

  return pattern.test(str);
}

const clearInput = () => {
  userInput.value = '';
}

const renderNewLink = (url, shorterUrl) => {
  const newLinkEl = document.createElement('li');
  newLinkEl.className = 'links-li';
  newLinkEl.innerHTML = `
      <div class="container">
        <div class="row links-row p-3">
          <div class="col-12 col-md-6 user-link align-self-center">
            <p class="mb-0">${url}</p>
          </div>
          <div class="link-buttons ml-auto d-flex">
            <div class="align-items-center  d-flex flex-column flex-md-row flex-wrap justify-content-between">
              <span class="mr-4 shorter-link-p">
                <a href="${shorterUrl}" target="_blank" class="shorter-link">${shorterUrl}</a>
              </span>
              <span class="button-p">
                <a href="#" class="copy-btn btn">Copy</a>
              </span>
            </div>
          </div>
        </div>
      </div>
  `;
  const listRoot = document.getElementById('links-list');
  listRoot.append(newLinkEl);
};

async function addHandler() {
  const link = userInput.value;
  const shorterLink = await fetchPosts(link);

  if(!isURL(link)){
      alert('Plese enter valid url');
      return;
  } else {
      links.push(link);
      console.log(links);
      clearInput();
      renderNewLink(link, shorterLink);
  }
}

shortenBtn.addEventListener('click', addHandler);

