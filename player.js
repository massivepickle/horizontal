class Player{
    constructor(){
        this.index = null;
        this.distance = 0;
        this.yp = 0;
        this.name = null;
    }

    getCount(){
        var p = database.ref('playercount');
        p.on("value",function(data){
            playercount = data.val();
        });
    }

    updateCount(count){
        database.ref('/').update({
            playercount: count
        });
    }

    update(){
        var playerindex = "players/player"+this.index;
        database.ref(playerindex).set({
            name: this.name,
            distance: this.distance,
            yd: this.yp
        });
    }

    static getAllPlayer(){
        var playersinfo = database.ref('players');
        playersinfo.on("value",(data)=>{
            allPlayer = data.val();
        })
    }
}