/*
 * CNA 募集一覧（Elfsight イベントカレンダー）に、Google カレンダー側に
 * 登録されていない募集を静的に追加する。
 * 追加・変更するときは EXTRA_EVENTS を編集する（end は start の翌日）。
 * 既に同じ name のイベントがフィードにある場合は追加しない。
 */
(function () {
  var EXTRA_EVENTS = [
  {
    "id": "jcna-static-basic-2027-01",
    "name": "【本申込中】ベーシックコース 27年1月分 (6,600円,税込)",
    "start": {
      "date": "2027-01-20",
      "dateTime": null
    },
    "end": {
      "date": "2027-01-21",
      "dateTime": null
    },
    "description": "<span>環境省「</span><a href=\"https://policies.env.go.jp/policy/decarbonization_advisor/#:~:text=JCNA%E3%82%AB%E3%83%BC%E3%83%9C%E3%83%B3%E3%83%8B%E3%83%A5%E3%83%BC%E3%83%88%E3%83%A9%E3%83%AB%E3%83%BB%E3%82%A2%E3%83%89%E3%83%90%E3%82%A4%E3%82%B6%E3%83%BC%E3%83%BB%E3%83%99%E3%83%BC%E3%82%B7%E3%83%83%E3%82%AF\" target=\"_blank\">脱炭素アドバイザー ベーシック</a><span>」認定資格の「CNA Bsc.」コースです。</span><br><br><b>★本申込★</b><br>定員有・先着順です。以下よりお申込みください。<b>申込の締め切りは1</b><b>月20</b><b>日</b>  (※１）<br><br><a href=\"https://contact.cna.altpaper.net/apex/PageApplicationEntrance?param=8738adcf974a7471b9d096b746326bcb3b638ce3583941764ac703f34816cdcf99037628e481101c0adf6f1d24bbaf9f017e7dccad016775d642a1c31154e2cf5da613b7ad4b9146c0df2cc74f21a954388350313e7e97d17cf3f2de3cc9d8f057db7ab04b29802535781f0a3b96fbf07dd68a77194b49c9e6f54e7827d98aed7b1bcbde0b6ddf33b7fed93e35e502777722a2fad6281d431d5edb20e541109fe55d8047ada0927522cc135254bd5a092fa1200258d22e87a547d429353fecf25ce2311f9eb72f054751929b6fdb9b15aa150610a25caa31d8d3183c46e705dc3a3b5820293a6f92ca7fdb42f322b012&amp;applytitle.title=%E3%83%99%E3%83%BC%E3%82%B7%E3%83%83%E3%82%AF%E7%94%B3%E8%BE%BC&amp;firsthalf.title=%E4%BA%8B%E5%89%8D%E5%AD%A6%E7%BF%92&amp;firsthalf.month=-&amp;firsthalf.day=%E3%83%93%E3%83%87%E3%82%AA%E8%87%AA%E7%BF%92&amp;firsthalf.description=%E2%98%85%E7%94%B3%E8%BE%BC%E5%BE%8C%E3%83%93%E3%83%87%E3%82%AA%E9%96%8B%E6%94%BE%E2%98%85&amp;firsthalf.hour=-&amp;lasthalf.title=%E5%BE%8C%E6%9C%9F&amp;lasthalf.month=12%E6%9C%88&amp;lasthalf.day=10&amp;lasthalf.description=%E2%98%85%E8%87%AA%E7%BF%92%E5%BF%85%E9%A0%88%E2%98%85&amp;lasthalf.hour=14%3A00%20~%2016%3A00&amp;\" target=\"_blank\"><b>J日程 6,600円 本申込</b></a><br><br><b>★特徴★</b><br>自宅や会社で、<span>ビデオ学習＆</span><span>受験ができお手軽です。</span><br><b>◎</b>金額は<b>計 6,600円（消費税込）</b>です。<br><b>◎</b>受験費用だけでなく<b>必要なものが全て含まれます。</b>教材、講習、演習、会員登録等々。<br><b>◎前提資格無し</b><br><b>◎</b><b>全てオンライン課程</b>。Zoomが動くパソコンで<b>自宅や会社から受験可能</b>（※２）です。<br><b>◎</b>受験、教材、期日、支払い等々を<b>Webページ上で</b><b>一気通貫・一元管理</b><b>。</b>ミスや漏れを防ぎ、<b>学習と受験</b><b>に集中できます。</b>（「受験者専用ページ」機能 ）<br><br><b>★ご注意★</b><br>※１：期日までに<b>『メール登録後、「事前登録」と「お支払い」の両方が必要』</b>です。実施方法の詳細は本申込ページに記載されております。<br>※２：環境省要請の不正対策のため、受験時の部屋、パソコン環境に一定の条件があります。<br>詳細は下記のチラシをご覧ください。<br><a href=\"https://page.altpaper.net/cna/cnabsconl-fl\" target=\"_blank\">https://page.altpaper.net/cna/cnabsconl-fl</a>",
    "image": {
      "url": "https://widget-data-static.elfsightcdn.com/google-calendar/18KQkB939nuLczbW91Yvey5lzZ5nO0l7l.avif"
    },
    "video": null,
    "eventType": null,
    "venue": null,
    "host": null,
    "tags": [],
    "customEventColor": null,
    "buttonVisible": null,
    "buttonText": null,
    "buttonLink": null,
    "buttonCaption": null
  }
];

  var FEED = 'widget-data.service.elfsight.com/api/events';

  function patch(text) {
    try {
      var data = JSON.parse(text);
      if (!data || !Array.isArray(data.payload)) return text;
      var now = new Date();
      var names = data.payload.map(function (e) { return e.name; });
      EXTRA_EVENTS.forEach(function (e) {
        if (names.indexOf(e.name) !== -1) return;
        if (new Date(e.end.date + 'T00:00:00+09:00') <= now) return;
        data.payload.push(e);
      });
      data.payload.sort(function (a, b) {
        var x = a.start.dateTime || a.start.date, y = b.start.dateTime || b.start.date;
        return x < y ? -1 : x > y ? 1 : 0;
      });
      return JSON.stringify(data);
    } catch (err) {
      return text;
    }
  }

  if (window.fetch) {
    var origFetch = window.fetch;
    window.fetch = function (input, init) {
      var url = typeof input === 'string' ? input : (input && input.url) || '';
      var p = origFetch.apply(this, arguments);
      if (url.indexOf(FEED) === -1) return p;
      return p.then(function (res) {
        return res.clone().text().then(function (t) {
          return new Response(patch(t), { status: res.status, statusText: res.statusText, headers: res.headers });
        });
      });
    };
  }

  var XHR = window.XMLHttpRequest;
  if (XHR) {
    var open = XHR.prototype.open;
    XHR.prototype.open = function (method, url) {
      this.__cnaFeed = String(url).indexOf(FEED) !== -1;
      return open.apply(this, arguments);
    };
    var desc = Object.getOwnPropertyDescriptor(XHR.prototype, 'responseText');
    var descR = Object.getOwnPropertyDescriptor(XHR.prototype, 'response');
    Object.defineProperty(XHR.prototype, 'responseText', {
      configurable: true,
      get: function () {
        var t = desc.get.call(this);
        return this.__cnaFeed && this.readyState === 4 ? patch(t) : t;
      }
    });
    Object.defineProperty(XHR.prototype, 'response', {
      configurable: true,
      get: function () {
        var r = descR.get.call(this);
        if (!this.__cnaFeed || this.readyState !== 4) return r;
        if (typeof r === 'string') return patch(r);
        if (r && typeof r === 'object' && Array.isArray(r.payload)) return JSON.parse(patch(JSON.stringify(r)));
        return r;
      }
    });
  }
})();
