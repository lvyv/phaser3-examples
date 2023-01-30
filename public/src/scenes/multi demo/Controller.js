class Widget extends Phaser.GameObjects.Zone {
    constructor(scene, x, y, width, height) {
      super(scene, x, y, width, height);
      scene.add.existing(this);
    }

    setTint(color)
    {
        console.log(color);
    }
}
  

class Controller extends Phaser.Scene {

    constructor() {
        super();

        this.count = 0;

        this.workbench;
        this.workbenchTitle;
        // this.workbenchIcons;
        this.map;

        this.player;
        this.cursors;
        this.text;
    }

    preload() {
        /* Awen */
        this.load.image('cad', 'assets/phaser3/cad.png');
        this.load.image('start', 'assets/input/s.png');
        this.load.image('end', 'assets/input/e.png');
        this.load.image('block', 'assets/sprites/block.png');


        // this.load.image('disk', 'assets/phaser3/disk.png');
        this.load.image('workbenchTitle', 'assets/phaser3/workbench-title.png');
        // this.load.image('workbenchIcons', 'assets/phaser3/workbench-icons.png');
        this.load.image('toolbar', 'assets/phaser3/toolbar.png');
        this.load.image('eyesIcon', 'assets/phaser3/eyes-icon.png');
        this.load.image('starsIcon', 'assets/phaser3/stars-icon.png');
        this.load.image('jugglerIcon', 'assets/phaser3/juggler-icon.png');
        this.load.image('twistIcon', 'assets/phaser3/twist-icon.png');
        this.load.image('invadersIcon', 'assets/phaser3/invaders-icon.png');
        this.load.image('clockIcon', 'assets/phaser3/clock-icon.png');
        this.load.image('boingIcon', 'assets/phaser3/boing-icon.png');
        this.load.image('starsWindow', 'assets/phaser3/stars-window.png');
        this.load.image('sineWindow', 'assets/phaser3/sinewave-window.png');
        this.load.image('eyesWindow', 'assets/phaser3/eyes-window.png');
        this.load.image('jugglerWindow', 'assets/phaser3/juggler-window.png');
        this.load.image('invadersWindow', 'assets/phaser3/invaders-window.png');
        this.load.image('clockWindow', 'assets/phaser3/clock-window.png');

        this.load.atlas('boing', 'assets/phaser3/boing.png', 'assets/phaser3/boing.json');

        this.load.spritesheet('juggler', 'assets/phaser3/juggler.png', { frameWidth: 128, frameHeight: 184 });
        this.load.image('star', 'assets/phaser3/star2.png');
        this.load.image('eye', 'assets/phaser3/eye.png');

        this.load.image('invaders.boom', 'assets/games/multi/boom.png');
        this.load.spritesheet('invaders.bullet', 'assets/games/multi/bullet.png', { frameWidth: 12, frameHeight: 14 });
        this.load.image('invaders.bullet2', 'assets/games/multi/bullet2.png');
        this.load.image('invaders.explode', 'assets/games/multi/explode.png');
        this.load.spritesheet('invaders.invader1', 'assets/games/multi/invader1.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('invaders.invader2', 'assets/games/multi/invader2.png', { frameWidth: 22, frameHeight: 16 });
        this.load.spritesheet('invaders.invader3', 'assets/games/multi/invader3.png', { frameWidth: 24, frameHeight: 16 });
        this.load.image('invaders.mothership', 'assets/games/multi/mothership.png');
        this.load.image('invaders.ship', 'assets/games/multi/ship.png');
    }

    create() {
        //  Create animations

        this.anims.create({
            key: 'juggler',
            frames: this.anims.generateFrameNumbers('juggler'),
            frameRate: 28,
            repeat: -1
        });

        this.anims.create({
            key: 'boing',
            frames: this.anims.generateFrameNames('boing', { prefix: 'boing', start: 1, end: 14 }),
            frameRate: 28,
            repeat: -1
        });

        this.anims.create({
            key: 'bullet',
            frames: this.anims.generateFrameNumbers('invaders.bullet'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'invader1',
            frames: this.anims.generateFrameNumbers('invaders.invader1'),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'invader2',
            frames: this.anims.generateFrameNumbers('invaders.invader2'),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'invader3',
            frames: this.anims.generateFrameNumbers('invaders.invader3'),
            frameRate: 2,
            repeat: -1
        });

        
        this.map = this.add.image(0, 0, 'cad').setOrigin(0);
        this.map.alpha = 0.5;
        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
        this.physics.world.setBounds(0, 0, this.map.width, this.map.height);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.image(4000, 1500, 'block').setInteractive();
        this.player.setCollideWorldBounds(true);
        this.player.setVisible(false);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        
        this.text = this.add.text(10, 10, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);
        const toolbar = this.add.image(0, 0, 'toolbar').setOrigin(0).setScrollFactor(0);
        const eyesIcon = this.add.zone(0, 0, 120, 98).setOrigin(0).setName('btn1').setScrollFactor(0).setInteractive();
        const clockIcon = this.add.zone(120, 0, 100, 98).setOrigin(0).setName('btn2').setScrollFactor(0).setInteractive();
        const jugglerIcon = this.add.zone(220, 0, 100, 98).setOrigin(0).setName('btn3').setScrollFactor(0).setInteractive();
        const starsIcon = this.add.zone(0, 320, 0, 98).setOrigin(0).setName('btn4').setScrollFactor(0).setInteractive();
        const invadersIcon = this.add.zone(420, 0, 100, 98).setOrigin(0).setName('btn5').setScrollFactor(0).setInteractive();
        const boingIcon = this.add.zone(520, 0, 100, 98).setOrigin(0).setName('btn6').setScrollFactor(0).setInteractive();

        const demosContainer = this.add.container(100, 400, [ toolbar, eyesIcon, jugglerIcon, starsIcon, invadersIcon, clockIcon, boingIcon]);
        demosContainer.setVisible(true);
        demosContainer.setInteractive(new Phaser.Geom.Rectangle(0, 0, toolbar.width, toolbar.height), Phaser.Geom.Rectangle.Contains);
        demosContainer.setName('toolbarcontainer');
        demosContainer.setScrollFactor(0);
        this.input.setDraggable(demosContainer);

        demosContainer.on('drag', function (pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
        });
        this.input.on('pointerup', function (pointer) {
            console.log('controller pointerup...');
            var pt = this.add.image(pointer.worldX, pointer.worldY, 'start').setScale(0.1).setInteractive();
            pt.on('pointerup', pointer=>{
                pointer.event.stopPropagation();
                pt.destroy();
            });
        }, this);
        this.input.on('gameobjectup', function (pointer, gameObject, event)
        {
            console.log('Controller Scene: gameobjectup...', gameObject);
            if (gameObject) {
                switch(gameObject.name) {
                    case 'btn1':
                        // cover minimap to receive events，0.06 大概是16倍，原始地图是5243x3664
                        this.createWindow(Clock, 1500, 600, 318, 222, true);
                        break;
                    case 'btn2':
                        this.createWindow(Stars);
                        break;
                    case 'btn3':
                        break;
                    case 'btn4':
                        break;     
                    case 'btn5':
                        break;
                    case 'btn6':
                        break;                     
                    default:
                        break;
                }
            }
            event.stopPropagation();
        }, this);
        // eyesIcon.on('pointerup', function () {
        //     this.createWindow(Eyes);
        // }, this);

        // jugglerIcon.on('pointerup', function () {
        //     if(this.getData('toggle')){
        //         this.setData({'toggle': false});
        //         this.setTint(0x0000ff);
        //     } else {
        //         this.setData({'toggle': true});
        //         this.setTint(0x00ff00);
        //     }
        // });

        // starsIcon.on('pointerup', function () {

        //     this.createWindow(Stars);

        // }, this);

        // invadersIcon.on('pointerup', function () {

        //     this.createWindow(Invaders);

        // }, this);

        // clockIcon.on('pointerup', function () {
        //     // cover minimap to receive events，0.06 大概是16倍，原始地图是5243x3664
        //     this.createWindow(Clock, 1500, 600, 318, 222, true);

        // }, this);

        // boingIcon.on('pointerup', function () {

        //     this.createWindow(Boing);

        // }, this);


        // 0.06 大概是16倍，原始地图是5243x3664
        this.minimap = this.cameras.add(1500, 600, 318, 222).setZoom(0.06).setName('mini');
        this.minimap.setBackgroundColor('rgba(0,0,0,0.5)');
        this.minimap.scrollX = 2464;
        this.minimap.scrollY = 1720;
        this.minimap.ignore([demosContainer, this.text]);
    }


    update() {
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-2000);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(2000);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-2000);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(2000);
        }
        else if (this.cursors.space.isDown) {
            this.cameras.main.zoomTo(0.5, 500);
        }
        else if (this.cursors.shift.isDown) {
            this.cameras.main.zoomTo(1, 500);
        }

