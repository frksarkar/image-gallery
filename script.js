const images = document.querySelector('.images');
const module = {
	numberOfImage: 10,
};

function randomNumber(number) {
	const num = Math.floor(Math.random() * number + 1);
	return num;
}

function imageElement() {
	const element = (image = `<li class="card">
    <img src="https://picsum.photos/${randomNumber(2)}00/${randomNumber(
		2
	)}00?random=${randomNumber(10)}" alt="" /> </li>`);

	return element;
}

function addImage() {
	for (let index = 0; index < module.numberOfImage; index++) {
		images.insertAdjacentHTML('beforeend', imageElement());
	}
}

addImage();
