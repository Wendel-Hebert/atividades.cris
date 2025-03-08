let larguraJogo = window.innerWidth;
let alturaJogo = window.innerHeight;

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Carregando as imagens do jogo
        this.load.image('background', 'assets/espaco.png');
        this.load.image('turbo', 'assets/turbo.png');
        this.load.image('player', 'assets/alienigena.png');
        this.load.image('plataforma', 'assets/PLATAFORMA2.PNG');
        this.load.image('estrela', 'assets/estrela.png');
        this.load.image('obstaculo', 'assets/bomba.png');
    }

    create() {
        // Criando o fundo do jogo e ajustando para ocupar a tela toda
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'background').setDisplaySize(larguraJogo, alturaJogo);

        // Criando o efeito do turbo
        fogo = this.add.sprite(0, 0, 'turbo');
        fogo.setVisible(false);

        // Criando o jogador e ativando colisão com as bordas do mundo
        alien = this.physics.add.sprite(larguraJogo / 2, alturaJogo - 100, 'player');
        alien.setCollideWorldBounds(true);

        var plataformas = [];

        // Criando e adicionando plataformas dinamicamente ao array
        plataformas.push(this.physics.add.staticImage(larguraJogo / 2, alturaJogo / 1.7, 'plataforma'));
        plataformas.push(this.physics.add.staticImage(larguraJogo / 6, alturaJogo / 3, 'plataforma'));
        plataformas.push(this.physics.add.staticImage(larguraJogo / 1.2, alturaJogo / 3, 'plataforma'));

        // Adicionando colisão do jogador com todas as plataformas usando um loop
        plataformas.forEach(plataforma => {
            this.physics.add.collider(alien, plataforma);
        });

        // Criando a estrela e ativando colisão
        estrela = this.physics.add.sprite(larguraJogo / 2, 0, 'estrela');
        estrela.setCollideWorldBounds(true);
        estrela.setBounce(0.7);

        // Adicionando colisão da estrela com as plataformas
        this.physics.add.collider(estrela, plataformas);

        // Criando o placar do jogo
        placar = this.add.text(20, 20, 'Estrelas: ' + pontuacao, { fontSize: '30px', fill: '#FFFFFF' });

        // Contador do placar - aumenta a pontuação ao pegar a estrela
        this.physics.add.overlap(alien, estrela, function(){
            estrela.setVisible(false);
            var posicaoEstrela_X = Phaser.Math.RND.between(50, larguraJogo - 50); // Garante que a estrela aparece dentro da tela
            estrela.setPosition(posicaoEstrela_X, 0); // Faz a estrela cair do topo
            pontuacao++;
            placar.setText('Estrelas: ' + pontuacao);
            estrela.setVisible(true);

            // Verifica se a pontuação atingiu 50
            if (pontuacao >= 50) {
                this.add.text(larguraJogo / 2, alturaJogo / 2, 'Parabéns, você venceu!', { fontSize: '50px', fill: '#FFFFFF' }).setOrigin(0.5);
                this.physics.pause(); // Pausa o jogo
                alien.setTint(0x00ff00); // Muda a cor do alien para verde
            }
        }, null, this);

        // Criando as teclas de movimento
        teclado = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Ajustar a tela se o usuário redimensionar
        window.addEventListener('resize', resizeGame);

        // Criar obstáculo inicial
        createObstacle(this);

        // Adicionando colisão do obstáculo com o alien
        this.physics.add.overlap(alien, obstaculo, endGame, null, this);
    }

    update() {
        let movendo = false;

        // Movimento para a esquerda <- (seta esquerda ou A)
        if (teclado.left.isDown || teclado.A.isDown) {
            alien.setVelocityX(-250);
            movendo = true;
        }
        // Movimento para a direita -> (seta direita ou D)
        else if (teclado.right.isDown || teclado.D.isDown) {
            alien.setVelocityX(250);
            movendo = true;
        }
        else {
            alien.setVelocityX(0);
        }

        // Movimento para cima (seta cima ou W)
        if (teclado.up.isDown || teclado.W.isDown) {
            alien.setVelocityY(-250);
            movendo = true;
        }
        // Movimento para baixo (seta baixo ou S)
        else if (teclado.down.isDown || teclado.S.isDown) {
            alien.setVelocityY(250);
            movendo = true;
        }
        else {
            alien.setVelocityY(0);
        }

        // Ajusta a posição do turbo e sua visibilidade
        if (movendo) {
            fogo.setPosition(alien.x, alien.y + 50);
            fogo.setVisible(true);
        } else {
            fogo.setVisible(false);
        }

        // Move obstaculo
        obstaculo.x += obstaculoSpeed * obstaculo.direcaoX;
        obstaculo.y += obstaculoSpeed * obstaculo.direcaoY;
        obstaculo.rotation += 0.05; // Rotaciona o obstáculo
        if (obstaculo.x >= larguraJogo || obstaculo.x <= 0) {
            obstaculo.direcaoX *= -1; // Muda a direção no eixo x
            obstaculo.flipX = !obstaculo.flipX; // Flip the obstacle
        }
        if (obstaculo.y >= alturaJogo || obstaculo.y <= 0) {
            obstaculo.direcaoY *= -1; // Muda a direção no eixo y
            obstaculo.flipY = !obstaculo.flipY; // Flip the obstacle
        }
    }
}

// Função para redimensionar o jogo ao mudar o tamanho da tela
function resizeGame() {
    larguraJogo = window.innerWidth;
    alturaJogo = window.innerHeight;

    game.scale.resize(larguraJogo, alturaJogo);
}

function createObstacle(scene) {
    obstaculo = scene.physics.add.sprite(Phaser.Math.Between(0, larguraJogo), alturaJogo / 2, 'obstaculo'); // Inicia em uma posição aleatória
    obstaculo.setCollideWorldBounds(true);
    obstaculo.setBounce(1);
    obstaculo.direcaoX = Phaser.Math.Between(0, 1) ? 1 : -1; // Move no eixo x
    obstaculo.direcaoY = Phaser.Math.Between(0, 1) ? 1 : -1; // Move no eixo y
}

function endGame() {
    this.scene.restart(); // Reinicia a cena do jogo
}

const config = {
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

// Criando o jogo com a configuração definida
let game = new Phaser.Game(config);

var alien, teclado, fogo, estrela, placar, pontuacao = 0;
var obstaculo;
var obstaculoSpeed = 5;
