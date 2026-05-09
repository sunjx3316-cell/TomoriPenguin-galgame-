// engine.js - Galgame 核心状态机引擎

// 全局变量
let penguinDegree = 20;
let currentNodeId = null;
let nodeData = null;
let playerName = "我"; // 默认玩家名字

// 打字机相关
let isTyping = false;
let typeInterval = null;
let currentText = "";
let displayedText = "";
let isVoicePlaying = false; // 新增：标记语音是否正在播放

// UI 元素引用
const UI = {
    nameInputScreen: document.getElementById('name-input-screen'),
    playerNameInput: document.getElementById('player-name-input'),
    btnStartGame: document.getElementById('btn-start-game'),
    dialogueBox: document.getElementById('dialogue-box'),
    speakerName: document.getElementById('speaker-name'),
    dialogueText: document.getElementById('dialogue-text'),
    optionsContainer: document.getElementById('inline-options-container'), // 改用新的内嵌容器
    reportModal: document.getElementById('report-modal'),
    penguinProgress: document.getElementById('penguin-progress'),
    penguinText: document.getElementById('penguin-text'),
    btnRestart: document.getElementById('btn-restart'),
    reportBehavior: document.getElementById('report-behavior'),
    reportImpact: document.getElementById('report-impact'),
    reportSolution: document.getElementById('report-solution'),
    bgImg: document.getElementById('bg-img'),
    spriteImg: document.getElementById('sprite-img'),
    voicePlayer: document.getElementById('voice-player'),
    cgVideo: document.getElementById('cg-video')
};

// 初始化游戏
function initGame() {
    penguinDegree = 20;
    updatePenguinDegree(0);
    UI.reportModal.classList.add('hidden');
    UI.optionsContainer.classList.add('hidden');
    UI.dialogueBox.classList.remove('hidden');
    
    // 关键修复：重新开始时清空立绘、背景和视频，防止残留
    UI.spriteImg.src = "";
    UI.spriteImg.style.display = "none";
    UI.bgImg.src = "";
    UI.bgImg.style.display = "none";
    
    UI.cgVideo.classList.add('hidden');
    UI.cgVideo.pause();
    UI.cgVideo.src = "";
    
    goToNode(gameScript.startNode);
}

// 更新企鹅度数值和进度条
function updatePenguinDegree(change) {
    penguinDegree += change;
    if (penguinDegree > 100) penguinDegree = 100;
    if (penguinDegree < 0) penguinDegree = 0;
    
    UI.penguinProgress.style.width = penguinDegree + '%';
    UI.penguinText.innerText = penguinDegree + '%';
    
    if (penguinDegree === 100) {
        // 达到100% 触发胜利结局 (待扩展)
    }
}

// 节点跳转核心逻辑
function goToNode(nodeId) {
    if (!nodeId) return; // 结束了
    currentNodeId = nodeId;
    nodeData = gameScript.nodes[nodeId];

    // 处理数值变化
    if (nodeData.penguinChange) {
        updatePenguinDegree(nodeData.penguinChange);
    }

    // 检查是否 Game Over
    if (nodeData.isGameOver) {
        showGameOver(nodeData.report);
        return;
    }

    // 渲染背景和立绘 (如果有)
    if (nodeData.bg) {
        UI.bgImg.src = nodeData.bg;
        UI.bgImg.style.display = "block";
    }
    
    // 处理立绘逻辑：如果没有指定 sprite，就隐藏立绘；如果指定了，就显示。
    if (nodeData.sprite) {
        // 为了重新触发 css 里的 fade-in 动画，我们需要一点点小 trick (重置动画)
        if (UI.spriteImg.src.indexOf(nodeData.sprite) === -1) {
            UI.spriteImg.style.animation = 'none';
            UI.spriteImg.offsetHeight; /* 强制触发浏览器重绘 */
            UI.spriteImg.style.animation = null; 
            
            UI.spriteImg.src = nodeData.sprite;
            UI.spriteImg.style.display = "block";
        }
    } else {
        // 如果当前剧情节点没有指定立绘，应该把之前残留的立绘隐藏掉（比如转场时）
        UI.spriteImg.style.display = "none";
        UI.spriteImg.src = "";
    }

    // 播放视频 CG (如果有)
    if (nodeData.video) {
        // 如果 video 是一个数组，则随机挑选一个播放！
        let videoSrc = nodeData.video;
        if (Array.isArray(videoSrc)) {
            // 加入防重复机制：尽量不连续播放同一个视频
            let lastPlayedVideo = localStorage.getItem('lastPlayedVideo');
            let availableVideos = videoSrc.filter(src => src !== lastPlayedVideo);
            
            // 如果所有视频都播过了（或者只有一个视频），重置可用列表
            if (availableVideos.length === 0) {
                availableVideos = videoSrc;
            }

            const randomIndex = Math.floor(Math.random() * availableVideos.length);
            videoSrc = availableVideos[randomIndex];
            
            // 记录这次播放的视频
            localStorage.setItem('lastPlayedVideo', videoSrc);
        }

        UI.cgVideo.src = videoSrc;
        UI.cgVideo.classList.remove('hidden');
        UI.dialogueBox.classList.add('hidden'); // 隐藏对话框
        document.getElementById('status-bar').classList.add('hidden'); // 隐藏顶部进度条
        
        UI.cgVideo.play().catch(e => console.log("视频自动播放失败", e));
        
        // 视频播放结束后的处理（可选，目前就让它停在最后画面）
        UI.cgVideo.onended = () => {
            // 你可以在这里加个重新开始的按钮，或者直接返回标题
        };
        return; // 播放视频时，不显示后续对话文本
    }

    // 准备对话框内容
    let displaySpeaker = nodeData.speaker || "";
    // 如果剧本里的说话人是“我”，就替换为玩家自定义的名字！
    if (displaySpeaker === "我") {
        displaySpeaker = playerName;
    }
    UI.speakerName.innerText = displaySpeaker;
    currentText = nodeData.text || "";
    displayedText = "";
    
    // 隐藏之前的选项和下一句箭头
    UI.optionsContainer.classList.add('hidden');
    UI.optionsContainer.innerHTML = "";
    document.getElementById('next-indicator').style.display = 'none';

    // 播放语音 (如果有)
    if (nodeData.voice) {
        UI.voicePlayer.src = nodeData.voice;
        isVoicePlaying = true; // 标记开始播放
        UI.voicePlayer.play().catch(e => {
            console.log("语音播放失败，可能是浏览器自动播放限制", e);
            isVoicePlaying = false; // 播放失败时解除锁定
            checkAndShowOptions(); // 尝试显示选项
        });
        
        // 语音播放结束时解除锁定
        UI.voicePlayer.onended = () => {
            isVoicePlaying = false;
            checkAndShowOptions(); // 尝试显示选项
        };
    } else {
        isVoicePlaying = false; // 没有语音时，直接解除锁定
    }
    
    // 开始打字机动画
    startTypewriter();
}

