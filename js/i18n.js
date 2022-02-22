function setCookie(cname, cvalue, exdays = -1) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);

  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const langs = ['en', 'zh-CN', 'zh-TW'];
const defaultLang = langs[0];

const resources = {};

resources['en'] = {
  home: 'Home',
  aboutUs: 'About Us',
  services: 'Services',
  spirit: 'Spirit',
  contactUs: 'Contact Us',
  address:
    'Address: Room 702, 7/F, Fu Fai Commercial Center, 27 Hillier Street, Sheung Wan, Hong Kong'
};

resources['zh-CN'] = {
  home: '首页',
  aboutUs: '关于我们',
  services: '服务项目',
  spirit: '品牌形象',
  contactUs: '联络我们',
  address: '公司地址: 香港上环禧利街27号富辉商业中心702室'
};

resources['zh-TW'] = {
  home: '首頁',
  aboutUs: '關於我們',
  services: '服務項目',
  spirit: '品牌形象',
  contactUs: '聯絡我們',
  address: '公司地址: 香港上環禧利街27號富輝商業中心702室'
};

function getTargetLang() {
  const cookieLang = getCookie('site-lang');

  const targetLang =
    cookieLang && !!langs.find((lang) => lang === cookieLang)
      ? cookieLang
      : defaultLang;

  return targetLang;
}

function tl(label) {
  const targetLang = getTargetLang();
  const file = resources[targetLang];

  if (file[label]) {
    return file[label];
  } else {
    return label;
  }
}

function changeLang(lang) {
  setCookie('site-lang', lang, 30);

  const i18nLabels = document.querySelectorAll('[id^=i18n-]');

  for (let i in i18nLabels) {
    const id = i18nLabels[i].id;
    if (id) {
      const label = id.substring(5);

      const value = tl(label);

      document.getElementById(id).textContent = value;
    }
  }
}

window.onload = () => {
  const targetLang = getTargetLang();

  changeLang(targetLang);
};
