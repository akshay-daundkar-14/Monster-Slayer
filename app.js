
function getRandomValue(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data(){
        return{
            playerHealth:100,
            monsterHealth:100,
            currentRound:0,
            winner:null,
            logMessages :[]
        }
    },
    computed:{
        monsterBarStyle(){
            if(this.monsterHealth <= 0)
            {
                return {width: '0%'};
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyle(){
            if(this.playerHealth <= 0)
                {
                    return {width: '0%'};
                }
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !==0;
        }
    },
    watch:{

        playerHealth(value){
            if(value <=0 && this.monsterHealth <=0){
                this.winner = "draw";
            }else if(value <=0){
                this.winner = "monster"
            }
        },

        monsterHealth(value){
            if(value <=0 && this.playerHealth <=0){
                this.winner = "draw";
            }else if(value <=0){
                this.winner = "player"
            }
        }
    },
    methods:{

        attackMonster(){
            console.log("Attack Monster");
            this.currentRound++;
            const attackValue = getRandomValue(5,12);
            if(this.monsterHealth - attackValue < 0)
            {
                this.monsterHealth = 0;
            }else{
                this.monsterHealth -= attackValue;
            }
            this.loggingMessages('Player',"Attack",attackValue);
            this.attackPlayer();
        },

        attackPlayer(){
            console.log("Attack Player");
            const attackValue = getRandomValue(8,15);
            if (this.playerHealth - attackValue <0) {
                this.playerHealth =0;
            }
            else{
                this.playerHealth -= attackValue;
            }
            this.loggingMessages('Monster',"Attack",attackValue);    
        },

        specialAttackMonster(){
            console.log("Special Attack Monster");
            this.currentRound++;
            const attackValue = getRandomValue(10,25);
            if(this.monsterHealth - attackValue < 0)
                {
                    this.monsterHealth = 0;
                }else{
                    this.monsterHealth -= attackValue;
                }
            this.monsterHealth -= attackValue;
            this.loggingMessages('Player',"Special-Attack",attackValue);
            this.attackPlayer();
        },

        healPlayer(){
            console.log("HEAL Player");
            this.currentRound++;
            const healValue = getRandomValue(8,20);
            console.log("Player Health ",this.playerHealth);
            if(this.playerHealth + healValue > 100)
            {
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }
            this.loggingMessages('Player',"Heal",healValue);
            this.attackPlayer();
        },

        surrenderPlayer(){
            console.log("Surrender Player");
            this.playerHealth = 0;
            this.loggingMessages('Player',"Surrender",0);
        },

        newGame(){
            this.playerHealth =100;
            this.monsterHealth=100;
            this.currentRound=0;
            this.winner=null;
            this.logMessages = [];
        },

        loggingMessages(who,what,value){
            this.logMessages.unshift({
                actionBy:who,
                actionType:what,
                actionValue:value
            });
        }
    }
});


app.mount('#game');