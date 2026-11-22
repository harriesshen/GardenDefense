import test, { expect } from "@playwright/test";

test("shows the game canvas | 顯示遊戲畫布", async ({ page }) => {
    await page.goto("/"); // 根據 playwright 設定的 baseUrl ,前往網站根目錄
    const canvas = page.locator("#app canvas"); // 選取 canvas 元素
    await expect(canvas).toBeVisible(); // 驗證 canvas 是否可見
});

test("fits within a short viewport | 矮視窗下頁面不會垂直溢出", async ({
    page,
}) => {
    await page.setViewportSize({ width: 1000, height: 400 }); // 設定視窗尺寸
    await page.goto("/"); // 根據 playwright 設定的 baseUrl ,前往網站根目錄

    const dimensions = await page.evaluate(() => ({
        contentHeight: document.documentElement.scrollHeight,
        viewportHeight: document.documentElement.clientHeight,
    }));

    expect(dimensions.contentHeight).toBeLessThanOrEqual(
        dimensions.viewportHeight,
    );
});

test("selects the bottom-right cell after resizing | 縮放後可選取右下角格子", async ({
    page,
}) => {
    await page.setViewportSize({ width: 1000, height: 400 }); // 設定視窗尺寸
    await page.goto("/"); // 根據 playwright 設定的 baseUrl ,前往網站根目錄
    const canvas = page.locator("#app canvas"); // 選取 canvas 元素
    await expect(canvas).toBeVisible();

    const bounds = await canvas.boundingBox(); // 取得 canvas 的邊界資訊
    if (!bounds) throw new Error("Canvas bounds not found"); // 若無法取得邊界資訊，拋出錯誤

    console.log(bounds);
    const scaleX = bounds.width / 1000; // 計算 X 軸縮放比例
    const scaleY = bounds.height / 700; // 計算 Y 軸縮放比例

    const clickX = bounds.x + 828 * scaleX;
    const clickY = bounds.y + 551 * scaleY;

    const selectedMessage = page.waitForEvent("console", {
        predicate: (message) => message.text().trim() === "Cell at row 5, 9",
    });

    await page.mouse.click(clickX, clickY);
    await selectedMessage;
});
