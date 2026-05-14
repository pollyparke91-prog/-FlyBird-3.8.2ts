import { _decorator, Component, Node, director } from 'cc';
import { audioTool } from './utils/audioTool';
import { gameConfig } from './data/gameConfig';
import { save } from './utils/tools';
import { locol } from './data/enum';
const { ccclass, property } = _decorator;

@ccclass('gameoverPop')
export class gameoverPop extends Component {
  start() { }
  protected onEnable(): void {
    if (gameConfig.fenshu > gameConfig.maxFenshu) {
      gameConfig.maxFenshu = gameConfig.fenshu
      save(locol.maxFenshu, gameConfig.maxFenshu)
    } else {
      console.log('再接再励');
    }
  }
  // 重新加载场景
  gameCx() {
    this.node.active = false;
    // 重新加载当前场景
    director.loadScene('main');
  }
  fhStat() {
    audioTool.ins.stopMusic()
    this.node.active = false;
    // 重新加载当前场景
    director.loadScene('start');
  }
}
