class Form{
    constructor(){
        this.input = createInput("name");
        this.button = createButton('play');
        this.greet = createElement('h2');
        this.reset = createButton('reset');
    }

    hide(){
        this.input.hide();
        this.button.hide();
        this.greet.hide();
    }

    display(){
        var title = createElement('h2');
        title.html("CAR RACING");
        title.position(displayWidth/2 - 90,0);
        this.input.position(displayWidth/2 -100,displayHeight/2 - 150);
        this.button.position(displayWidth/2 - 30,displayHeight/2 - 70);
        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playercount += 1;
            player.index = playercount;
            player.update();
            player.updateCount(playercount);
            this.greet.html("hello "+player.name);
            this.greet.position(displayWidth/2 - 70,40);
        });
        this.reset.position(displayWidth/2 - 40,70);
        this.reset.mousePressed(()=>{
            //gamestate = 0;
            game.update(0);
            player.updateCount(0);
            var rem = database.ref('players');
            rem.remove();
        });
    }
}