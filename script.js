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
    <img src="https://picsum.photos/${randomNumber(2)}000/${randomNumber(
		2
	)}000?random=${randomNumber(100)}" alt="" />
	<div class="details">
		<div class="photographer">
			<i class="fa fa-camera"></i>
				<span> Maria watson </span>
		</div>
		<button><i class="fa-solid fa-download"></i></button>
	</div>
	</li>`);

	return element;
}

function addImage() {
	for (let index = 0; index < module.numberOfImage; index++) {
		images.insertAdjacentHTML('beforeend', imageElement());
	}
}

addImage();
