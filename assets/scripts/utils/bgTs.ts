import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bgTs')
export class bgTs extends Component {
  // 速度
  @property
  speed: number = 40;
  // 图片宽度
  @property
  width: number = 40;
  start() {}

  update(deltaTime: number) {
    // 获取所有子节点
    const allBg = this.node.children;
    for (let i = 0; i < allBg.length; i++) {
      // 移动距离
      const moveAmount = deltaTime * this.speed;
      const posV3 = new Vec3(
        allBg[i].position.x - moveAmount,
        allBg[i].position.y,
        0
      );
      allBg[i].setPosition(posV3);
      if (allBg[i].position.x < -this.width) {
        allBg[i].setPosition(
          new Vec3(
            allBg[i].position.x + this.width * 2 - 2,
            allBg[i].position.y,
            0
          )
        );
      }
    }
  }
}
