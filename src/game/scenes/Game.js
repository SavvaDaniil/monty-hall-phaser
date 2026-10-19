import { Scene } from 'phaser';
import GameState from '../models/GameState.js';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.image('goat', 'goat.png');
        this.load.image('door-closed', 'door-closed.png');
        this.load.image('door-opened', 'door-opened.png');
        this.load.image('Monty-Hall-0', 'Monty-Hall-0.png');
        this.load.image('Monty-Hall-1', 'Monty-Hall-1.png');
        this.load.image('Monty-Hall-lose', 'Monty-Hall-lose.png');
        this.load.image('Monty-Hall-win', 'Monty-Hall-win.png');
        this.load.image('car-part', 'car-part.png');
        this.load.image('cloud-for-text', 'cloud-for-text.png');
        this.load.image('box-for-text', 'box-for-text.png');
    }

    create ()
    {
        this.doors = [];
        this.behindDoorsImgs = [];

        this.gameState = GameState.CHOOSING;

        this.initialPlayerDoorId = null;
        this.finalPlayerDoorId = null;
        this.montyDoorId = null;
        this.prizeDoorId = null;


        this.add.text(512, 100, 'ПАРАДОКС МОНТИ-ХОЛЛА', {
            fontFamily: 'Arial',
            fontSize: 42,
            color: '#ffffff'
        }).setOrigin(0.5);


        this.montyHall0 = this.add.image(
            800, 616,
            "Monty-Hall-0"
        );
        this.montyHall0.setDisplaySize(360, 360 * 443 / 522);
        this.montyHall0.setVisible(false);
        this.montyHall0.setDepth(100);

        this.montyHall1 = this.add.image(
            890, 616,
            "Monty-Hall-1"
        );
        this.montyHall1.setDisplaySize(216, 216 * 1207 / 857);
        this.montyHall1.setVisible(false);
        this.montyHall1.setDepth(100);

        this.montyHallLose = this.add.image(
            870, 620,
            "Monty-Hall-lose"
        );
        this.montyHallLose.setDisplaySize(300, 300 * 511 / 518);
        this.montyHallLose.setVisible(false);
        this.montyHallLose.setDepth(100);

        this.montyHallWin = this.add.image(
            870, 616,
            "Monty-Hall-win"
        );
        this.montyHallWin.setDisplaySize(310, 310 * 511 / 518);
        this.montyHallWin.setVisible(false);
        this.montyHallWin.setDepth(100);

        const cloudForText = this.add.image(
            360, 670,
            "box-for-text"
        );
        cloudForText.setDisplaySize(640, 120);
        
        this.instructions = this.add.text(330, 670, '', {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#000000'
        }).setOrigin(0.5);

        this.tryAgainButton = this.add.text(
            370, 180, "Начать заново",
            { fontSize: "30px", color: "#000000",
            backgroundColor: "#eab308", padding: { x: 16, y: 10 } }
        );
        this.tryAgainButton.alpha = 0;
        this.tryAgainButton.setInteractive({ useHandCursor: true });
        this.tryAgainButton.on("pointerdown", () => this.startGame());
        this.tryAgainButton.setVisible(false);
        
        this.startGame();
    }

    startGame(){
        this.gameState = GameState.CHOOSING;

        this.initialPlayerDoorId = null;
        this.finalPlayerDoorId = null;
        this.montyDoorId = null;
        this.prizeDoorId = Math.floor(Math.random() * 3);//Phaser.Math.Between(0, 2);

        this.initDoorsAndImgsBehindDoors();
    }

    initDoorsAndImgsBehindDoors(){
        if(this.doors.length > 0){
            this.doors.forEach(image => {
                if(image){
                    image.destroy();
                }
            });
            this.doors = [];
        }

        if(this.behindDoorsImgs.length > 0){
            this.behindDoorsImgs.forEach(image => {
                if(image){
                    image.destroy();
                }
            });
            this.behindDoorsImgs = [];
        }


        for (let i = 0; i < 3; i++)
        {
            const x = 300 + i * 212;
			

            if(i === this.prizeDoorId){
                const car = this.add.image(x - 30, 450, 'car-part');
                car.setDisplaySize(120, Math.round(120 * 340 / 490));
                car.setVisible(false);
                this.behindDoorsImgs.push(car);
            } else {
                const goat = this.add.image(x - 30, 450, 'goat');
                goat.setDisplaySize(80, Math.round(80 * 1118 / 704));
                goat.setVisible(false);
                this.behindDoorsImgs.push(goat);
            }

            const door = this.add.image(
                x,
                430,
                "door-closed"
            );
            door.setDisplaySize(200, 291);

            door.setData({
                "id" : i,
                "isOpened" : false
            });

            door.setInteractive();

            door.on('pointerover', () => {
                if (this.gameState !== GameState.CHOOSING) {
                    return;
                }
            });

            door.on('pointerout', () => {
                if (this.gameState !== GameState.CHOOSING) {
                    return;
                }
                if(door.getData("id") === this.initialPlayerDoorId){
                    return;
                }
            });

            door.on('pointerdown', () => {
                if (this.gameState === GameState.CHOOSING) {
                    
                    this.initialPlayerDoorId = i;

                    this.gameState = GameState.MONTY_REVEALS;

                    this.montyChooseDoorExceptChosen();
                    return;
                }

                if(this.gameState === GameState.DECIDING){
                    if(this.montyDoorId === i){
                        return;
                    }
                    this.finalPlayerDoorId = i;
                    this.doors[this.finalPlayerDoorId].setTexture("door-opened");
                    this.doors[this.finalPlayerDoorId].setData("isOpened", true);
                    this.behindDoorsImgs[this.finalPlayerDoorId].setVisible(true);
                    

                    this.gameState = GameState.RESULT;

                    if(this.finalPlayerDoorId === this.prizeDoorId){
                        this.montyWin();
                    } else {
                        this.doors[this.prizeDoorId].setTexture("door-opened");
                        this.doors[this.prizeDoorId].setData("isOpened", true);
                        this.behindDoorsImgs[this.prizeDoorId].setVisible(true);
                        this.montyLose();
                    }
                    return;
                }
            });

            this.doors.push(door);
        }
        this.tryAgainButton.setVisible(false);
        this.tryAgainButton.alpha = 0;
        this.montyOffers();
    }


    montyOffers(){
        if(this.gameState !== GameState.CHOOSING){
            return;
        }
        this.hideAllMontysImages();
        this.montyHall0.setVisible(true);
        this.instructions.text = "Перед вами три двери. За одной из них автомобиль,\nза двумя другими — козы. Выберите одну из дверей";
    }

    /**
     * 
     * @param {initialPlayerDoorId} montyDoorId 
     * @param {number} montyDoorId 
     */
    montyReveals(initialPlayerDoorId, montyDoorId){
        this.hideAllMontysImages();
        this.montyHall1.setVisible(true);
        this.instructions.text = `Прежде чем открыть выбранную вами дверь №${initialPlayerDoorId + 1},\nпозвольте мне показать вам, что находится за дверью №${montyDoorId + 1}.\nХотите ли вы сменить свой выбор на другую дверь?`;
    }

    montyWin(){
        this.hideAllMontysImages();
        this.montyHallWin.setVisible(true);
        this.instructions.text = "Поздравляю!\nВы выиграли!";
        this.tryAgainButton.setVisible(true);

        this.tweens.add({
            targets: this.tryAgainButton,
            alpha: 1,
            duration: 300,
            ease: 'Linear'
        });
    }

    montyLose(){
        this.hideAllMontysImages();
        this.montyHallLose.setVisible(true);
        this.instructions.text = "К сожалению!\nВы проиграли!";
        this.tryAgainButton.setVisible(true);

        this.tweens.add({
            targets: this.tryAgainButton,
            alpha: 1,
            duration: 300,
            ease: 'Linear'
        });
    }

    montyChooseDoorExceptChosen(){
        if(this.gameState !== GameState.MONTY_REVEALS){
            return;
        }

        const doorsForChoose = this.doors.filter(door => door.getData("id") !== this.initialPlayerDoorId && door.getData("id") !== this.prizeDoorId);
        this.montyDoorId = doorsForChoose[Math.floor(Math.random() * doorsForChoose.length)].getData("id");

        this.doors[this.montyDoorId].setTexture("door-opened");
        this.doors[this.montyDoorId].setData("isOpened", true);
        this.behindDoorsImgs[this.montyDoorId].setVisible(true);

        this.montyReveals(this.initialPlayerDoorId, this.montyDoorId);

        this.gameState = GameState.DECIDING;
    }

    hideAllMontysImages(){
        this.montyHall0.setVisible(false);
        this.montyHall1.setVisible(false);
        this.montyHallLose.setVisible(false);
        this.montyHallWin.setVisible(false);
    }
}
