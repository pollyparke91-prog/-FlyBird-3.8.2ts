import {
  _decorator,
  Component,
  Node,
  Label,
  director,
  tween,
  Vec3,
  sys,
} from 'cc';
import { emits } from './data/enum';
import { gameConfig } from './data/gameConfig';
const { ccclass, property } = _decorator;

@ccclass('fenshu')
export class fenshu extends Component {
  private fenshuLabel = null;
  start() {
    director.on(emits.deFen, this.changeFenshu, this);
  }
  protected onEnable(): void {
    this.fenshuLabel = this.node.getComponent(Label);
  }
  update(deltaTime: number) { }
  protected onDestroy(): void {
    director.off(emits.deFen, this.changeFenshu, this);
  }
  //电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
  // 改变屏幕中的分数
  changeFenshu(val: number) {
    tween(this.node)
      .to(0.2, { scale: new Vec3(1.5, 1.5, 1.5) })
      .to(0.2, { scale: new Vec3(1, 1, 1) })
      .start();
    this.fenshuLabel.string = gameConfig.fenshu;
  }
}
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html