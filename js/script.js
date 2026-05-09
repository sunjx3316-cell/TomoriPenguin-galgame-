// script.js - 存放游戏所有剧本数据
const gameScript = {
    startNode: "scene_1_intro",
    nodes: {
        // --- 第一章：楼梯间的迷子 ---
        "scene_1_intro": {
            speaker: "我",
            text: "（作为羽丘女子学园新来的心理辅导干事，我接到了一个特别的关注任务...）",
            bg: "assets/bg/走廊.jpg",
            next: "scene_1_find"
        },
        "scene_1_find": {
            speaker: "我",
            text: "（放学后的楼梯间，我发现高松灯正躲在角落里瑟瑟发抖。听说她弄丢了大家一起写的歌词本。）",
            bg: "assets/bg/楼道.jpg",
            next: "scene_1_tomori"
        },
        "scene_1_tomori": {
            speaker: "高松灯",
            text: "那个...对不起...",
            voice: "assets/voices/那个.mp3",
            sprite: "assets/sprites/tomori_tremble.png",
            options: [
                {
                    text: "试图安慰：“没关系的灯，大家不会怪你的，别哭了。”",
                    next: "scene_1_bad_1_reaction"
                },
                {
                    text: "转移注意：“歌词本丢了还可以重写，我们先去吃点好吃的吧？”",
                    next: "scene_1_bad_2_reaction"
                },
                {
                    text: "情感接纳：“丢了很重要的东西，你现在一定很害怕对吧？我陪你在这里坐一会。”",
                    penguinChange: 15,
                    next: "scene_1_success"
                }
            ]
        },
        "scene_1_bad_1_reaction": {
            speaker: "高松灯",
            text: "额...可是...",
            voice: "assets/voices/额-犹豫.mp3",
            sprite: "assets/sprites/tomori_tremble.png",
            next: "scene_1_bad_1_reaction_2"
        },
        "scene_1_bad_1_reaction_2": {
            speaker: "高松灯",
            text: "没关系...？怎么可能没关系！那是大家的心血...\n你根本不明白那种感觉！（她甩开你的手，哭着跑开了）",
            sprite: "assets/sprites/tomori_cry.png",
            next: "bad_end_1"
        },
        "scene_1_bad_2_reaction": {
            speaker: "高松灯",
            text: "额...吃东西...重写...？",
            voice: "assets/voices/额-吃惊.mp3",
            sprite: "assets/sprites/tomori_cry.png",
            next: "scene_1_bad_2_reaction_2"
        },
        "scene_1_bad_2_reaction_2": {
            speaker: "高松灯",
            text: "原来在你心里，大家一起写的歌词是可以随便被替代的吗...\n（她抱紧双臂，把头深深埋进膝盖，彻底拒绝与你沟通）",
            sprite: "assets/sprites/tomori_cry.png",
            next: "bad_end_2"
        },
        "scene_1_success": {
            speaker: "我",
            text: "（灯停止了发抖，小心翼翼地看了我一眼，似乎感受到了一丝安全感...）",
            sprite: "assets/sprites/tomori_sad_look.png",
            next: "scene_1_end"
        },
        "scene_1_end": {
            speaker: "高松灯",
            text: "那个...谢谢你。",
            voice: "assets/voices/谢谢你.mp3",
            sprite: "assets/sprites/tomori_sad_look.png",
            next: "chapter_1_clear"
        },
        "chapter_1_clear": {
            speaker: "系统",
            text: "【第一章 结束】\n灯对你的信任增加了，向着“凑企鹅”迈进了一小步！\n（点击继续进入第二章）",
            next: "scene_2_intro" 
        },

        // --- 第二章：一辈子的乐队 ---
        "scene_2_intro": {
            speaker: "我",
            text: "（几天后，灯带着找回的歌词本，怯生生地来到音乐室，但是她依然不敢面对其他乐队成员的目光。）",
            bg: "assets/bg/音乐室.jpg",
            next: "scene_2_tomori"
        },
        "scene_2_tomori": {
            speaker: "高松灯",
            text: "大家...真的能组一辈子的乐队吗...？",
            voice: "assets/voices/一辈子的乐队.mp3",
            sprite: "assets/sprites/tomori_tremble.png",
            options: [
                {
                    text: "现实主义：“一辈子太长了，我们还是先练好下一场演出吧。”",
                    next: "scene_2_bad_reaction"
                },
                {
                    text: "坚定承诺：“嗯！只要灯愿意唱，我们就会一直在。”",
                    penguinChange: 20,
                    next: "scene_2_success"
                }
            ]
        },
        "scene_2_bad_reaction": {
            speaker: "高松灯",
            text: "哇...对不起，我果然还是太奇怪了...",
            voice: "assets/voices/哇-suprise.mp3",
            sprite: "assets/sprites/tomori_cry.png",
            next: "bad_end_3"
        },
        "scene_2_success": {
            speaker: "高松灯",
            text: "额...真的吗...？",
            voice: "assets/voices/额-犹豫.mp3",
            sprite: "assets/sprites/tomori_sad_look.png",
            next: "scene_2_success_2"
        },
        "scene_2_success_2": {
            speaker: "我",
            text: "（灯的眼中闪烁着前所未有的光芒，那是名为‘凑企鹅’的执着。）",
            sprite: "assets/sprites/tomori_sad_look.png", 
            next: "scene_2_end"
        },
        "scene_2_end": {
            speaker: "高松灯",
            text: "嗯！",
            voice: "assets/voices/tomori-嗯（有信心）.mp3",
            sprite: "assets/sprites/害羞.png",
            next: "chapter_2_clear"
        },
        "chapter_2_clear": {
            speaker: "系统",
            text: "【第二章 结束】\n灯的内心开始变得坚强，企鹅度大幅提升！\n（点击继续进入第三章）",
            next: "scene_3_intro"
        },

        // --- 第三章：不再逃避 ---
        "scene_3_intro": {
            speaker: "我",
            text: "（周末，为了缓解排练的压力，我陪灯来到了她最喜欢的水族馆。看着玻璃后游来游去的企鹅，她主动开口了。）",
            bg: "assets/bg/水族馆.png",
            sprite: "assets/sprites/hello-开心的打招呼.png",
            next: "scene_3_tomori_1"
        },
        "scene_3_tomori_1": {
            speaker: "高松灯",
            text: "你看...那只企鹅，一直想跳下水，可是它旁边没有同伴，它就在岸上一直犹豫...",
            sprite: "assets/sprites/tomori_sad_look.png",
            next: "scene_3_tomori_2"
        },
        "scene_3_tomori_2": {
            speaker: "高松灯",
            text: "乐队的大家最近都不怎么说话了，如果就这样解散了...嗯，我们不能让它像这样结束。",
            voice: "assets/voices/嗯，我们不能让它像这样结束.mp3",
            sprite: "assets/sprites/害羞.png",
            options: [
                {
                    text: "包办代替：“别担心，交给我去跟她们说吧，你休息就好。”",
                    next: "scene_3_bad_reaction"
                },
                {
                    text: "赋能鼓励：“既然不想结束，就用你自己的歌词去告诉她们吧！就像那只企鹅，总要自己迈出第一步的。”",
                    penguinChange: 25,
                    next: "scene_3_success_1"
                }
            ]
        },
        "scene_3_bad_reaction": {
            speaker: "高松灯",
            text: "啊...我是不是做了什么奇怪的事...对不起，我还是不行...",
            voice: "assets/voices/我是不是做了什么奇怪的事.mp3",
            sprite: "assets/sprites/tomori_tremble.png",
            next: "bad_end_4"
        },
        "scene_3_success_1": {
            speaker: "高松灯",
            text: "我的...歌词...？可是我的歌词总是那么沉重，大家会愿意听吗...？",
            sprite: "assets/sprites/tomori_sad_look.png",
            options: [
                {
                    text: "肯定价值：“因为沉重，所以才真实啊！这就是你的力量。”",
                    penguinChange: 10,
                    next: "scene_3_success_2"
                }
            ]
        },
        "scene_3_success_2": {
            speaker: "高松灯",
            text: "嗯！我明白了，就算声音颤抖，我也要自己去说！",
            voice: "assets/voices/嗯-坚定.mp3",
            sprite: "assets/sprites/害羞.png", 
            next: "chapter_3_clear"
        },
        "chapter_3_clear": {
            speaker: "系统",
            text: "【第三章 结束】\n灯学会了直面困难，不再逃避。企鹅度即将满盈！\n（点击继续进入第四章：破茧成鹅）",
            next: "scene_4_intro"
        },

        // --- 第四章：破茧成鹅（大结局） ---
        "scene_4_intro": {
            speaker: "我",
            text: "（Livehouse的舞台上，灯光亮起。这本该是一场完美的演出，但在上台前，由于紧张和过往的阴影，灯突然站在幕布后停住了脚步。）",
            bg: "assets/bg/舞台.jpg", 
            sprite: "assets/sprites/tomori_tremble.png",
            next: "scene_4_tomori_1"
        },
        "scene_4_tomori_1": {
            speaker: "高松灯",
            text: "刚才的彩排...这并不好，我需要唱得更好...可是我的手一直在抖...",
            voice: "assets/voices/这并不好，我需要唱得更好.mp3",
            sprite: "assets/sprites/tomori_tremble.png",
            options: [
                {
                    text: "悲观妥协：“没关系，如果实在不行，我们取消演出吧。”",
                    next: "scene_4_bad_reaction"
                },
                {
                    text: "最后推一把：“你已经不是那个只会发抖的迷子了！带着这份紧张，去把心意唱出来！”",
                    penguinChange: 15,
                    next: "scene_4_tomori_2"
                }
            ]
        },
        "scene_4_bad_reaction": {
            speaker: "高松灯",
            text: "唉，我们下次会做的更好...可是，真的还有下次吗...",
            voice: "assets/voices/唉，我们下次会做的更好（内疚）.mp3",
            sprite: "assets/sprites/tomori_cry.png",
            next: "bad_end_5"
        },
        "scene_4_tomori_2": {
            speaker: "高松灯",
            text: "我虽然有些紧张，但是这都不是事！",
            voice: "assets/voices/我虽然有些紧张但是这都不是事.mp3",
            sprite: "assets/sprites/自信演出.png", 
            next: "scene_4_tomori_3"
        },
        "scene_4_tomori_3": {
            speaker: "高松灯",
            text: "大家，听得到吗！\n我们要组一辈子的乐队！谁都不许逃哦！",
            voice: "assets/voices/一辈子的乐队.mp3",
            sprite: "assets/sprites/自信演出.png",
            options: [
                {
                    text: "在台下欢呼：“上吧！凑企鹅！”",
                    penguinChange: 15,
                    next: "scene_4_success"
                }
            ]
        },
        "scene_4_success": {
            speaker: "高松灯",
            text: "（演出大获成功，灯在台上露出了极其自信、甚至带点腹黑的笑容。）\n我的歌，很高兴被大家听到了！",
            voice: "assets/voices/我的歌很高兴被大家听到了.mp3",
            sprite: "assets/sprites/自信演出.png",
            next: "chapter_4_clear"
        },
        "chapter_4_clear": {
            speaker: "系统",
            text: "【游戏通关！】\n企鹅度达到 100%！高松灯成功觉醒“魔丸”性格，你成功拯救了她！\n（即将播放隐藏成就动画，请确保已打开声音...）",
            next: "show_penguin_cg"
        },
        "show_penguin_cg": {
            // 这里修改为支持随机播放！只要把多个视频的路径放进这个中括号里即可
            video: [
                "assets/videos/cg1.mp4",
                "assets/videos/cg2.mp4",
                "assets/videos/cg3.mp4",
                "assets/videos/cg4.mp4"
            ],
            next: null
        },

        // --- 以下是 Bad End 和心理学分析弹窗 ---
        "bad_end_1": {
            isGameOver: true,
            penguinChange: -20,
            report: {
                behavior: "在对方陷入重度焦虑和自责时，试图用轻描淡写的“没关系”、“别哭了”来抹平对方的情绪。",
                impact: "【情绪无效化 Emotional Invalidation】。灯会认为“连你也不理解我失去它的痛苦”，这加剧了她的内疚感和孤独感，导致她彻底关闭心门，陷入更深的自闭。",
                solution: "面对高敏感人群的创伤应激反应，第一步永远是【情绪确认 Emotional Validation】。不要急着解决问题，而是先接纳她此刻的痛苦，允许她难过。"
            }
        },
        "bad_end_2": {
            isGameOver: true,
            penguinChange: -20,
            report: {
                behavior: "在对方深陷悲伤时，强行转移话题，试图用“吃好吃的”、“重写”来掩盖创伤。",
                impact: "【回避型应对与共情缺失】。这种做法不仅无法解决她内心的自责，反而让她觉得自己的悲伤是“不被允许的、是麻烦的”，从而进一步加重“我是个麻烦”的讨好型认知。",
                solution: "陪伴并允许负面情绪的存在。告诉她“为了重要的东西而感到难过是正常的”，为她提供一个安全的心理容纳空间。"
            }
        },
        "bad_end_3": {
            isGameOver: true,
            penguinChange: -30,
            report: {
                behavior: "在对方鼓起勇气表达内心深处对永恒关系的渴望时，用现实主义的论调去否定其价值。",
                impact: "【核心信念被驳斥 (Core Belief Rejection)】。高松灯具有极度的“被抛弃恐惧”。当你否定“一辈子”时，就是在告诉她“关系迟早会结束”，这会瞬间击溃她刚刚建立的安全感。",
                solution: "对于极度缺乏安全感的人，在他们寻求承诺时，需要给予【无条件的积极关注 (Unconditional Positive Regard)】，哪怕这个承诺在现实中很难实现，也要先接纳她对关系的渴望。"
            }
        },
        "bad_end_4": {
            isGameOver: true,
            penguinChange: -30,
            report: {
                behavior: "在对方试图迈出舒适区、寻求自我突破时，过度保护并大包大揽替她解决问题。",
                impact: "【过度代偿与习得性无助 (Overcompensation & Learned Helplessness)】。你的包办代替剥夺了她建立自我效能感的机会。这不仅无法让她独立，反而让她更加确信“我自己什么都做不好，必须依赖别人”。",
                solution: "采取【赋能干预 (Empowerment)】。鼓励她用自己的方式（比如写歌词）去表达，作为辅导者，你应该做那个站在台下鼓掌的人，而不是替她上台的人。"
            }
        },
        "bad_end_5": {
            isGameOver: true,
            penguinChange: -40,
            report: {
                behavior: "在对方临场退缩并表达出对自己能力的怀疑时，顺应她的逃避心理，提议取消演出。",
                impact: "【逃避行为强化 (Reinforcement of Avoidance)】。虽然短期内缓解了她的焦虑，但从长远来看，这验证了她“我果然做不到”的灾难化想象，剥夺了她获得成功经验（矫正性情绪体验）的最后机会。",
                solution: "此时需要【果断的现实检验与鼓励】。不要让她沉溺于“如果搞砸了怎么办”的假设中，而是将她的注意力拉回到“你已经准备得很好了”的客观现实上，推她走出最后一步。"
            }
        }
    }
};