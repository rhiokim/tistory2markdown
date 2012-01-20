#intro
tistory 블로그 백업 데이터를 markdown 으로 변환하는 node.js 모듈이다.

#install

```
git clone git@github.com:rhiokim/tistory2markdown.git
git submodule update --init
```

#usage modules
* xml2js
* htmlparser
* datetime

**install npm module**

```
//tistory xml 데이터를 json 으로 컨버팅하기 위한 모듈
npm install xml2js

//html 파싱 모듈
npm install htmlparser

//date 포맷팅 모듈
npm install datetime

//StringEx
npm install js-yaml
```

#usage

```js
var t2md = require('../');

t2md('./Tistory-Data.xml', 'Author');
```

#export

```
-------------------------------------------
...

converted  JavaScript 비젼과 함께 했던 나의 H3 컨퍼런스 - 발표자 후기 :)
origin : 4695 byte, markdown : 77 byte
../articles/2011-12-02-javascript-bijyeongwa-hamgge-haessdeon-nayi-h3-keonpeoreonseu-balpyoja-hugi-).markdown

...
-------------------------------------------
total:  346  converted
-----------------------------------------
```
