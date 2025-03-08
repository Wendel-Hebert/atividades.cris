class InitialScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'InitialScreen' });
    }

    preload() {
        this.load.image('startButton', 'assets/botaostart.png'); // Carrega a imagem do botão de início
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000'); // Define o fundo como preto
        this.add.text(larguraJogo / 2, alturaJogo / 3, 'Pronto para vencer?', { fontSize: '40px', fill: '#fff' }).setOrigin(0.5);
        let startButton = this.add.image(larguraJogo / 2, alturaJogo / 2, 'startButton').setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}

const initialConfig = {
    type: Phaser.AUTO,
    width: larguraJogo,
    height: alturaJogo,
    scene: [InitialScreen, GameScene], // Inclui ambas as cenas
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1600 },
            debug: false
        }
    }
};

let initialGame = new Phaser.Game(initialConfig);
