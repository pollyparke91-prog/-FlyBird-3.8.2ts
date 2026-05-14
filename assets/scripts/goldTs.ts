import { _decorator, Collider2D, Component, Contact2DType, Director, director, Node, tween, v3 } from 'cc';
import { pzGroup } from './data/enum';
const { ccclass, property } = _decorator;
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html
@ccclass('nenglaingTs')
export class nenglaingTs extends Component {
  private collider: Collider2D = null;
  protected onEnable(): void {
    this.init();
  }
  init() {
    this.collider = this.node.getComponent(Collider2D);
    this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    tween(this.node)
      .to(1.6, { position: v3(0, 80, 0) })
      .to(1.6, { position: v3(0, -80, 0) })
      .union()
      .repeatForever()
      .start();
  }
  // 碰撞监听
  onBeginContact(selfCollider: any, otherCollider: any, contact: any) {
    if (otherCollider.group == pzGroup.player) {
      director.once(Director.EVENT_AFTER_PHYSICS, () => {
        this.node.active = false
      });
    }
  }
}
