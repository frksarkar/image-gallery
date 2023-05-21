const images = document.querySelector('.images');
const loadingButton = document.querySelector('.load-more');
const searchInput = document.querySelector('.search-box input');
const showImage = document.querySelector('.image-view-box');
const exitShowImage = showImage.querySelector('.buttons ');
const module = {
	apiKey: 'rymXHG9HH8RV7K8SsSS4iSqggLPIwyYtIjUEApVG95OhURkuOHpH4WSO',
	numberOfImage: 15,
	pageNumber: 1,
	searchWord: null,
};

const getImages = (url) => {
	loadingButton.innerHTML = 'lodging...';
	loadingButton.classList.add('disable');
	fetch(url, {
		headers: { Authorization: module.apiKey },
	})
		.then((res) => res.json())
		.then((data) => {
			imageElement(data.photos);
			loadingButton.innerHTML = 'Load More';
			loadingButton.classList.remove('disable');
		})
		.catch(() => {
			window.alert('Failed to load images!');
		});
};

getImages(
	`https://api.pexels.com/v1/curated?page=${module.pageNumber}&per_page=${module.numberOfImage}`
);

function randomNumber(number) {
	const num = Math.floor(Math.random() * number + 1);
	return num;
}

const downloadImg = (link) => {
	fetch(link)
		.then((res) => res.blob())
		.then((file) => {
			const a = document.createElement('a');
			a.href = URL.createObjectURL(file);
			a.download = new Date().getTime();
			a.click();
		});
};

function showImageBox(name, img) {
	showImage.querySelector('span').innerHTML = name;
	showImage.querySelector('img').src = img;
	showImage.style.display = 'block';
}

function imageElement(photos) {
	photos.forEach((element) => {
		const tag = `<li class="card" onclick="showImageBox('${element.photographer}','${element.src.large2x}')">
		<img src="${element.src.large2x}" alt="" />
		<div class="details">
			<div class="photographer">
				<i class="fa fa-camera"></i>
				<span>${element.photographer}</span>
			</div>
			<button onclick="downloadImg('${element.src.large2x}')">
				<i class="fa-solid fa-download"></i>
			</button>
		</div>
		</li>`;
		images.insertAdjacentHTML('beforeend', tag);
	});
}

loadingButton.addEventListener('click', () => {
	module.pageNumber += 1;

	let url = `https://api.pexels.com/v1/curated?page=${module.pageNumber}&per_page=${module.numberOfImage}`;
	url = module.searchWord
		? `https://api.pexels.com/v1/search?query=${module.searchWord}?page=${module.pageNumber}&per_page=${module.numberOfImage}`
		: url;
	getImages(url);
});

searchInput.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		module.searchWord = e.target.value;
		module.pageNumber = 1;
		images.innerHTML = '';
		const url = `https://api.pexels.com/v1/search?query=${module.searchWord}?page=${module.pageNumber}&per_page=${module.numberOfImage}`;
		getImages(url);
	}
});
