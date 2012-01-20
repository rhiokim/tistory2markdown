var fs = require('fs')
   ,xml2json = require('xml2js')
   ,util = require('util')
   ,htmlparser = require('htmlparser')
   ,datetime = require('datetime');

var out = {
   author: 'tistory2markdown',
   dir : process.cwd() +'/output',
   ext : 'markdown',
   date: 'YYYY_MM'
};

var toMarkdown = require('../modules/to-markdown/src/to-markdown').toMarkdown;
var stringEx = require('../modules/stringex/lib/stringex');
var parser = new xml2json.Parser();

/**
 * parse header
 * generator markdown header
 */
function parseHeader(post) {
   var header = {};

      header.title = post.title;
      header.author = out.author;
      header.date = new Date(post.created*1000);
      header.link = post.location;
      header.category = !!post.category ? post.category.split('/') : [];
      header.tags = post.tag;
      header.prop = {
         acceptComment: post.acceptComment,
         acceptTrackback: post.acceptTrackback,
         published: post.published,
         modified: post.modified,
         visibility: post.visibility/*,
         attachment: util.inspect(post.attachment),
         logs: util.inspect(post.logs)*/
      };

   return header;
}

/**
 * parse article body
 */
function parseBody(article) {
   var article = article.replace(/<br \/>/g, '').replace(/&nbsp;/g, ' ');
   article = toMarkdown(article);

   return article;
}

parser.on('end', function(result){
   var posts = result.post;
   var header, article;

   posts.forEach(function(post){
      header = parseHeader(post);
      article = parseBody(post.content);
     
      article = JSON.stringify(header) +'\n\n'+ article;

      /* date formatting */
      var _d = new Date(post.created * 1000);
      _d = datetime.format(_d,'%Y-%m-%d');

      /* url ascii encode & slug */
      var _s = stringEx.toASCII(post.title);
      _s = stringEx.toUrl(_s);
      _s = _s.replace('---', '-');
      _s = _s.replace('--', '-');
     
      fs.writeFileSync(out.dir +'/'+ _d +'_'+ _s +'.'+ out.ext, article, 'utf8');
      console.log('converted ', post.title);
      console.log('origin :', article.length, 'byte, markdown :', _s.length, 'byte');
      console.log( out.dir +'/'+ _d +'-'+ _s +'.'+ out.ext);
      console.log('-------------------------------------------');
   });

   console.log('total: ', posts.length, ' converted');
   console.log('-----------------------------------------');
});

module.exports = function(xml, dir, author) {
   if (!xml) {
      throw new Error('tistory 데이터 백업 파일을 지정해주세요.');
   }
   out.dir = !dir ? process.cwd() +'/output' : process.cwd() + dir ;
   out.author = !author ? 'tistory2markdown' : author ;

   console.log(JSON.stringify(out));
   console.log('load data');
   fs.readFile(xml, function(err, data){
      console.log('load complete, and start parse');
      console.log('-----------------------------------------');
      parser.parseString(data);
   });
}
