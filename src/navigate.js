var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('sky', 'assets/nav/sky.png');
    game.load.image('ground', 'assets/nav/platform.png');
    game.load.image('star', 'assets/nav/star.png');
    game.load.image('diamond', 'assets/nav/diamond.png');
    game.load.spritesheet('dude', 'assets/nav/dude.png', 32, 48);
}

function create() {
	this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    bg = game.add.sprite(0, 0, 'sky'); 
    bg.fixedToCamera = true;


    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    move_obj = game.add.group();
    stars = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    move_obj.enableBody = true;
    stars.enableBody = true;


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
    ledge.body.immovable = true; // commenting this out to see if ground falls when user jumps on it

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;





    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 60;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }



    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    diamond = move_obj.create(330, 320, 'diamond');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(diamond);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    // player.body.collideWorldBounds = true;

    diamond.body.gravity.y = 300;
    diamond.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() { // called by core game loop every frame

    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, move_obj);
    game.physics.arcade.collide(move_obj, platforms);
    game.physics.arcade.collide(stars, platforms);

        //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    diamond.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 250;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }

    // constantly check if player hits a star, if he does then call the collectStar method
    game.physics.arcade.overlap(player, stars, collectStar, null, this);


}

function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();

}