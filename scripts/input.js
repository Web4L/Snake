import { setDirection } from "./snake.js";

//get when a key is pressed
document.addEventListener("keydown", (event) => {
	//switch statement to change direction
	switch (event.key) {
		case "ArrowUp":
			setDirection("up");
			break;
		case "ArrowDown":
			setDirection("down");
			break;
		case "ArrowLeft":
			setDirection("left");
			break;
		case "ArrowRight":
			setDirection("right");
			break;
	}
});
