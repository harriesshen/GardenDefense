import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import "./style.css";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO, // 讓 Phaser 自動選擇 WebGL 或 Canvas。

    // 設定遊戲的邏輯畫布尺寸。
    width: 1000,
    height: 700,

    // 指定遊戲放在哪個 HTML 元素。
    parent: "app",

    backgroundColor: "#263B2A",

    // 指定啟動時要執行的場景。
    scene: [GameScene],

    // 讓遊戲依照瀏覽器大小等比例縮放。
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    render: {
        antialias: true,
    },
};

new Phaser.Game(config);
