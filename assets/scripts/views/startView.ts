import {
  _decorator,
  Component,
  director,
  sys,
  Label,
  tween,
  Vec3,
  Sprite,
  v3,
  profiler,
  resources,
  SpriteFrame,
} from 'cc';
import { emits, musicName } from '../data/enum';
import { audioTool } from '../utils/audioTool';
import { loadPool } from '../utils/loadPool';
import { gameConfig } from '../data/gameConfig';
const { ccclass, property } = _decorator;
@ccclass('startTs')
// 创建选择飞船实例
export class startTs extends Component {
  @property(Label) maxDefen: Label;
  start() {
    audioTool.ins.playMusic(musicName.startGameMusic);
    profiler.hideStats();
    this.maxFenshu();
    this.feichuanAm();
    this.maxDefen.string = gameConfig.maxFenshu + ''
    director.on(emits.changePlayer, this.changePlayer, this)
  }
  /**
   * 初始化首页飞船 
   */

  feichuanAm() {
    this.changePlayer()
    // 飞船动画
    tween(this.node.getChildByName('feichuan'))
      .to(1, { position: v3(0, 23, 0) }, { easing: 'linear' })
      .to(1, { position: v3(0, -23, 0) }, { easing: 'linear' })
      .union()
      .repeatForever()
      .start();
  }
  changePlayer() {
    // 角色
    resources.load(gameConfig.playerList[gameConfig.nowPlayer].path, SpriteFrame, (err, spriteFrame) => {
      this.node.getChildByName('feichuan').getComponent(Sprite).spriteFrame = spriteFrame;
    });
  }
  // 最高得分显示
  maxFenshu() {

  }
  // 游戏设置
  gameSettingBtn() {
    audioTool.ins.playSound('btn')
    loadPool.ins.getPoolNode('settingPop', this.node)
  }
  // 选择飞船
  selectPlayer() {
    audioTool.ins.playSound('btn')
    loadPool.ins.getPoolNode('selectPlayer', this.node)
  }
  // 经典关卡
  startBtn() {
    audioTool.ins.playSound('btn')
    audioTool.ins.stopMusic();
    director.loadScene('main');
  }
}
