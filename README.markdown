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
npm install xml2js
npm install htmlparser
npm install datetime
```

#usage

```js
var t2md = require('../');

t2md('./Tistory-Data.xml', 'Author');
```
