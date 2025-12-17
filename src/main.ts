import Phaser from "phaser";

const TILE_SIZE = 16;

/**
 * # = wall
 * . = pellet
 * space = empty path
 */
const MAZE = [
  "############################",
  "#............##............#",
  "#.####.#####.##.#####.####.#",
  "#..........................#",
  "#.####.##.########.##.####.#",
  "#......##....##....##......#",
  "############################"
];

class GameScene extends Phaser.Scene {
  pacman!: Phaser.GameObjects.Arc;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  pellets!: Phaser.GameObjects.Group;

  constructor() {
    super("game");
  }

  create() {
    this.drawMaze();
    this.createPellets();
    this.createPacman();

    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  update() {
    this.movePacman();
    this.checkPelletCollision();
  }

  // ---------- Maze ----------
  drawMaze() {
    MAZE.forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        if (cell === "#") {
          this.add
            .rectangle(
              x * TILE_SIZE,
              y * TILE_SIZE,
              TILE_SIZE,
              TILE_SIZE,
              0x0000ff
            )
            .setOrigin(0);
        }
      });
    });
  }

  // ---------- Pac-Man ----------
  createPacman() {
    this.pacman = this.add.circle(
      1 * TILE_SIZE + TILE_SIZE / 2,
      1 * TILE_SIZE + TILE_SIZE / 2,
      TILE_SIZE / 2 - 2,
      0xffff00
    );
  }

  movePacman() {
    const speed = 2;
    let nextX = this.pacman.x;
    let nextY = this.pacman.y;

    if (this.cursors.left?.isDown) nextX -= speed;
    if (this.cursors.right?.isDown) nextX += speed;
    if (this.cursors.up?.isDown) nextY -= speed;
    if (this.cursors.down?.isDown) nextY += speed;

    if (!this.isWall(nextX, nextY)) {
      this.pacman.x = nextX;
      this.pacman.y = nextY;
    }
  }

  // ---------- Pellets ----------
  createPellets() {
    this.pellets = this.add.group();

    MAZE.forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        if (cell === ".") {
          const pellet = this.add.circle(
            x * TILE_SIZE + TILE_SIZE / 2,
            y * TILE_SIZE + TILE_SIZE / 2,
            2,
            0xffffff
          );
          this.pellets.add(pellet);
        }
      });
    });
  }

  checkPelletCollision() {
    this.pellets.children.each((pellet: any) => {
      if (
        Phaser.Math.Distance.Between(
          this.pacman.x,
          this.pacman.y,
          pellet.x,
          pellet.y
        ) < 8
      ) {
        pellet.destroy();
      }
    });
  }

  // ---------- Collision ----------
  isWall(x: number, y: number): boolean {
    const col = Math.floor(x / TILE_SIZE);
    const row = Math.floor(y / TILE_SIZE);
    return MAZE[row]?.[col] === "#";
  }
}

// ---------- Game Config ----------
new Phaser.Game({
  type: Phaser.AUTO,
  width: MAZE[0].length * TILE_SIZE,
  height: MAZE.length * TILE_SIZE,
  backgroundColor: "#000000",
  scene: GameScene
});
