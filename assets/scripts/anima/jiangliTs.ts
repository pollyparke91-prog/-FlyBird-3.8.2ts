import { _decorator, Component, Node, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('jiangliTs')
export class jiangliTs extends Component {
    ani: Animation = null;
    onEnable(): void {
        this.ani = this.node.getComponent(Animation);
        this.ani.play('jiang')
    }
}


