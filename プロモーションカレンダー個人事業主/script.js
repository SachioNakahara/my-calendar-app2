const monthYear = document.getElementById("monthYear");
const daysContainer = document.querySelector(".days");
const eventInput = document.getElementById("eventInput");
const saveEventButton = document.getElementById("saveEvent");
const eventList = document.getElementById("eventList");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const backgroundInput = document.getElementById("backgroundInput");

let currentDate = new Date();

// カレンダーを描画する関数
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  monthYear.textContent = `${year}年 ${month + 1}月`;

  // 日付をクリア
  daysContainer.innerHTML = "";

  // 月の最初の日
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 空白の日を追加
  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyDiv = document.createElement("div");
    daysContainer.appendChild(emptyDiv);
  }

  // 日付を追加
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = i;
    dayDiv.addEventListener("click", () => loadEvents(i)); // 日付をクリックしたときにイベントを読み込む
    daysContainer.appendChild(dayDiv);
  }
}

// イベントを読み込む関数
function loadEvents(day) {
  const key = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${day}`;
  const events = JSON.parse(localStorage.getItem(key)) || [];
  eventInput.dataset.day = day; // クリックした日付をデータ属性に保存
  eventList.innerHTML =
    events.length > 0
      ? events.map((event) => `<div>${event}</div>`).join("")
      : "<div>予定はありません。</div>";
}

// イベントを保存するボタンのクリックイベント
saveEventButton.addEventListener("click", () => {
  const day = parseInt(eventInput.dataset.day);
  if (!day) return;

  const key = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${day}`;
  const events = JSON.parse(localStorage.getItem(key)) || [];
  events.push(eventInput.value);
  localStorage.setItem(key, JSON.stringify(events));
  eventInput.value = "";
  loadEvents(day); // 保存後にその日のイベントを再読み込み
});

// 前の月に移動するボタンのクリックイベント
prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

// 次の月に移動するボタンのクリックイベント
nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// 背景画像を設定する
backgroundInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    document.body.style.backgroundImage = `url(${url})`;
    document.body.style.backgroundSize = "cover"; // 背景画像をカバーする
    document.body.style.backgroundPosition = "center"; // 背景画像の位置を中央に
  }
});

// 初期カレンダーの描画
renderCalendar();
