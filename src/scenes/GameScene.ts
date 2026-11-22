import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }
    private readonly ROWS = 5; // 定義行數
    private readonly COLS = 9; // 定義列數
    private readonly CELL_WIDTH = 82; // 定義格子寬度
    private readonly CELL_HEIGHT = 88; // 定義格子高度
    private readonly GRID_X = 131; // 定義網格起始X座標
    private readonly GRID_Y = 155; // 定義網格起始Y座標

    private selectedCell: Phaser.GameObjects.Rectangle | null = null; // 用於追蹤選中的格子
    private selectedPosition: { row: number; col: number } | null = null; // 用於追蹤選中格子的行列位置
    private infoText!: Phaser.GameObjects.Text; // 用於顯示選中格子的資訊

    create() {
        // 在這裡添加遊戲的初始化邏輯，例如創建遊戲物件、設置場景等。
        console.log("GameScene has been created!");
        this.createGrid();

        this.infoText = this.add.text(131, 640, "Select a cell", {
            fontSize: "24px",
            color: "#ffffff",
        });
    }

    private createGrid() {
        for (let row = 0; row < this.ROWS; row++) {
            for (let col = 0; col < this.COLS; col++) {
                const color = (row + col) % 2 === 0 ? 0x83b95c : 0x74ac50;
                const cell = this.add.rectangle(
                    this.GRID_X + col * this.CELL_WIDTH + this.CELL_WIDTH / 2,
                    this.GRID_Y + row * this.CELL_HEIGHT + this.CELL_HEIGHT / 2,
                    this.CELL_WIDTH,
                    this.CELL_HEIGHT,
                    color,
                );

                // 設定圖形的交互性，並添加點擊事件處理器
                cell.setInteractive({ useHandCursor: true });
                cell.on("pointerdown", () => {
                    // Handle the selected cell.

                    this.selectCell(cell, row, col);
                });
            }
        }
    }

    private selectCell(
        cell: Phaser.GameObjects.Rectangle,
        row: number,
        col: number,
    ) {
        console.log(`Cell at row ${row + 1}, ${col + 1} `);

        this.selectedCell?.setStrokeStyle(); // 移除之前選中格子的邊框樣式
        cell.setStrokeStyle(3, 0xffe66d); // 設定邊框樣式
        this.selectedCell = cell;
        this.selectedPosition = { row, col }; // 更新選中格子的行列位置
        this.infoText.setText(
            `Select a cell: row ${this.selectedPosition.row + 1}, col ${this.selectedPosition.col + 1}`,
        );
    }
}
