import { _decorator, Component, director, Label, Node, NodeEventType, resources, Sprite, SpriteFrame } from 'cc';
import { gameConfig } from '../data/gameConfig';
import { loadPool } from '../utils/loadPool';
import { save } from '../utils/tools';
import { emits, emitVal, locol } from '../data/enum';
import { audioTool } from '../utils/audioTool';
const { ccclass, property } = _decorator;

@ccclass('selectPlayerView')
export class selectPlayerView extends Component {
    // 角色
    @property(Node) player: Node;
    // 标题
    @property(Label) title: Label;
    // 使用按钮
    private selectBtn: Node = null;
    // 解锁按钮
    private jiesuoBtn: Node = null;
    onEnable(): void {
        this.init()
    }
    init() {
        gameConfig.selectPlayer = gameConfig.nowPlayer
        this.selectBtn = this.node.getChildByPath('czBtn/select')
        this.jiesuoBtn = this.node.getChildByPath('czBtn/jiesuo')
        // 返回
        const back = this.node.getChildByName('backHome')
        back.on(NodeEventType.TOUCH_START, this.backBtn, this)
        // 切换
        const left = this.node.getChildByPath('selectBtn/left')
        left.on(NodeEventType.TOUCH_START, this.leftBtn, this)
        const right = this.node.getChildByPath('selectBtn/right')
        right.on(NodeEventType.TOUCH_START, this.rightBtn, this)
        // 更换角色形象
        this.changePlayer()
        // 操作角色选择及解锁
        this.selectBtn.on(NodeEventType.TOUCH_START, this.selectPlay, this)
        this.jiesuoBtn.on(NodeEventType.TOUCH_START, this.jiesuoPlay, this)
    }
    /**
     * 返回首页 
     */
    backBtn() {
        audioTool.ins.playSound('btn')
        loadPool.ins.huiShouNode(this.node)
    }
    /**
     * 切换查看
     */
    rightBtn() {
        if (gameConfig.selectPlayer <= 2) {
            gameConfig.selectPlayer += 1
            this.changePlayer()
        } else {
            console.log('已经没有啦');
            // 通过对象池创建提示预制体
            loadPool.ins.getPoolNode('message', this.node)
            // 调用提示功能
            director.emit(emits.message, '已经没有啦');
        }
    }
    leftBtn() {
        if (gameConfig.selectPlayer > 0) {
            gameConfig.selectPlayer -= 1
            this.changePlayer()
        } else {
            console.log('已经没有啦');
            // 通过对象池创建提示预制体
            loadPool.ins.getPoolNode('message', this.node)
            // 调用提示功能
            director.emit(emits.message, '已经没有啦');
        }
    }
    /**
     * 更换角色形象
     */
    changePlayer() {
        const index = gameConfig.selectPlayer;
        console.log(gameConfig.playerList);
        // 标题
        this.title.string = gameConfig.playerList[index].name
        // 角色
        resources.load(gameConfig.playerList[index].path, SpriteFrame, (err, spriteFrame) => {
            this.player.getComponent(Sprite).spriteFrame = spriteFrame;
        });
        // 下方按钮
        if (gameConfig.playerList[index].isJiesuo == 0) {
            this.jiesuoBtn.active = true
            this.selectBtn.active = false
        } else if (gameConfig.playerList[index].isJiesuo == 1 && index !== gameConfig.nowPlayer) {
            this.jiesuoBtn.active = false
            this.selectBtn.active = true
        } else if (gameConfig.playerList[index].isJiesuo == 1 && index == gameConfig.nowPlayer) {
            this.jiesuoBtn.active = false
            this.selectBtn.active = false
        }
    }
    /**
     * 选择角色
     */
    selectPlay() {
        audioTool.ins.playSound('btn')
        // 通过对象池创建提示预制体
        loadPool.ins.getPoolNode('message', this.node)
        // 调用提示功能
        director.emit(emits.message, '已选择新角色');
        gameConfig.nowPlayer = gameConfig.selectPlayer
        save(locol.nowPlayer, gameConfig.selectPlayer)
        this.selectBtn.active = false
        // 通知首页更换角色
        director.emit(emits.changePlayer)
    }
    // 解锁角色
    jiesuoPlay() {
        this.getPlayer(emitVal.jsPlayer)
        // // 通过对象池创建提示预制体
        // loadPool.ins.getPoolNode('message', this.node)
        // // 调用提示功能
        // director.emit(emits.message, '暂时无奖励');
    }
    getPlayer(val) {
        if (val == emitVal.jsPlayer) {
            // 通过对象池创建提示预制体
            loadPool.ins.getPoolNode('message', this.node)
            // 调用提示功能
            director.emit(emits.message, '恭喜获得新角色');
            gameConfig.playerList[gameConfig.selectPlayer].isJiesuo = 1
            save(locol.playerList, gameConfig.playerList)
            this.jiesuoBtn.active = false
            this.selectBtn.active = true
        }

    }
}


