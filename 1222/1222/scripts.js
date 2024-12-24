document.addEventListener("DOMContentLoaded", () => {
    const screens = document.querySelectorAll(".screen");
    let currentScreen = 0;
    let currentHand = 'left';

    function showNextScreen() {
        // 隱藏當前屏幕
        screens[currentScreen].classList.remove("active");

        // 顯示下一屏
        currentScreen++;
        if (currentScreen < screens.length) {
            screens[currentScreen].classList.add("active");
        }
    }

    // 自動切換屏幕
    setTimeout(() => showNextScreen(), 1000);  // 第一屏停留1秒
    setTimeout(() => showNextScreen(), 4000);  // 第二屏停留2.5秒
    setTimeout(() => showNextScreen(), 6500);  // 第三屏停留2.5秒

    // 第四屏的功能
    function switchTab(tab) {
        // 切換標籤
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        if (tab === 'left') {
            document.querySelector('.tab-button:first-child').classList.add('active');
            currentHand = 'left';
        } else {
            document.querySelector('.tab-button:last-child').classList.add('active');
            currentHand = 'right';
        }
        updateGestureImage();
    }

    function selectGesture(button) {
        // 切換按鈕樣式
        document.querySelectorAll('.action-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        updateGestureImage();
    }

    function updateGestureImage() {
        const gestureImage = document.querySelector('.gesture-image');
        const activeGestureButton = document.querySelector('.action-button.active');
        const gestureType = activeGestureButton.innerText;

        // 根據按鈕的文字和當前手部更新圖片
        if (currentHand === 'left') {
            switch (gestureType) {
                case '握拳':
                    gestureImage.src = './img/img8.jpg'; // 左手握拳的圖片
                    break;
                case '伸展':
                    gestureImage.src = './img/img4.jpg'; // 左手伸展的圖片
                    break;
                case '抓取':
                    gestureImage.src = './img/img6.jpg'; // 左手抓取的圖片
                    break;
                case '自定':
                    window.location.href = 'custom.html'; // 跳轉到自定頁面
                    break;
                default:
                    gestureImage.src = './img/left_default.jpg'; // 默認左手圖片
                    break;
            }
        } else {
            switch (gestureType) {
                case '握拳':
                    gestureImage.src = './img/img9.jpg'; // 右手握拳的圖片
                    break;
                case '伸展':
                    gestureImage.src = './img/img5.jpg'; // 右手伸展的圖片
                    break;
                case '抓取':
                    gestureImage.src = './img/img7.jpg'; // 右手抓取的圖片
                    break;
                case '自定':
                    window.location.href = 'custom.html'; // 跳轉到自定頁面
                    break;
                default:
                    gestureImage.src = './img/img5.jpg'; // 默認右手圖片
                    break;
            }
        }
    }

    // 全局暴露函數供 HTML 調用
    window.switchTab = switchTab;
    window.selectGesture = selectGesture;

    // 模擬返回與記錄功能
    window.goBack = () => {
        console.log("返回上一頁");
    };
    window.goToRecords = () => {
        console.log("進入記錄頁");
    };
});

