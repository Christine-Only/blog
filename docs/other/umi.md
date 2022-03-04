# umi常见问题

## 云效Node.js构建报错
> '"umi"' has no exported member named 'history'. Did you mean 'History'?

解决步骤：
1. 确保 tsconfig.json 中有配置 @@ 的路径，比如 `"@@/*": ["src/.umi/*"]`。
2. 执行 `umi generate tmp`命令
在跑 `npm run build` 之前，先执行一次 `npm run postinstall`。对应的命令如下：
3. CI/CD执行命令顺序
```shell
"scripts": {
    "build": "cross-env UMI_ENV=prod umi build",
    "postinstall": "umi generate tmp",
}
```