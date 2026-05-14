import { _decorator, CCFloat, Collider2D, Component, Contact2DType, Director, director, Node, RigidBody2D, tween, UITransform, v2, Vec3, Animation, PhysicsSystem2D, log } from 'cc';
import { emits, musicName, pzGroup } from '../data/enum';
import { loadPool } from './loadPool';
import { gameConfig } from '../data/gameConfig';
import { audioTool } from './audioTool';
const { ccclass, property } = _decorator;

@ccclass('playTs')
export class playTs extends Component {
    // 升力
    @property(CCFloat) lilft: number = 12;
    private collider: Collider2D = null;
    private rig: RigidBody2D = null;
    private tran: UITransform = null;
    // 第一次触发
    private isOne: boolean = true
    ani: Animation = null;
    protected onEnable(): void {
        this.init()
    }

    update(deltaTime: number) {

    }
    protected onDestroy(): void {
        this.unscheduleAllCallbacks()
    }
    // 初始化
    init() {
        this.collider = this.getComponent(Collider2D);
        this.rig = this.getComponent(RigidBody2D);
        this.tran = this.getComponent(UITransform)
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.ani = this.node.getComponent(Animation);
        //监听飞行事件
        director.on(emits.flyStart, this.fly, this)

    }
    //飞行
    fly(val) {
        if (val) {
            // 给这个刚体组件一个向量，12代表y轴的量
            this.rig.linearVelocity = v2(0, this.lilft);
            // 头部上扬
            this.node.setRotationFromEuler(new Vec3(0, 0, 11));
            // 尾气
            this.node.getChildByName('weiyan').active = true
        } else {
            // 头部向下
            this.node.setRotationFromEuler(new Vec3(0, 0, -18));
            this.node.getChildByName('weiyan').active = false
        }

    }
    // 碰撞监听
    onBeginContact(selfCollider: any, otherCollider: any, contact: any) {
        switch (otherCollider.group) {
            case pzGroup.gold:
                console.log('碰到金币了');
                audioTool.ins.playSound(musicName.pzNengliang);
                gameConfig.fenshu += 1
                director.emit(emits.deFen)
                this.scheduleOnce(() => {
                    loadPool.ins.getPoolNode('jiangliSpe', gameConfig.rootNode, this.node.position)
                    this.hsGold()
                }, 0.05)
                break
            case pzGroup.emeny:
                console.log('碰到敌人');
                audioTool.ins.playSound(musicName.zhuangji);
                this.scheduleOnce(() => {
                    this.node.active = false
                    loadPool.ins.getPoolNode('didSpe', gameConfig.rootNode, this.node.position)
                    this.hsDid()
                }, 0.1)
                break
        }
    }
    // 回收预制体
    hsDid() {
        setTimeout(() => {
            const node = gameConfig.rootNode.getChildByName('didSpe')
            loadPool.ins.huiShouNode(node)
            loadPool.ins.getPoolNode('gameOver', gameConfig.rootNode, new Vec3(0, 0, 0))
        }, 500)
    }
    hsGold() {
        setTimeout(() => {
            const node = gameConfig.rootNode.getChildByName('jiangliSpe')
            loadPool.ins.huiShouNode(node)

        }, 500)
    }
}


