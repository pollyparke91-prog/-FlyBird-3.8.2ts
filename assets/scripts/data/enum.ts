import { _decorator, AudioClip, Component, JsonAsset, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 资源路径
 */
export const resPath = {
    enemysPer: { type: Prefab, path: 'parfabs/enemys' },
    playersPer: { type: Prefab, path: 'parfabs/players' },
    UIPerfab: { type: Prefab, path: 'parfabs/UI' },
    music: { type: AudioClip, path: 'music' },
};
/**
 * 监听事件名称
 */
export const emits = {
    flyStart: 'flyStart',
    deFen: 'deFen',
    message: 'message',
    changePlayer: 'changePlayer',
    jili: 'jili',
};
/**
 * 监听事件名称
 */
export const emitVal = {
    jsPlayer: 'jsPlayer',
};
/**
 * 碰撞类型
 */
export const pzGroup = {
    player: 2,
    emeny: 4,
    gold: 8,
    fenshu: 16,
};
/**
 * 音乐
 */
export const musicName = {
    startGameMusic: 'startGameMusic',
    pzNengliang: 'pzNengliang',
    gameMusic: 'gameMusic',
    zhuangji: 'zhuangji',
};
/**
 * 本地存储
 */
export const locol = {
    bgmVol: 'bgmVol',
    soundVol: 'soundVol',
    maxFenshu: 'maxFenshu',
    nowPlayer: 'nowPlayer',
    playerList: 'playerList',
};


