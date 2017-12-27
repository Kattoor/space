const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const player = {
    position: {x: 0, y: 0},
    velocity: {x: 0, y: 0},
    acceleration: {x: 0, y: 0},
    accelerating: {left: false, up: false, right: false, down: false}
};


document.body.onkeydown = e => {
    if (e.keyCode >= 37 && e.keyCode <= 40)
        player.accelerating[Object.keys(player.accelerating)[e.keyCode - 37]] = true;
};

document.body.onkeyup = e => {
    if (e.keyCode >= 37 && e.keyCode <= 40)
        player.accelerating[Object.keys(player.accelerating)[e.keyCode - 37]] = false;
};

setInterval(() => {
    update();
    draw();
}, 1000 / 60);

function update() {
    updatePlayer();
}

function draw() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(player.position.x, player.position.y, 50, 50);
}

function updatePlayer() {
    /* Update acceleration */
    Object.keys(player.accelerating).forEach((direction, index) => {
        const axis = Object.keys(player.acceleration)[index % 2];
        const directionSign = index <= 1 ? -1 : 1;
        if (player.accelerating[direction])
            player.acceleration[axis] = directionSign;
        else if (player.acceleration[axis] === directionSign) // only reset if going same direction on the axis
                player.acceleration[axis] = 0;
    });

      /* Update velocity */
      player.velocity.x += player.acceleration.x;
      player.velocity.y += player.acceleration.y;
      applyFriction();

      /* Update position */
      player.position.x += player.velocity.x;
      player.position.y += player.velocity.y;
}

function applyFriction() {
    if (Math.abs(player.velocity.x) > 0.0001)
        player.velocity.x = player.velocity.x / 10 * 9.99;
    else
        player.velocity.x = 0;

    if (Math.abs(player.velocity.y) > 0.0001)
        player.velocity.y = player.velocity.y / 10 * 9.99;
    else
        player.velocity.y = 0;

    console.log(player.velocity);
}