// 开始打字
function startTypewriter() {
    isTyping = true;
    let index = 0;
    UI.dialogueText.innerText = "";
    clearInterval(typeInterval);
    
    typeInterval = setInterval(() => {
        if (index < currentText.length) {
            displayedText += currentText.charAt(index);
            UI.dialogueText.innerText = displayedText;
            index++;
        } else {
            finishTypewriter();
        }
    }, 40); // 打字速度
}

// 结束打字
function finishTypewriter() {
    clearInterval(typeInterval);
    UI.dialogueText.innerText = currentText;
    isTyping = false;
    
    // 打字完成后，检查是否可以显示选项
    checkAndShowOptions();
}

// 检查是否应该显示选项（需要打字完成 且 语音播放完成）
function checkAndShowOptions() {
    // 只有当不打字了，且语音不播了，才能显示选项或进行下一步
    if (!isTyping && !isVoicePlaying) {
        if (nodeData.options && nodeData.options.length > 0) {
            showOptions(nodeData.options);
        } else {
            // 如果没有选项，显示表示可以继续点击的向下的箭头
            document.getElementById('next-indicator').style.display = 'block';
        }
    } else {
        // 如果语音还在播，或者字还在打，箭头必须藏起来
        document.getElementById('next-indicator').style.display = 'none';
    }
}

// 渲染选项按钮
function showOptions(options) {
    UI.optionsContainer.innerHTML = ""; // 清空
    options.forEach(opt => {
        let btn = document.createElement('button');
        btn.className = 'option-btn';
        
        // 分割选项文本，加上玩家名字
        // 例如："试图安慰：“没关系...”" -> 玩家名: “没关系...”
        let colonIndex = opt.text.indexOf('：“');
        let optionContent = opt.text;
        
        if (colonIndex !== -1) {
            optionContent = opt.text.substring(colonIndex + 1); // 提取“之后的内容
        }
        
        // 使用 span 包裹玩家名字，方便 CSS 设置不同的颜色
        btn.innerHTML = `<span class="option-player-name">${playerName}:</span>${optionContent}`;
        
        // 绑定点击事件
        btn.onclick = (e) => {
            e.stopPropagation(); // 阻止冒泡到对话框
            
            // 如果选项本身带有 penguinChange，在跳转前加上！
            if (opt.penguinChange) {
                updatePenguinDegree(opt.penguinChange);
            }
            
            goToNode(opt.next);
        };
        UI.optionsContainer.appendChild(btn);
    });
    // 显示选项区
    UI.optionsContainer.classList.remove('hidden');
}

// 触发心理学失败报告
function showGameOver(report) {
    UI.dialogueBox.classList.add('hidden'); // 隐藏对话框
    
    // 填充报告内容
    UI.reportBehavior.innerText = report.behavior;
    UI.reportImpact.innerText = report.impact;
    UI.reportSolution.innerText = report.solution;
    
    // 弹窗
    UI.reportModal.classList.remove('hidden');
}

// 监听对话框点击事件
UI.dialogueBox.addEventListener('click', () => {
    // 1. 如果语音还在播放，彻底锁死（但允许文字加速打完）
    if (isVoicePlaying) {
        if (isTyping) {
            finishTypewriter(); // 允许加速文字显示
        }
        return; // 强制拦截！绝对不允许进入下一句
    }
    
    // 2. 如果语音播完了，但文字还在打
    if (isTyping) {
        finishTypewriter();
    } else {
        // 3. 语音播完了，字也打完了
        // 只有当没有选项时，点击对话框才能继续下一句
        if (!nodeData.options || nodeData.options.length === 0) {
            if (nodeData.next) {
                goToNode(nodeData.next);
            }
        }
    }
});

// 监听重新开始按钮
UI.btnRestart.addEventListener('click', initGame);

// 启动入口
window.onload = () => {
    // 游戏加载后先显示起名界面
    UI.nameInputScreen.classList.remove('hidden');
    UI.dialogueBox.classList.add('hidden');
    UI.reportModal.classList.add('hidden');
    document.getElementById('status-bar').classList.add('hidden'); // 隐藏进度条
};

// 绑定开始游戏按钮
UI.btnStartGame.addEventListener('click', () => {
    let inputName = UI.playerNameInput.value.trim();
    if (inputName !== "") {
        playerName = inputName;
    }
    // 隐藏起名界面，显示游戏界面
    UI.nameInputScreen.classList.add('hidden');
    document.getElementById('status-bar').classList.remove('hidden');
    initGame();
});