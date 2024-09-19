// 貓咪圖片的 URL 列表
const catImages = [
    'https://github.com/user-attachments/assets/50a08334-94e5-477d-b2fc-367117005889',
    'https://github.com/user-attachments/assets/5b9dbc66-0d36-4548-8a6b-3273766cda32',
    'https://github.com/user-attachments/assets/796ebc62-e861-4339-bd1f-ae791c40b32e',
    'https://github.com/user-attachments/assets/169eb19e-a11a-4bab-9e25-154c1b81632a',
    'https://github.com/user-attachments/assets/a060e210-1724-47b9-89ac-f511f371a180',
    'https://github.com/user-attachments/assets/acfb9593-1f71-49b7-a3e4-c162b6105a2e',
    'https://github.com/user-attachments/assets/1611dbbf-f60a-4a59-8153-abe22f1b7024',
    'https://github.com/user-attachments/assets/459ae171-b7fd-4709-b486-48ac382b1068',
    'https://github.com/user-attachments/assets/071d8c8d-7c39-4947-bafb-36c99f5af40b',
    'https://github.com/user-attachments/assets/6ba0a8cf-5f61-4b1e-aaf8-27f54bba9baa',
    'https://github.com/user-attachments/assets/222121b8-d6f6-4c6a-b692-cb4cf58df5a4',
    'https://github.com/user-attachments/assets/41c1be3e-f8b7-49b3-b4a0-09f91da2578b',
    'https://github.com/user-attachments/assets/c443ebd8-f373-405f-b66b-4356b58e39e0'
];

// 創建貓咪圖片元素
const catImg = document.createElement('img');
catImg.src = catImages[0];
catImg.style.position = 'fixed';
catImg.style.width = '100px';
catImg.style.height = '100px';
catImg.style.top = '50%';
catImg.style.left = '50%';
catImg.style.zIndex = '1000';

// 添加貓咪圖片到網頁
document.body.appendChild(catImg);

// 設置移動速度和方向
let xSpeed = 2;
let ySpeed = 2;
let xPos = window.innerWidth / 2;
let yPos = window.innerHeight / 2;

// 變量來控制是否暫停
let isPaused = false;

// 創建暫停/恢復按鈕
const pauseButton = document.createElement('button');
pauseButton.innerText = '暫停';
pauseButton.style.position = 'fixed';
pauseButton.style.bottom = '20px';
pauseButton.style.left = '20px';
pauseButton.style.zIndex = '1001';
document.body.appendChild(pauseButton);

// 監聽暫停/恢復按鈕的點擊事件
pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.innerText = isPaused ? '恢復' : '暫停';
});

// 載入音效
const meowSound = new Audio('https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/meow.m4a');

// 確保音效路徑正確
console.log('音效路徑:', meowSound.src);

// 變量來控制音效是否啟用
let soundEnabled = false;

// 等待使用者點擊後解除播放限制
document.addEventListener('click', () => {
    soundEnabled = true;
    console.log('使用者已點擊，音效已啟用');
});

// 播放音效（只有在角落時播放）
function playMeowSound() {
    const playPromise = meowSound.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('音效成功播放');
        }).catch((error) => {
            console.error('音效播放失敗: ', error);
        });
    }
}

// 檢查是否撞到角落
function checkIfHitCorner() {
    const hitLeft = xPos <= 0;
    const hitRight = xPos + catImg.width >= window.innerWidth;
    const hitTop = yPos <= 0;
    const hitBottom = yPos + catImg.height >= window.innerHeight;

    // 如果同時撞到水平和垂直邊界，則認為撞到了角落
    return (hitLeft || hitRight) && (hitTop || hitBottom);
}

// 隨機選擇新的貓咪圖片
function changeCatImage() {
    const randomIndex = Math.floor(Math.random() * catImages.length);
    catImg.src = catImages[randomIndex];
}

// 更新貓咪的位置
function updatePosition() {
    if (!isPaused) {
        xPos += xSpeed;
        yPos += ySpeed;

        // 檢查是否撞到邊界並反彈
        if (xPos + catImg.width >= window.innerWidth || xPos <= 0) {
            xSpeed = -xSpeed; // 水平方向反彈
            changeCatImage(); // 碰撞時換圖片
        }
        if (yPos + catImg.height >= window.innerHeight || yPos <= 0) {
            ySpeed = -ySpeed; // 垂直方向反彈
            changeCatImage(); // 碰撞時換圖片
        }

        // 如果撞到角落且音效已啟用，播放音效
        if (soundEnabled && checkIfHitCorner()) {
            playMeowSound();
        }

        // 更新貓咪位置
        catImg.style.left = `${xPos}px`;
        catImg.style.top = `${yPos}px`;
    }

    // 每隔 16 毫秒更新一次
    requestAnimationFrame(updatePosition);
}

// 開始動畫
updatePosition();