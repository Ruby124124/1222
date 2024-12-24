// about.js
document.addEventListener("DOMContentLoaded", () => {
    let savedFingers = {}; // 用來存儲已保存的手指設定

    function selectFinger(finger) {
        // 設置手指名稱
        const fingerNameElement = document.getElementById('fingerName');
        switch (finger) {
            case 'thumb':
                fingerNameElement.textContent = '操控大拇指';
                break;
            case 'index':
                fingerNameElement.textContent = '操控食指';
                break;
            case 'middle':
                fingerNameElement.textContent = '操控中指';
                break;
            case 'ring':
                fingerNameElement.textContent = '操控無名指';
                break;
            case 'pinky':
                fingerNameElement.textContent = '操控小指';
                break;
        }

        // 切換到操控頁面
        document.getElementById('customizeScreen').style.display = 'none';
        document.getElementById('controlScreen').style.display = 'block';
    }

    window.selectFinger = selectFinger;

    function saveSettings() {
        const fingerNameElement = document.getElementById('fingerName').textContent;
        let finger = '';

        switch (fingerNameElement) {
            case '操控大拇指':
                finger = 'thumb';
                break;
            case '操控食指':
                finger = 'index';
                break;
            case '操控中指':
                finger = 'middle';
                break;
            case '操控無名指':
                finger = 'ring';
                break;
            case '操控小指':
                finger = 'pinky';
                break;
        }

        // 保存設定并添加勾勾
        savedFingers[finger] = true;
        const fingerButton = document.getElementById(finger);
        fingerButton.classList.add('saved');
        
        // 回到自定義頁面
        document.getElementById('customizeScreen').style.display = 'block';
        document.getElementById('controlScreen').style.display = 'none';
    }

    window.saveSettings = saveSettings;

    function goBack() {
        if (document.getElementById('controlScreen').style.display === 'block') {
            // 如果在操控介面，返回到自定義介面
            document.getElementById('customizeScreen').style.display = 'block';
            document.getElementById('controlScreen').style.display = 'none';
        }
    }

    window.goBack = goBack;

    // 添加滑块值变化监听
    document.querySelectorAll('input[type="range"]').forEach(slider => {
        slider.addEventListener('input', function() {
            updateSliderValue(this);
        });
    });

    function updateSliderValue(slider) {
        // 获取当前值的百分比
        const value = slider.value;
        const max = slider.max;
        const percentage = (value / max) * 100;
        
        // 更新滑块颜色
        slider.style.background = `linear-gradient(to right, #f39c12 ${percentage}%, #ddd ${percentage}%)`;
    }

    // 初始化所有滑块值
    function initializeSliders() {
        document.querySelectorAll('input[type="range"]').forEach(slider => {
            // 設置滑塊初始值為中間值
            slider.value = slider.max / 2;
            updateSliderValue(slider);
        });
    }

    // 页面加载时初始化
    document.addEventListener('DOMContentLoaded', initializeSliders);

    function resetAll() {
        // 清空已保存的手指設定
        savedFingers = {};
        
        // 移除所有手指按鈕的勾勾
        document.querySelectorAll('.finger-button').forEach(button => {
            button.classList.remove('saved');
        });
        
        // 重置所有滑塊到中間位置
        document.querySelectorAll('input[type="range"]').forEach(slider => {
            slider.value = slider.max / 2;
            updateSliderValue(slider);
        });
    }

    // 將 resetAll 函數添加到 window 對象
    window.resetAll = resetAll;
});