        let cam = this.cameras.main;
        if (cam.deadzone)
        {
            this.text.setText([
                'ScrollX: ' + cam.scrollX,
                'ScrollY: ' + cam.scrollY,
                'MidX: ' + cam.midPoint.x,
                'MidY: ' + cam.midPoint.y,
                'deadzone left: ' + cam.deadzone.left,
                'deadzone right: ' + cam.deadzone.right,
                'deadzone top: ' + cam.deadzone.top,
                'deadzone bottom: ' + cam.deadzone.bottom
            ]);
        }
        else
        {
            this.text.setText([
                'ScrollX: ' + cam.scrollX,
                'ScrollY: ' + cam.scrollY,
                'MidX: ' + cam.midPoint.x,
                'MidY: ' + cam.midPoint.y
            ]);
        }
    }

    createWindow(func,  xx, yy, ww, hh, fix) {
        const x = Phaser.Math.Between(400, 600);
        const y = Phaser.Math.Between(64, 128);

        const handle = 'window' + this.count++;

        // const win = this.add.zone(x, y, func.WIDTH, func.HEIGHT).setInteractive().setOrigin(0);
        let win;
        if(xx && yy && ww && hh)
            win = new Widget(this, xx, yy, ww, hh).setScrollFactor(0).setInteractive().setOrigin(0);
        else
            win = new Widget(this, x, y, func.WIDTH, func.HEIGHT).setScrollFactor(0).setInteractive().setOrigin(0);

        const demo = new func(handle, win);
        if(fix)
            console.log('fix') 
        else {
            this.input.setDraggable(win);
            win.on('drag', function (pointer, dragX, dragY) {

                this.x = dragX;
                this.y = dragY;

                demo.refresh();
                pointer.event.stopPropagation();

            });
        }

        win.on('pointerup', (pointer, localX, localY) => {
            // bring to top.
            demo.refresh();
            if (localX < 20 && localY < 20) {
                this.scene.remove(handle);
                
                win.destroy();
            };
            pointer.event.stopPropagation();
        }, this)

        this.scene.add(handle, demo, true);
    }

    resize(width, height) {
        if (width === undefined) { width = this.game.config.width; }
        if (height === undefined) { height = this.game.config.height; }

        this.cameras.resize(width, height);

        // this.workbench.clear();
        // this.workbench.fillStyle(0xffffff);
        // this.workbench.fillRect(0, 0, width - 105, 20);

        // this.workbenchIcons.x = (width - 87);
    }

}
