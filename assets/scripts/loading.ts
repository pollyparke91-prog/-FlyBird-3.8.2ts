import { _decorator, Component, director, Node, profiler, ProgressBar } from 'cc';
import { loadRes } from './utils/loadRes';
import { locol, resPath } from './data/enum';
import { load, save } from './utils/tools';
import { gameConfig } from './data/gameConfig';
const { ccclass, property } = _decorator;

@ccclass('loading')
export class loading extends Component {
    @property(ProgressBar)
    progre: ProgressBar = null;
    start() {
        this.init()
    }

    init() {
        profiler.hideStats();
        // 加载资源
        loadRes.ins.loadBundle('bundles');
        loadRes.ins.resLoad(resPath.enemysPer);
        loadRes.ins.resLoad(resPath.playersPer);
        loadRes.ins.resLoad(resPath.UIPerfab);
        loadRes.ins.resLoad(resPath.music);
        /**
         * 初始化游戏数据
         */
        // 音乐音量
        let bgmVol = load(locol.bgmVol)
        if (!bgmVol) {
            bgmVol = 0.8
            save(locol.bgmVol, bgmVol)
        }
        gameConfig.bgmVol = bgmVol
        // 音效音量
        let soundVol = load(locol.soundVol)
        if (!soundVol) {
            soundVol = 0.8
            save(locol.soundVol, soundVol)
        }
        gameConfig.soundVol = soundVol
        // 当前使用角色
        let nowPlayer = load(locol.nowPlayer)
        if (!nowPlayer) {
            nowPlayer = 0
            save(locol.nowPlayer, nowPlayer)
        }
        gameConfig.nowPlayer = nowPlayer

        // 角色列表
        let playerList = load(locol.playerList, 2)
        if (playerList) {
            gameConfig.playerList = playerList
        }

        // 最高分
        let maxFenshu = load(locol.maxFenshu)
        if (!maxFenshu) {
            maxFenshu = 0
            save(locol.maxFenshu, maxFenshu)
        }
        gameConfig.maxFenshu = maxFenshu

        // 进度条
        this.startJindu()
    }
    /**
     * 进度条进度
     */
    startJindu() {
        // 将在 10 秒后开始计时，每 5 秒执行一次回调，重复 3 + 1 次
        this.schedule(function () {
            // 这里的 this 指向 component
            this.progre.progress += 0.1;
            if (this.progre.progress >= 0.5) {
                this.unschedule(this.schedule)
                this.jinduPause()
            }
        }, 0.1, 4, 0.3);
    }
    jinduPause() {
        this.scheduleOnce(() => {
            this.loadScene()
        }, 1)
    }
    loadScene() {
        this.schedule(function () {
            this.progre.progress += 0.1;
            if (this.progre.progress >= 1) {
                this.unschedule(this.schedule)
                director.loadScene("start")
            }
        }, 0.2, 6, 0.3);
    }
}


