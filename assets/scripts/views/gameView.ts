import { _decorator, Component, director, EventTouch, game, Node, PhysicsSystem2D, resources, Sprite, SpriteFrame, Vec3 } from 'cc';
import { emits, musicName } from '../data/enum';
import { loadPool } from '../utils/loadPool';
import { gameConfig } from '../data/gameConfig';
import { audioTool } from '../utils/audioTool';
const { ccclass, property } = _decorator;

@ccclass('gameView')
export class gameView extends Component {
    // 是否刚开始游戏
    private isOnce: boolean = true;
    // 玩家
    @property(Node) palyer: Node = null;
    start() {
        this.init()
    }

    /**
     * 
     * @param event 
     */
    init() {
        gameConfig.fenshu = 0;
        PhysicsSystem2D.instance.enable = false;
        audioTool.ins.playMusic(musicName.gameMusic);
        gameConfig.rootNode = this.node
        // 点击屏幕
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this)
        // 初始化角色形象
        resources.load(gameConfig.playerList[gameConfig.nowPlayer].path, SpriteFrame, (err, spriteFrame) => {
            console.log(spriteFrame);
            this.palyer.getComponent(Sprite).spriteFrame = spriteFrame;
        });

    }
    // 点击屏幕
    onTouchStart(event: EventTouch) {
        //   控制飞船
        director.emit(emits.flyStart, true)
        if (this.isOnce) {
            this.isOnce = false;
            PhysicsSystem2D.instance.enable = true;
            // 取消提示
            this.node.getChildByName('yindao').active = false
            this.node.getChildByName('barrierRoot').active = true
            // loadPool.ins.getPoolNode(resPrefab.barrier, this.node, new Vec3(432, 0, 0))
        }
    }
    // 松开屏幕
    onTouchEnd(event: EventTouch) {
        //   控制飞船
        director.emit(emits.flyStart, false)
    }

    /**
     * 注销事件
     */
    protected onDestroy(): void {
        // 点击屏幕
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this)
    }
}


