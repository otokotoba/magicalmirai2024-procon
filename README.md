This app was developed as a work for [this programming contest](https://magicalmirai.com/2024/procon/).

## 審査員の方向けの情報

### 開発環境

- Ubuntu 22.04.4

- Node.js 20.14.0

- TypeScript 5.4.5

### 主な使用ライブラリ

- [`Next.js`](https://github.com/vercel/next.js)

  [`React`](https://github.com/facebook/react)フレームワーク

- [`Material UI`](https://github.com/mui/material-ui)

  React用コンポーネントライブラリ

- [`Zustand`](https://github.com/pmndrs/zustand)

  React用状態管理ライブラリ

- [`React Three Fiber`](https://github.com/pmndrs/react-three-fiber)

  [`Three.js`](https://github.com/mrdoob/three.js/)用Reactレンダラー

- [`React Three Drei`](https://github.com/pmndrs/drei)

  `React Three Fiber`用拡張ライブラリ

- [`gltfjsx`](https://github.com/pmndrs/gltfjsx)

  元のGLTFを軽量化し、`React Three Fiber`用JSXに変換するツール

- [`React Three Rapier`](https://github.com/pmndrs/react-three-rapier)

  物理エンジン[`Rapier`](https://github.com/dimforge/rapier)の`React Three Fiber`用ラッパー

### プロジェクト構成

- [`Next.js`の`App Router`版の構成](https://nextjs.org/docs/getting-started/project-structure)に従っています。

- `/src/text-alive`内のエントリーファイル : `Player.tsx`

- `/src/game`内のエントリーファイル : `Game.tsx`

### 補足

- `/public/models`内のGLTFは`gltfjsx`で軽量化し、[`useLoader`](https://docs.pmnd.rs/react-three-fiber/api/hooks#pre-loading-assets)のプリロード機能を使い、読み込み時間を短縮しています。

- `/public`内のフォントデータは、[`Facetype.js`](https://gero3.github.io/facetype.js/)で歌詞に必要な文字だけに絞ってサブセット化を行い、読み込み時間を短縮しています。

- MMDモデル内の物理演算には、`/public/libs`内の[`ammo.js`](https://threejs.org/docs/#examples/en/animations/MMDPhysics)を使用しています。

- SNSでの共有を想定して、OGPに対応しています。

- 操作性やスペックの都合上、スマートフォンやタブレットではプレイできません。

- 以下のパソコンのChrome上で動作することを確認しました。ただし、スペックによっては多少動作が重くなることがあります。

- MacBook Pro(M1 / 16GB)

- MacBook Air(M2)

- Windows(Intel Core i7 14世代 / 64GB)

- Windows(Intel Core i5 12世代 / 8GB)

- Windows(Intel Core i7 10世代)
