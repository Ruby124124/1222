document.addEventListener('DOMContentLoaded', () => {
    // 生成隨機時間
    function generateRandomTime() {
        const hours = String(Math.floor(Math.random() * 14) + 8).padStart(2, '0'); // 8:00 - 22:00
        const minutes = String(Math.floor(Math.random() * 4) * 15).padStart(2, '0'); // 00, 15, 30, 45
        return hours + ':' + minutes;
    }

    // 生成隨機記錄
    function generateRecords(monthPair) {
        const records = [];
        const [startMonth, endMonth] = monthPair.split('-').map(Number);
        const count = Math.floor(Math.random() * 4) + 3; // 3-6條記錄

        for (let i = 0; i < count; i++) {
            const month = Math.random() < 0.5 ? startMonth : endMonth;
            const day = Math.floor(Math.random() * 28) + 1;
            const startTime = generateRandomTime();
            const endHour = parseInt(startTime.split(':')[0]) + 1;
            const endTime = `${String(endHour).padStart(2, '0')}:${startTime.split(':')[1]}`;

            records.push({
                date: `2024. ${String(month).padStart(2, '0')}. ${String(day).padStart(2, '0')}`,
                startTime,
                endTime
            });
        }

        return records.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // 更新表格內容
    function updateTable(monthPair) {
        const records = generateRecords(monthPair);
        const recordBody = document.getElementById('recordBody');
        recordBody.innerHTML = '';
        
        records.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.date}</td>
                <td>${record.startTime}</td>
                <td>${record.endTime}</td>
            `;
            recordBody.appendChild(row);
        });

        // 更新使用統計
        updateStats(records);
    }

    // 添加新的統計更新函數
    function updateStats(records) {
        // 更新使用次數
        document.getElementById('usageCount').textContent = `${records.length}次`;

        // 計算總使用時數
        let totalMinutes = 0;
        records.forEach(record => {
            const startTime = record.startTime.split(':').map(Number);
            const endTime = record.endTime.split(':').map(Number);
            const duration = (endTime[0] - startTime[0]) * 60 + (endTime[1] - startTime[1]);
            totalMinutes += duration;
        });
        
        const totalHours = Math.floor(totalMinutes / 60);
        document.getElementById('totalHours').textContent = `${totalHours}小時`;

        // 更新康復進度
        const progress = Math.min(Math.floor(Math.random() * 100), 100);
        const progressBar = document.getElementById('recoveryProgress');
        progressBar.style.width = `${progress}%`;
    }

    // 監聽下拉選單變化
    document.getElementById('monthSelect').addEventListener('change', (e) => {
        updateTable(e.target.value);
    });

    // 初始化表格
    updateTable('5-6');
});
