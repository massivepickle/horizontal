class Game{
    constructor(){}
    getState(){
        var z = database.ref('gamestate');
        z.on("value",function(data){
            gamestate = data.val();
        });
    }

    update(state){
        database.ref('/').update({
            gamestate: state
        });
    }

    async start(){
        if(gamestate === 0){
            player= new Player();
            var playercountref = await database.ref('playercount').once("value");
            if(playercountref.exists()){
                playercount = playercountref.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
        c1 = createSprite(100,200,20,20);
        c2 = createSprite(300,200,20,20);
        c3 = createSprite(500,200,20,20);
        c4 = createSprite(700,200,20,20);
        jumping = createSprite(500,30,10,10);
        ground = createSprite(500,0,100,10);
        c1.scale = 0.8;
        c2.scale = 0.7;
        c3.scale = 0.7;
        c4.scale = 0.7;
        c1.addAnimation("car",anime);
        c2.addAnimation("car",anime);
        c3.addAnimation("car",anime);
        c4.addAnimation("car",anime);
        cars = [c1,c2,c3,c4];
    }

    play(){
        background(rgb(0,0,0));
        image(tracki,0,0,displayWidth*5,displayHeight)
        form.hide();
        textSize(30);
        text("game start",camera.position.x,camera.position.y);
        jumping.x = camera.position.x;
        ground.x = camera. position.x;
        jumping.collide(ground);
        jumping.velocityY = jumping.velocityY + gravity;
        player.yp = jumping.y - 10;
        player.update();
        Player.getAllPlayer();
        var index = 0;
        var y = 140, x;
        if(allPlayer !== undefined){
            var display_pos = 130;
            for(var plr in allPlayer){
                index = index + 1;
                if(plr === "player"+1){
                    if(plr === "player"+player.index)
                    y = y + 234 - player.yp;
                    else
                    y = y + 234;
                }
                else if(plr === "player"+2){
                    if(plr === "player"+player.index)
                    y = y + 233 - player.yp;
                    else
                    y = y + 233;
                }
                else if(plr === "player"+3){
                    if(plr === "player"+player.index)
                    y = y + 216 - player.yp;
                    else
                    y = y + 216;
                }
                else if(plr === "player"+4){
                    if(plr === "player"+player.index)
                    y = y + 203 - player.yp;
                    else
                    y = y + 203;
                }
                y = y - allPlayer[plr].yd;
                x = 200 + allPlayer[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
                if(index === player.index){
                    //camera.position.x = displayWidth/2 - 50;
                    y = y - jumping.y;
                    stroke(10);
                    fill("red");
                    ellipse(x,y-30,10,10);
                    camera.position.x = cars[index-1].x;
                }
                if(plr === "player"+player.index)
                fill("red");
                else
                fill("black");
                display_pos += 20;
                textSize(15);
                text(allPlayer[plr].name+": "+allPlayer[plr].distance,camera.position.x-200,display_pos);
            }
        }
        if(keyIsDown(UP_ARROW) && player.index !== null && jumping.y < 11){
            jumping.velocityY += 11;
        }
        if(keyIsDown(RIGHT_ARROW) && player.index !== null){
            player.distance += 50;
            player.update();        
        }
        if(keyIsDown(LEFT_ARROW) && player.index !== null){
            player.distance -= 50;
            player.update();        
        }
        if(player.distance >= 7500){
            gamestate = 2;
        }
    }

    end(){
        clear();
        player.distance = 7501;
        player.update();
    }
}