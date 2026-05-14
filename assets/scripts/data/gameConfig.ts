import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gameConfig')
export class gameConfig {
    // 游戏根节点
    static rootNode: Node = null;
    // 音乐音量
    static bgmVol: number = 0.8;
    // 音乐音量
    static soundVol: number = 0.8;
    // 当前分数
    static fenshu: number = 0;
    // 最高分数
    static maxFenshu: number = 0;
    // 当前角色
    static selectPlayer: number = 0;
    // 使用中的角色
    static nowPlayer: number = 0;
    // 角色列表
    static playerList = [
        { path: 'player/pl_1/spriteFrame', name: '神秘蓝面侠', isJiesuo: 1 },
        { path: 'player/pl_2/spriteFrame', name: '喵喵教教主', isJiesuo: 0 },
        { path: 'player/pl_3/spriteFrame', name: '汪汪教教主', isJiesuo: 0 },
        { path: 'player/pl_4/spriteFrame', name: '呆萌帽博士', isJiesuo: 0 }
    ]
}


