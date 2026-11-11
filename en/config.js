/* 社区服务器地址（2026-11-09，v68）。页面在自己的脚本之前加载这个文件。
   MUMU_SERVER_URL 留空 = 用页面里的本机默认 http://127.0.0.1:8787（开发）。
   线上：网页版由 deploy/Caddyfile 直接回一个写好域名的 config.js；
         手机 App 由 mobile/scripts/build-www.sh 按环境变量 MUMU_SERVER_URL 在这段前面写上地址。 */
(function(){
  var u = String(window.MUMU_SERVER_URL || '').replace(/\/+$/, '');
  window.MUMU_SERVER_URL = u;
  if (!u) return;
  /* 以前连过本机开发服务器的设备：存着的地址还是 127.0.0.1 / localhost，换成线上地址（名字和开关不动） */
  try {
    ['mumu-cm-srv', 'fp-cm-srv'].forEach(function(k){
      var c = JSON.parse(localStorage.getItem(k) || 'null');
      if (c && typeof c.base === 'string' && /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?\/*$/.test(c.base)) {
        c.base = u; localStorage.setItem(k, JSON.stringify(c));
      }
    });
  } catch (e) {}
})();
