import {
  _decorator,
  Component,
  Node,
  Slider,
  ProgressBar,
  sys,
  AudioSource,
} from 'cc';
import { gameConfig } from './data/gameConfig';
import { loadPool } from './utils/loadPool';
import { audioTool } from './utils/audioTool';
import { save } from './utils/tools';
import { locol } from './data/enum';
const { ccclass, property } = _decorator;

@ccclass('gameSetting')
export class gameSetting extends Component {
  // 音乐滑块
  @property(Slider)
  private yinyueSlider: Slider = null;
  // 音乐音量进度条
  @property(ProgressBar) yinyueProgressBar: ProgressBar;
  // 音效滑块
  @property(Slider)
  private yinxiaoSlider: Slider = null;
  // 音效音量进度条
  @property(ProgressBar) yinixaoProgressBar: ProgressBar;
  // ----------------------------------
  protected onEnable(): void {
    // 音乐滑块注册
    this.yinyueSlider.node.on('slide', this.yinyueSetting, this);
    //音效滑块注册
    this.yinxiaoSlider.node.on('slide', this.yinxiaoSetting, this);
  }
  //   初始化音量
  initYinliang() {
    //  音乐
    this.yinyueSlider.progress = this.yinyueProgressBar.progress = gameConfig.bgmVol;
    //   音效
    this.yinxiaoSlider.progress = this.yinixaoProgressBar.progress = gameConfig.soundVol;

  }
  // 音乐音量
  yinyueSetting(slider: Slider) {
    audioTool.ins.setVolume(Number(slider.progress.toFixed(2)))
    // 进度条的值等于滑块的值，保证滑块和进度一致
    this.yinyueProgressBar.progress = Number(slider.progress.toFixed(2));
    gameConfig.bgmVol = Number(slider.progress.toFixed(2));
  }
  // 音效音量
  yinxiaoSetting(slider: Slider) {
    this.yinixaoProgressBar.progress = Number(slider.progress.toFixed(2));
    gameConfig.soundVol = Number(slider.progress.toFixed(2));
  }
  // 确认按钮
  queRenBtn() {
    save(locol.bgmVol, gameConfig.bgmVol)
    save(locol.soundVol, gameConfig.soundVol)
    loadPool.ins.huiShouNode(this.node)
  }

  update(deltaTime: number) { }
}
