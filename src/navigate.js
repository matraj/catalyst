var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('sky', 'assets/nav/sky.png');
    game.load.image('ground', 'assets/nav/platform.png');
    game.load.image('star', 'assets/nav/star.png');
    game.load.spritesheet('dude', 'assets/nav/dude.png', 32, 48);
}

function create() {
	this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky'); 

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground'); // x,y coordinates from 0,0 (top left corner)

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(500, 450, 'ground'); // x,y coordinates from 0,0 (top left corner)
    ledge.scale.setTo(1/3, 1); // multiplies the x and y of obj to scale its size
    ledge.body.immovable = true;

    ledge = platforms.create(320, 350, 'ground'); // x,y coordinates from 0,0 (top left corner)
    ledge.scale.setTo(1/3, 1); // multiplies the x and y of obj to scale its size
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;

}

function update() {
}