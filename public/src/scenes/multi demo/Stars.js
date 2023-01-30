class Stars extends Phaser.Scene {

    constructor (handle, parent)
    {
        super(handle);

        this.parent = parent;

        this.blitter;

        this.width = 320;
        this.height = 220;
        this.depth = 1700;
        this.distance = 200;
        this.speed = 6;

        this.max = 300;
        this.xx = [];
        this.yy = [];
        this.zz = [];
    }

    create ()
    {
        this.input.on('pointerup', function (pointer) {
            console.log('Star pointerup...');
            // this.add.image(pointer.worldX, pointer.worldY, 'start').setScale(0.1);
            // pointer.event.stopPropagation();
        }, this);

        this.cameras.main.setViewport(this.parent.x, this.parent.y, Stars.WIDTH, Stars.HEIGHT);
        this.cameras.main.setBackgroundColor(0x000000);

        this.blitter = this.add.blitter(0, 0, 'star');

        for (let i = 0; i < this.max; i++)
        {
            this.xx[i] = Math.floor(Math.random() * this.width) - (this.width / 2);
            this.yy[i] = Math.floor(Math.random() * this.height) - (this.height / 2);
            this.zz[i] = Math.floor(Math.random() * this.depth) - 100;

            const perspective = this.distance / (this.distance - this.zz[i]);
            const x = (this.width / 2) + this.xx[i] * perspective;
            const y = (this.height / 2) + this.yy[i] * perspective;
            const a = (x < 0 || x > 320 || y < 20 || y > 260) ? 0 : 1;

            this.blitter.create(x, y);
        }

        const bg = this.add.image(0, 0, 'starsWindow').setOrigin(0);

        this.text = this.add.text(10, 20, 'Cursors to move', { font: '16px Courier', fill: '#00ff00' }).setScrollFactor(0);
    }

    update (time, delta)
    {
        const list = this.blitter.children.list;

        for (let i = 0; i < this.max; i++)
        {
            const perspective = this.distance / (this.distance - this.zz[i]);

            const x = (this.width / 2) + this.xx[i] * perspective;
            const y = (this.height / 2) + this.yy[i] * perspective;

            this.zz[i] += this.speed;

            if (this.zz[i] > this.distance)
            {
                this.zz[i] -= (this.distance * 2);
            }

            list[i].x = x;
            list[i].y = y;
            list[i].a = (x < 0 || x > 320 || y < 20 || y > 260) ? 0 : 1;
        }

        this.text.setText([
            'screen x: ' + this.input.x,
            'screen y: ' + this.input.y,
            'world x: ' + this.input.mousePointer.worldX,
            'world y: ' + this.input.mousePointer.worldY,
            'cam mid x:' + this.cameras.main.midPoint.x,
            'cam mid y:' + this.cameras.main.midPoint.y,

        ]);

       

    }

    refresh ()
    {
        this.cameras.main.setPosition(this.parent.x, this.parent.y);

        this.scene.bringToTop();
    }
}

Stars.WIDTH = 328;
Stars.HEIGHT = 266;
