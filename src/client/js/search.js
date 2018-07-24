const searchInput = document.querySelector('#search input');
const searchSvg = document.querySelector('#search svg');

const MIN_QUERY_LENGTH = 3;

searchInput.onkeyup = (event) => {
  if (event.keyCode === 13) {
    doSearch();
  }
};

searchSvg.onclick = doSearch;

function doSearch() {
  const query = searchInput.value;
  if (query.length >= MIN_QUERY_LENGTH) {
    document.location.href = `/search/${query}`;
  }
}
