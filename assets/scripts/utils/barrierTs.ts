import {
  _decorator,
  Component,
  Node,
  Vec3,
  Prefab,
  instantiate,
  director,
  tween,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('barrierTs')
export class barrierTs extends Component {
  // 速度
  @property
  speed: number = 220;
  // 障碍物预制体
  @property(Prefab) barrierPerfab: Prefab;
  // 加速提示节点
  @property(Node) jiasuPop: Node;
  start() {
    // 游戏结束，速度为0
    director.getScene().on(
      'gameOver',
      () => {
        this.speed = 0;
      },
      this
    );
  }
  // 加速提示框
  jiasuPops() {
    tween(this.jiasuPop)
      .to(0.5, {
        position: new Vec3(-143, 173, 0),
      })
      .delay(1)
      .to(0.5, {
        position: new Vec3(-650, 173, 0),
      })
      .start();
  }
  update(deltaTime: number) {
    let allBarrier = this.node.children;
    for (let i = 0; i < allBarrier.length; i++) {
      // 移动距离
      const moveAmount = deltaTime * this.speed;
      const posV3 = new Vec3(
        allBarrier[i].position.x - moveAmount,
        allBarrier[i].position.y,
        0
      );
      allBarrier[i].setPosition(posV3);
      if (allBarrier[i].position.x < -460) {
        // 障碍物的Y轴坐标随机
        let y = Math.round(Math.random() * 490 - 130);
        // 障碍物超出屏幕后重新出现在右侧屏幕外的自定义位置
        allBarrier[i].setPosition(new Vec3(480, y, 0));
        // 奖励品重新显示
        allBarrier[i].getChildByName('nenglaing').active = true;
      }
    }
  }
  // 游戏开始点击屏幕后生成障碍物
  creatBarrier() {
    const barrierX = [430, 1000];
    for (let i = 0; i < barrierX.length; i++) {
      const barrier = instantiate(this.barrierPerfab);
      barrier.parent = this.node;
      barrier.setPosition(new Vec3(barrierX[i], 0, 0));
    }
  }
}
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
//网页客服 http://web3incubators.com/kefu.html