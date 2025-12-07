const { app, core } = require("photoshop");

/**
 * ステータス表示
 */
function showStatus(message, isError = false) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.className = isError ? "error" : "success";
}

/**
 * テキストを一文字ずつ分割して個別レイヤーとして配置
 */
async function splitAndPlaceCharacters() {
  const inputText = document.getElementById("inputText");
  const fontSize = document.getElementById("fontSize");
  const spacing = document.getElementById("spacing");
  const startX = document.getElementById("startX");
  const startY = document.getElementById("startY");

  const text = (inputText.value || "").trim();

  if (!text) {
    showStatus("テキストを入力してください", true);
    return;
  }

  const doc = app.activeDocument;
  if (!doc) {
    showStatus("ドキュメントを開いてください", true);
    return;
  }

  const fontSizeValue = parseInt(fontSize.value) || 72;
  const spacingValue = parseInt(spacing.value) || 80;
  const startXValue = parseInt(startX.value) || 100;
  const startYValue = parseInt(startY.value) || 200;

  const chars = [...text]; // 文字を配列に分割（サロゲートペア対応）

  try {
    await core.executeAsModal(
      async () => {
        // 文字を逆順で作成（レイヤーパネルで上から順に並ぶように）
        for (let i = chars.length - 1; i >= 0; i--) {
          const char = chars[i];
          const xPos = startXValue + (i * spacingValue);

          await doc.createTextLayer({
            name: `文字_${i + 1}_${char}`,
            contents: char,
            fontSize: fontSizeValue,
            position: { x: xPos, y: startYValue }
          });
        }
      },
      { commandName: "文字分割配置" }
    );

    showStatus(`${chars.length}文字を配置しました`);
  } catch (e) {
    console.error(e);
    showStatus(`エラー: ${e.message}`, true);
  }
}

// DOMロード後にイベントリスナーを設定
document.addEventListener("DOMContentLoaded", () => {
  const splitBtn = document.getElementById("splitBtn");
  const inputText = document.getElementById("inputText");

  splitBtn.addEventListener("click", splitAndPlaceCharacters);

  inputText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      splitAndPlaceCharacters();
    }
  });
});
