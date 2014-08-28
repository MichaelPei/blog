/*
footnote.js: A filter for Hexo to generate footnotes. Place this file in /scripts/footnote.js.
========================================================================
Author: kuanyui(azazabc123[at]g~~~m~~~a~~~i~~~l[dot]com)
Date: 20140518
License: WTFPL 1.0
========================================================================
The following string in article

    {fn|I'm the a lot lot of content.}

Will be converted into

    <sup><a id="fnr.1" class="footref" href="#fn.1" name="fnr.1">1</a></sup>

And the following block will be added in the bottom of the article.

    <div id="footnotes">
        <h2 class="footnotes">Footnote</h2>
        <div id="text-footnotes">
            <div class="footdef"><sup><a id="fn.1" name="fn.1" class="footnum" href="#fnr.1">1</a></sup> <p class="footpara">I'm the a lot lot of content.</p></div>
            <div class="footdef"><sup><a id="fn.2" name="fn.2" class="footnum" href="#fnr.2">2</a></sup> <p class="footpara">I'm the second content2</p></div>
    ...
        </div>
    </div>

Adding following CSS into your site is recommended: 

.footpara {
  display: inline;
  margin-left: 5px;
}

*/

var lang =  {"en_US": "Footnotes", "zh_TW": "腳註", "ja_JP": "脚注", "zh_CN": "脚注"};

if (lang[hexo.config.language]) {
	var fnName = lang[hexo.config.language];
} else {
	var fnName = "Footnotes";
}

hexo.extend.filter.register('pre', function(data, callback) {
    var footContent = ""
    var ReLink = new RegExp('\\[[^](\\d+)\\]:(.+)', 'g');
    data.content = data.content.replace(ReLink, function(x, y, z) {
        footContent += '<li id="fn:' + y + '">' + z + '<a href="#fnref:' + y + '" rev="footnote">↩</a></li>';
        return "";
    });
    var ReSup = new RegExp('\\[[^](\\d+)\\]', 'g');
    data.content = data.content.replace(ReSup, '<sup id="fnref:$1"><a href="#fn:$1" rel="footnote">$1</a></sup>');
    if (footContent.length > 0)
    {
        data.content += '<div id="footnotes"><hr><div id="footnotelist"><ol>' + footContent + '</ol></div></div>';
    }
    callback(null, data);
});
