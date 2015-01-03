(function(){var root=this;var fuzzy={};if(typeof exports!=="undefined"){module.exports=fuzzy}else{root.fuzzy=fuzzy}fuzzy.simpleFilter=function(pattern,array){return array.filter(function(string){return fuzzy.test(pattern,string)})};fuzzy.test=function(pattern,string){return fuzzy.match(pattern,string)!==null};fuzzy.match=function(pattern,string,opts){opts=opts||{};var patternIdx=0,result=[],len=string.length,totalScore=0,currScore=0,pre=opts.pre||"",post=opts.post||"",compareString=opts.caseSensitive&&string||string.toLowerCase(),ch,compareChar;pattern=opts.caseSensitive&&pattern||pattern.toLowerCase();for(var idx=0;idx<len;idx++){ch=string[idx];if(compareString[idx]===pattern[patternIdx]){ch=pre+ch+post;patternIdx+=1;currScore+=1+currScore}else{currScore=0}totalScore+=currScore;result[result.length]=ch}if(patternIdx===pattern.length){return{rendered:result.join(""),score:totalScore}}return null};fuzzy.filter=function(pattern,arr,opts){opts=opts||{};return arr.reduce(function(prev,element,idx,arr){var str=element;if(opts.extract){str=opts.extract(element)}var rendered=fuzzy.match(pattern,str,opts);if(rendered!=null){prev[prev.length]={string:rendered.rendered,score:rendered.score,index:idx,original:element}}return prev},[]).sort(function(a,b){var compare=b.score-a.score;if(compare)return compare;return a.index-b.index})}})();